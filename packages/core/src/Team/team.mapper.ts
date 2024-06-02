import { Team } from "./team";
import { Item } from "../Team/team.dal";

export function mapToItem(team: Team): Item {
  return {
    PK: `TEAM#${team.id}`,
    SK: "INFO",
    name: team.name,
    createdAt: team.createdAt,
    updatedAt: team.updatedAt
  };
}

export function mapToTeam(item: Item): Team {
  return {
    id: item.PK.replace('TEAM#', ''),
    name: item.name,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt
  };
}
