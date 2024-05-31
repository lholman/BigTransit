import { describe, it, expect } from 'vitest';
import axios from 'axios';
import dotenv from 'dotenv';
import { validate as uuidValidate } from "uuid";

dotenv.config();

const apiUrl = process.env.ACCEPTANCE_API_URL;

if (!apiUrl) {
  throw new Error("ACCEPTANCE_API_URL environment variable is not set");
}

// describe('GET Team API', () => {
//   it('gets a team', async () => {
//     const response = await axios.get(`${apiUrl}/teams1`);

//     expect(response.status).toBe(200);

//     const headers = response.headers;
//     expect(headers).toHaveProperty('content-type');

//     const team = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;

//     expect(team).not.toBeNull;
//   });
// });

describe('POST Team API', () => {
  it('Returns HTTP 200 and correct content type', async () => {
    
    const response = await axios.post(`${apiUrl}/teams`, {
      name: 'Stream aligned team'
    });

    expect(response.status).toBe(200);
    const headers = response.headers;
    expect(headers).toHaveProperty('content-type');

  });
});
