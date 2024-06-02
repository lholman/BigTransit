import { describe, it, expect, beforeEach, vi } from "vitest";
import { mockClient } from "aws-sdk-client-mock";
import { DynamoDBDocumentClient, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { dalNewTeamWithName, dalGetTeamById, generatePK } from "../src/Team/team.dal";
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

  it("should create a new team with correct DynamoDB table structure", async () => {
    ddbMock.on(PutCommand).resolves({});
    
    const name = "Stream aligned team";
    const item = await dalNewTeamWithName(name, resourceMock);
    
    expect(item).toHaveProperty('PK');
    expect(item).toHaveProperty('SK');
    expect(item).toHaveProperty('name');
    expect(item).toHaveProperty('createdAt');
    expect(item).toHaveProperty('updatedAt');

    expect(item.PK).toContain('TEAM#');
    expect(item.SK).toBe('INFO');
    expect(item.name).toBe(name);
    
    const calls = ddbMock.commandCalls(PutCommand);
    expect(calls).toHaveLength(1);
  });

  it("should handle DynamoDB PutCommand error gracefully", async () => {
    ddbMock.on(PutCommand).rejects(new Error("DynamoDB error"));

    await expect(dalNewTeamWithName("Stream aligned team", resourceMock)).rejects.toThrow("DynamoDB error");
    
    const calls = ddbMock.commandCalls(PutCommand);
    expect(calls).toHaveLength(1);
  });  

  it("should call sst Resource once to set DynamoDB table name", async () => {
    ddbMock.on(GetCommand).resolves({
      Item: { PK: "f25e22a1-1924-4c87-bb7f-46b6d087d80f", name: "Stream aligned team" },
    });

    const team = await dalGetTeamById("f25e22a1-1924-4c87-bb7f-46b6d087d80f", resourceMock);

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

    const item = await dalGetTeamById(teamId, resourceMock);

    expect(item).not.toBeNull();
    if (item) {
      expect(item.PK).toBe(`${teamId}`,);
    }

    const calls = ddbMock.commandCalls(GetCommand);
    expect(calls).toHaveLength(1);
  });  

  it("should return null for non-existing team ID", async () => {
    ddbMock.on(GetCommand).resolves({
      Item: null as unknown as Record<string, any> | undefined,
    });

    const team = await dalGetTeamById("non-existing-id", resourceMock);
    expect(team).toBeNull();

    const calls = ddbMock.commandCalls(GetCommand);
    expect(calls).toHaveLength(1);
  });

  it("should handle DynamoDB GetCommand error gracefully", async () => {
    ddbMock.on(GetCommand).rejects(new Error("DynamoDB error"));

    await expect(dalGetTeamById("f25e22a1-1924-4c87-bb7f-46b6d087d80f", resourceMock)).rejects.toThrow("DynamoDB error");

    const calls = ddbMock.commandCalls(GetCommand);
    expect(calls).toHaveLength(1);
  });

  it('should generate a PK with TEAM# prefix', () => {
      vi.mock('uuid', () => ({
        v4: () => 'mock-uuid'
      }));
  
      const pk = generatePK();
      expect(pk).toBe('TEAM#mock-uuid');
  });
});