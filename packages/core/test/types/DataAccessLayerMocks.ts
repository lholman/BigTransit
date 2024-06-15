import { Item} from "../../src/Team/team.dal";
import { TeamDataAccessLayerInterface } from "../../src/Team/team.dal.interface";
import { Resource as DefaultResource } from "sst";

const mockItem: Item = {
  PK: 'TEAM#test-id',
  SK: 'INFO',
  name: 'Test Team',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

export const dalNewTeamWithName: TeamDataAccessLayerInterface['dalNewTeamWithName'] = async (name: string, resource?: DefaultResource) => {
  return mockItem;
};

export const dalGetTeamById: TeamDataAccessLayerInterface['dalGetTeamById'] = async (id: string, resource?: DefaultResource) => {
  return mockItem;
};

export const dalDeleteTeamById: TeamDataAccessLayerInterface['dalDeleteTeamById'] = async (id: string, resource?: DefaultResource) => {
  return true;
};

export const generatePK: TeamDataAccessLayerInterface['generatePK'] = (id?: string) => {
  return mockItem.PK;
};