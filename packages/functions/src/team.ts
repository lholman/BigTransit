import { Team } from "@bigtransit/core/team";

export async function getTeam() {
  return {
    body: `${Team.fromID("1")}.`,
  };
}

export async function newTeamWithName(_name: string) {
  const team = Team.newTeamWithName(_name.body);
  return {
    body: team,
  };
}