import * as DefaultDataAccessLayer from"./team.dal";
import {mapToTeam } from "./team.mapper";

export interface Team {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  }

export async function newTeamWithName(name: string, dal = DefaultDataAccessLayer): Promise<Team> {
  const team = mapToTeam(await dal.dalNewTeamWithName(name));
  return team;
}

export async function getTeamById(id: string, dal = DefaultDataAccessLayer): Promise<Team | null> {
  const item = await dal.dalGetTeamById(id);
  if (!item) {
    return null;
  }
  const team = mapToTeam(item);
  if(team.id != id) {
    return null;
  }
  return team;
}

export async function deleteTeamById(id: string, dal = DefaultDataAccessLayer): Promise<Boolean> {
  const item = await dal.dalGetTeamById(id);
  if (!item) {
    throw new Error('Team not found');
  }
  try {
    const result = await dal.dalDeleteTeamById(id);
    if (result){
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Failed to delete team with ID ${id}:`, error);
    return false;
  }
}