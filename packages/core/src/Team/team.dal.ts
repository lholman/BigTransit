export * as Team from "./team.dal"
import { Resource as DefaultResource } from "sst";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, GetCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from 'uuid';

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

export interface Item {
    PK: string;
    SK: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  }

export async function dalNewTeamWithName(_name: string, resource = DefaultResource): Promise<Item> {
    
    const item: Item = {
        PK: `TEAM#${uuidv4()}`,
        SK: "INFO",
        name: _name,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    const params = {
        TableName: resource.BigTransit.name,
        Item: item
    };

    await ddbDocClient.send(new PutCommand(params));
    return item;
}

export async function dalGetTeamById(id: string, resource = DefaultResource): Promise<Item | null> {
    
    const params = {
        TableName: resource.BigTransit.name,
        Key: {
            PK: `TEAM#${id}`,
            SK: 'INFO'
        }
    };

    try {
        const result = await ddbDocClient.send(new GetCommand(params));
        return result.Item ? result.Item as Item : null;
    } catch (error) {
        console.error('Error retrieving team:', error);
        throw error;
    }
}