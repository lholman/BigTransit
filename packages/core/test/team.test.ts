import { describe, it, expect, beforeEach, vi } from "vitest";
import { mockClient } from "aws-sdk-client-mock";
import { DynamoDBDocumentClient, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { fromID, newTeamWithName } from "@bigtransit/core/team";
import type { ResourceMock } from "@bigtransit/tests/types/ResourceMocks";

const ddbMock = mockClient(DynamoDBDocumentClient);

beforeEach(() => {
  ddbMock.reset();
});

describe('Team domain', function() {
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
    
    const item = await newTeamWithName("Stream aligned team", resourceMock);
    
    expect(item.PK).toMatch(/^TEAM#/);
    expect(item.SK).toMatch("INFO");
    expect(item.name).toBe("Stream aligned team");
    
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
      Item: { teamId: "f25e22a1-1924-4c87-bb7f-46b6d087d80f", name: "Stream aligned team" },
    });

    const team = await fromID("f25e22a1-1924-4c87-bb7f-46b6d087d80f", resourceMock);

    expect(team?.name).toBe("Stream aligned team");

    const calls = ddbMock.commandCalls(GetCommand);
    expect(calls).toHaveLength(1);

    expect(resourceMock.BigTransit.name).toBe("mocked-table-name");
  });

  it("should call GetCommand to get team by ID from DynamoDB", async () => {
    ddbMock.on(GetCommand).resolves({
      Item: { teamId: "f25e22a1-1924-4c87-bb7f-46b6d087d80f", name: "Stream aligned team" },
    });

    const team = await fromID("f25e22a1-1924-4c87-bb7f-46b6d087d80f", resourceMock);

    const calls = ddbMock.commandCalls(GetCommand);
    expect(calls).toHaveLength(1);
  });  

  it("should return null for non-existing team ID", async () => {
    ddbMock.on(GetCommand).resolves({
      Item: null,
    });

    const team = await fromID("non-existing-id", resourceMock);
    expect(team).toBeNull();

    const calls = ddbMock.commandCalls(GetCommand);
    expect(calls).toHaveLength(1);
  });

  it("should handle DynamoDB GetCommand error gracefully", async () => {
    ddbMock.on(GetCommand).rejects(new Error("DynamoDB error"));

    await expect(fromID("f25e22a1-1924-4c87-bb7f-46b6d087d80f", resourceMock)).rejects.toThrow("DynamoDB error");

    const calls = ddbMock.commandCalls(GetCommand);
    expect(calls).toHaveLength(1);
  });

});