import { expect, it, describe } from "vitest";
import { Team } from "@bigtransit/core/team";
import { validate as uuidValidate } from 'uuid';

describe('Team domain', function() {
    it("Creates a team with UUID given a team name", async () => {
        const teamName = "Stream aligned team";
        const team = await Team.newTeamWithName(teamName);

        expect(uuidValidate(team.PK.split('#')[1])).toBe(true);
        expect(team.name).toBe(teamName);
    })

    // it("gets a team by ID", async () => {
    //     const team = await Team.fromID(1);

    //     expect(uuidValidate(team.teamID)).toBe(true);
    //     expect(team.name).toBe("Retention Team");   
    // })
});