import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';
import { deleteTeamById, newTeamWithName, getTeamById, Team } from "../src/Team/team";
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

    describe('deleteTeamById', () => {
        it('should delete an existing team successfully', async () => {
            vi.spyOn(MockedDataAccessLayer, 'dalDeleteTeamById').mockResolvedValue(true);
            const result = await deleteTeamById('test-id', MockedDataAccessLayer);

            expect(result).toBeTruthy();
            expect(MockedDataAccessLayer.dalDeleteTeamById).toHaveBeenCalledWith('test-id');
        });

        it('should return false if deletion fails', async () => {
            vi.spyOn(MockedDataAccessLayer, 'dalDeleteTeamById').mockRejectedValue(new Error('Failed to delete team'));

            const result = await deleteTeamById('test-id', MockedDataAccessLayer);
            expect(result).toBe(false);

            expect(MockedDataAccessLayer.dalDeleteTeamById).toHaveBeenCalledWith('test-id');
        });

        it('should throw an error if team not found', async () => {
            vi.spyOn(MockedDataAccessLayer, 'dalGetTeamById').mockResolvedValue(null);
            vi.spyOn(MockedDataAccessLayer, 'dalDeleteTeamById').mockResolvedValue(false);

            await expect(deleteTeamById('non-existent-id', MockedDataAccessLayer)).rejects.toThrow('Team not found');

            expect(MockedDataAccessLayer.dalGetTeamById).toHaveBeenCalledWith('non-existent-id');
            expect(MockedDataAccessLayer.dalDeleteTeamById).not.toHaveBeenCalled();
        });
     });
    
  });    
