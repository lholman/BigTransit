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

    it("gets a team by ID", async () => {
        const team = await Team.fromID("f25e22a1-1924-4c87-bb7f-46b6d087d80f");

        expect(team.name).toBe("Stream aligned team");   
    })
});