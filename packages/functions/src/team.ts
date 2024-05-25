import { Team } from "@bigtransit/core/Team";

export async function getTeam() {
  const team = Team.fromID(1);
  return {
    body: team,
  };
}

export async function newTeamWithName(_name: string) {
  const team = Team.newTeamWithName(_name);
  return {
    body: team.teamID,
  };
}