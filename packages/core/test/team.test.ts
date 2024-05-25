import { expect, it } from "vitest";
import { Team } from "@bigtransit/core/team";

it("create a team", async () => {
    const team = await Team.newTeamWithName("Stream aligned team");

    expect(team.teamID).toBe(1);
})

it("get a team by ID", async () => {
    const team = await Team.fromID(1);

    expect(team.teamID).toBe(1);
    expect(team.name).toBe("Retention Team");   
})