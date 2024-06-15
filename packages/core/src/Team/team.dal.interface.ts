import { Item } from "./team.dal"; 
import { Resource as DefaultResource } from "sst";

export interface TeamDataAccessLayerInterface {
    dalNewTeamWithName: (name: string, resource?: DefaultResource) => Promise<Item>;
    dalGetTeamById: (id: string, resource?: DefaultResource) => Promise<Item | null>;
    dalDeleteTeamById: (id: string, resource?: DefaultResource) => Promise<void>;
    generatePK: (id?: string) => string;
  }
  
