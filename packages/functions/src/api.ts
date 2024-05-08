import { Team } from "@bigtransit/core/team";

export async function teams() {
  return {
    statusCode: 200,
    body: `${Team.fromID("1")}.`,
  };
}