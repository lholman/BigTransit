import { describe, it, expect, vi, afterEach } from 'vitest';
import { newTeamWithName } from "../src/Team/team";

afterEach(() => {
  vi.restoreAllMocks()
});

const mockTeam = {
  id: 'test-id',
  name: "bla",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

vi.mock("../src/Team/team", () => ({
  newTeamWithName: vi.fn()
  .mockImplementationOnce(() => mockTeam)
  })
); 

describe('Team service layer', function() {
    describe('newTeam', () => {
        it('should create a new team with a valid name', async () => {
                   
          const name = 'Stream aligned team';

          const team = await newTeamWithName(name);

          expect(team.id).toBe(mockTeam.id);
          expect(team.name).toBe(mockTeam.name);
          expect(newTeamWithName).toHaveBeenCalledWith(name);
        });

    });

});
