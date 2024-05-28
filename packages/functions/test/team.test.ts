import { describe, it, expect } from 'vitest';
import axios from 'axios';
import { validate as uuidValidate } from "uuid";

const devUrl = "https://uhmp5xv4a8.execute-api.eu-west-2.amazonaws.com";

describe('GET Team API', () => {
  it('gets a team', async () => {
    const response = await axios.get(`${devUrl}/teams1`);

    expect(response.status).toBe(200);

    const headers = response.headers;
    expect(headers).toHaveProperty('content-type');

    const team = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;

    expect(team).not.toBeNull;
  });
});

describe('POST Team API', () => {
  it('Returns HTTP 200 and correct content type', async () => {
    
    const response = await axios.post(`${devUrl}/teams`, {
      name: 'Stream aligned team'
    });

    expect(response.status).toBe(200);
    const headers = response.headers;
    expect(headers).toHaveProperty('content-type');

  });
});
