import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { newTeamWithName, getTeamById, Team } from "../src/Team/team";
import * as teamDal from "../src/Team/team.dal";

const mockItem = {
    PK: 'TEAM#test-id',
    SK: 'INFO',
    name: 'Test Team',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
};

const mockTeam: Team = {
    id: 'test-id',
    name: 'Test Team',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
};

vi.mock("../src/Team/team.dal", () => ({
    dalNewTeamWithName: vi.fn(),
    dalGetTeamById: vi.fn()
}));

beforeEach(() => {
    vi.clearAllMocks();
});

afterEach(() => {
    vi.restoreAllMocks();
});

describe('Team service layer', function() {
    describe('newTeamWithName', () => {
        it('should create a new team with a valid name', async () => {
            (teamDal.dalNewTeamWithName as vi.Mock).mockResolvedValue(mockItem);

            const name = 'Stream aligned team';
            const team = await newTeamWithName(name);

            expect(team.id).toBe(mockTeam.id);
            expect(team.name).toBe(mockTeam.name);
            expect(teamDal.dalNewTeamWithName).toHaveBeenCalledWith(name);
        });
    });

    describe('getTeamById', () => {
        it('should return a team by ID', async () => {
            (teamDal.dalGetTeamById as vi.Mock).mockResolvedValue(mockItem);

            const teamID = 'test-id';
            const team = await getTeamById(teamID);

            expect(team).not.toBeNull();
            expect(team?.id).toBe(mockTeam.id);
            expect(team?.name).toBe(mockTeam.name);
            expect(teamDal.dalGetTeamById).toHaveBeenCalledWith(teamID);
          });
          it('should return null if team is not found', async () => {
            (teamDal.dalGetTeamById as vi.Mock).mockResolvedValue(null);
    
            const teamID = 'non-existent-id';
            const team = await getTeamById(teamID);
    
            expect(team).toBeNull();
            expect(teamDal.dalGetTeamById).toHaveBeenCalledWith(teamID);
        });
    });
  });    
