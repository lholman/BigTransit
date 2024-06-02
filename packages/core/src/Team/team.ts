import { dalNewTeamWithName, dalGetTeamById } from "./team.dal";
import {mapToTeam } from "./team.mapper";

export interface Team {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  }

export async function newTeamWithName(name: string): Promise<Team> {
  const team = mapToTeam(await dalNewTeamWithName(name));
  return team;
}

export async function getTeamById(id: string): Promise<Team | null> {
  const item = await dalGetTeamById(id);
  if (!item) {
    return null;
  }
  const team = mapToTeam(item);
  return team;
}