import { Team } from "@bigtransit/core/Team";

export async function getTeam() {
  const team = Team.fromID(1);
  console.log(JSON.stringify(team));
  return {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(team),
  };
}

export async function newTeamWithName(_name: string) {
  const team = Team.newTeamWithName(_name);
  return {
    body: team.teamID,
  };
}