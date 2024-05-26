import { expect, it, describe } from "vitest";
import { Team } from "@bigtransit/core/team";
import { validate as uuidValidate } from 'uuid';

describe('Team domain', function() {
    it("creates a team", () => {
        const team = Team.newTeamWithName("Stream aligned team");

        expect(team.teamID).toBe("1");
        expect(team.name).toBe("Stream aligned team");
    })

    it("gets a team by ID", async () => {
        const team = await Team.fromID(1);

        expect(uuidValidate(team.teamID)).toBe(true);
        expect(team.name).toBe("Retention Team");   
    })
});