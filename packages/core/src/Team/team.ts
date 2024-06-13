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