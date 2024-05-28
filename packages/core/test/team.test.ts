import { describe, it, expect, beforeEach, vi } from "vitest";
import { mockClient } from "aws-sdk-client-mock";
import { DynamoDBDocumentClient, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { Team, fromID, newTeamWithName } from "@bigtransit/core/team";

// Mocking AWS SDK
const ddbMock = mockClient(DynamoDBDocumentClient);

beforeEach(() => {
  ddbMock.reset();
});

describe('Team domain', function() {
  let resourceMock;

  beforeEach(() => {
    resourceMock = {
      BigTransit: {
        get name() {
          return "mocked-table-name";
        }
      }
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

  it("should call sst Resource once to set DynamoDB table name", async () => {
    ddbMock.on(GetCommand).resolves({
      Item: { teamId: "f25e22a1-1924-4c87-bb7f-46b6d087d80f", name: "Stream aligned team" },
    });

    const team = await fromID("f25e22a1-1924-4c87-bb7f-46b6d087d80f", resourceMock);

    expect(team.name).toBe("Stream aligned team");

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
});