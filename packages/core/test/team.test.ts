import { describe, it, expect, beforeEach, vi } from "vitest";
import { mockClient } from "aws-sdk-client-mock";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";
import { Team, fromID } from "@bigtransit/core/team";

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

  it("should call sst Resource once to get DynamoDB table name", async () => {
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