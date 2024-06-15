import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const apiUrl = process.env.ACCEPTANCE_API_URL;

if (!apiUrl) {
  throw new Error("ACCEPTANCE_API_URL environment variable is not set");
}

async function createTeam(name: string) {
  try {
    const response = await axios.post(`${apiUrl}/teams`, { name });
    return response.data;
  } catch (error) {
    console.error('Error creating team:', error);
    throw error;
  }
}

describe('Team API Acceptance Tests', () => {
  let createdTeam: { id: string, name: string };

  beforeAll(async () => {
    try {
      createdTeam = await createTeam('Initial Test Team');
      console.log(`createdTeam ${createdTeam}`);
    } catch (error) {
      console.error('Error in beforeAll:', error);
      throw error;
    }
  });

  afterAll(async () => {
    // await axios.delete(`${apiUrl}/teams/${createdTeam.id}`);
  });

  describe('GET /teams/{id}', () => {
    it('should return 200 and the correct team data', async () => {
      try {
        console.log(`Team ID: ${createdTeam.id}`);
        const response = await axios.get(`${apiUrl}/teams/${createdTeam.id}`);
        expect(response.status).toBe(200);

        const headers = response.headers;
        expect(headers).toHaveProperty('content-type');

        const team = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;

        expect(team).not.toBeNull();
        expect(team.id).toBe(createdTeam.id);
        expect(team.name).toBe(createdTeam.name);
      } catch (error) {
        console.error('Error in GET /teams/{id} test:', error);
        throw error;
      }
    });
  });

  describe('POST /teams', () => {
    it('should create a new team with a valid name', async () => {
      const name = 'New Test Team';
      const response = await axios.post(`${apiUrl}/teams`, { name });
  
      expect(response.status).toBe(201);
      const team = response.data;
      
      expect(team).toHaveProperty('id');
      expect(team.name).toBe(name);
      expect(team).toHaveProperty('createdAt');
      expect(team).toHaveProperty('updatedAt');
    });
  });  
});
