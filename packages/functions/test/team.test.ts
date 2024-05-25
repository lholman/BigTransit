import { describe, it, expect } from 'vitest';
import axios from 'axios';

describe('Team API', () => {
  it('get a team', async () => {
    const response = await axios.get('https://f3up0rb620.execute-api.eu-west-2.amazonaws.com/teams/1', {
    });

    const team = response.data;

    expect(team).not.toBeNull;
    expect(team.body.teamID).toBe(1);
    expect(team.body.name).toBe('Retention Team');
  });
});
