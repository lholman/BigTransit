import { expect, it } from "vitest";
import { Team } from "@bigtransit/core/team";

it("create a team", async () => {
    const team = await Team.newTeamWithName("Stream aligned team");

    expect(team.teamID).toBe(1);
})