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
  }, 30000);

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
    it('should return 404 for a non-existent team ID', async () => {
      const nonExistentTeamId = 'non-existent-id';
      try {
        await axios.get(`${apiUrl}/teams/${nonExistentTeamId}`);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          expect(error.response?.status).toBe(404);
          expect(error.response?.data).toHaveProperty('message');
          expect(error.response?.data.message).toBe('Team not found');
        } else {
          throw error;
        }
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
    it('should fail to create a new team with an invalid name', async () => {
      try {
        await axios.post(`${apiUrl}/teams`, { name: '' });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          expect(error.response?.status).toBe(400);
          expect(error.response?.data).toHaveProperty('message', 'Name is required and must be a non-empty string');
        } else {
          throw error;
        }
      }
    });
  });  

  describe.todo('DELETE /teams/{id}', () => {
    let teamToDelete: { id: string, name: string };
  
    beforeAll(async () => {
      teamToDelete = await createTeam('Team to be deleted');
    });
  
    it('should delete an existing team', async () => {
      const deleteResponse = await axios.delete(`${apiUrl}/teams/${teamToDelete.id}`);
      expect(deleteResponse.status).toBe(204);
  
      try {
        await axios.get(`${apiUrl}/teams/${teamToDelete.id}`);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          expect(error.response?.status).toBe(404);
        } else {
          throw error;
        }
      }
    });
  });
  
});
