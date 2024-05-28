import { expect, it, describe, beforeEach, vi } from "vitest";
import { Team } from "@bigtransit/core/team";
import { mockClient } from "aws-sdk-client-mock";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";
import {  } from "@aws-sdk/lib-dynamodb";

const ddbMock = mockClient(DynamoDBDocumentClient);

vi.mock("sst", () => ({
  Resource: {
    BigTransit: {
      name: "mocked-table-name"
    }
  }
}));

beforeEach(() => {
    ddbMock.reset();
  });

describe('Team domain', function() {
    it("should get team by ID from DynamoDB", async () => {

        ddbMock.on(GetCommand).resolves({
          Item: { teamId: "f25e22a1-1924-4c87-bb7f-46b6d087d80f", name: "Stream aligned team" },
        });

        const team = await Team.fromID("f25e22a1-1924-4c87-bb7f-46b6d087d80f");
        expect(team.name).toBe("Stream aligned team");
    });
});