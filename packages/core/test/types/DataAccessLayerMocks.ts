import { Item} from "../../src/Team/team.dal";

const mockItem: Item = {
  PK: 'TEAM#test-id',
  SK: 'INFO',
  name: 'Test Team',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

export async function dalNewTeamWithName()
{
  return mockItem;
}

export async function dalGetTeamById()
{
  return mockItem;
}

export function generatePK()
{
  return mockItem.PK;
}