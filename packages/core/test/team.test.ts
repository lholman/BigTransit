import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';
import { newTeamWithName, getTeamById, Team } from "../src/Team/team";
//import { Item} from "../src/Team/team.dal";
import * as MockedDataAccessLayer from "../test/types/DataAccessLayerMocks";

const mockTeam: Team = {
    id: 'test-id',
    name: 'Test Team',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
};

beforeEach(() => {
    vi.clearAllMocks();
});

afterEach(() => {
    vi.restoreAllMocks();
});

describe('Team service layer', function() {
    describe('newTeamWithName', () => {
        it('should create a new team with a valid name', async () => {

            const name = 'Stream aligned team';
            const team = await newTeamWithName(name, MockedDataAccessLayer);

            expect(team.id).toBe(mockTeam.id);
            expect(team.name).toBe(mockTeam.name);
        });
    });

    describe('getTeamById', () => {
        it('should return a team by ID', async () => {
            const teamID = 'test-id';
            const team = await getTeamById(teamID, MockedDataAccessLayer);

            expect(team).not.toBeNull();
            expect(team?.id).toBe(mockTeam.id);
            expect(team?.name).toBe(mockTeam.name);
          });
          it('should return null if team is not found', async () => {
            const teamID = 'non-existent-id';
            const team = await getTeamById(teamID, MockedDataAccessLayer);
    
            expect(team).toBeNull();
        });
    });
  });    
