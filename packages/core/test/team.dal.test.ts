import { describe, it, expect, beforeEach, vi } from "vitest";
import { mockClient } from "aws-sdk-client-mock";
import { DynamoDBDocumentClient, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { newTeamWithName, getTeamById } from "../src/Team/team.dal";
import { Item, mapToItem, mapToTeam } from "../src/Team/team.mapper";
import { Team } from "../src/Team/team";
import { validate as uuidValidate } from "uuid";
import type { ResourceMock } from "@bigtransit/tests/types/ResourceMocks";

const ddbMock = mockClient(DynamoDBDocumentClient);

beforeEach(() => {
  ddbMock.reset();
});

describe('Team data access layer', function() {
  let resourceMock: ResourceMock;

  beforeEach(() => {
    resourceMock = {
      BigTransit: {
        get name() {
          return "mocked-table-name";
        },
        type: "sst.aws.Dynamo"
      },
      App: {},
      BigTransitApi: {}
    };
  });

  it("should create a new team with a given name", async () => {
    ddbMock.on(PutCommand).resolves({});
    
    const name = "Stream aligned team";
    const team = await newTeamWithName(name, resourceMock);
    
    expect(team).toHaveProperty('id');
    expect(team.name).toBe(name);
    expect(team).toHaveProperty('createdAt');
    expect(team).toHaveProperty('updatedAt');
    
    const calls = ddbMock.commandCalls(PutCommand);
    expect(calls).toHaveLength(1);
  });

  it("should handle DynamoDB PutCommand error gracefully", async () => {
    ddbMock.on(PutCommand).rejects(new Error("DynamoDB error"));

    await expect(newTeamWithName("Stream aligned team", resourceMock)).rejects.toThrow("DynamoDB error");
    
    const calls = ddbMock.commandCalls(PutCommand);
    expect(calls).toHaveLength(1);
  });  

  it("should call sst Resource once to set DynamoDB table name", async () => {
    ddbMock.on(GetCommand).resolves({
      Item: { PK: "f25e22a1-1924-4c87-bb7f-46b6d087d80f", name: "Stream aligned team" },
    });

    const team = await getTeamById("f25e22a1-1924-4c87-bb7f-46b6d087d80f", resourceMock);

    expect(team?.name).toBe("Stream aligned team");

    const calls = ddbMock.commandCalls(GetCommand);
    expect(calls).toHaveLength(1);

    expect(resourceMock.BigTransit.name).toBe("mocked-table-name");
  });

  it("should call GetCommand to get team by ID from DynamoDB", async () => {
    
    const teamId = "f25e22a1-1924-4c87-bb7f-46b6d087d80f";
    
    ddbMock.on(GetCommand).resolves({
      Item: { PK: teamId, name: "Stream aligned team" },
    });

    const team = await getTeamById(teamId, resourceMock);

    expect(team).not.toBeNull();
    if (team) {
      expect(uuidValidate(team.id)).toBe(true);
      expect(team.id).toBe(teamId);
    }

    const calls = ddbMock.commandCalls(GetCommand);
    expect(calls).toHaveLength(1);
  });  

  it("should return null for non-existing team ID", async () => {
    ddbMock.on(GetCommand).resolves({
      Item: null as unknown as Record<string, any> | undefined,
    });

    const team = await getTeamById("non-existing-id", resourceMock);
    expect(team).toBeNull();

    const calls = ddbMock.commandCalls(GetCommand);
    expect(calls).toHaveLength(1);
  });

  it("should handle DynamoDB GetCommand error gracefully", async () => {
    ddbMock.on(GetCommand).rejects(new Error("DynamoDB error"));

    await expect(getTeamById("f25e22a1-1924-4c87-bb7f-46b6d087d80f", resourceMock)).rejects.toThrow("DynamoDB error");

    const calls = ddbMock.commandCalls(GetCommand);
    expect(calls).toHaveLength(1);
  });

});