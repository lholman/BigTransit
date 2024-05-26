import { describe, it, expect } from 'vitest';
import axios from 'axios';

describe('Team API', () => {
  it('get a team', async () => {
    const response = await axios.get('https://f3up0rb620.execute-api.eu-west-2.amazonaws.com/teams/1', {
    });

    expect(response.status).toBe(200);

    const headers = response.headers;
    expect(headers).toHaveProperty('content-type');

    const team = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;

    expect(team).not.toBeNull;
  });
});
