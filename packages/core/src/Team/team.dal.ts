export * as Team from "./team.dal"
import { Resource as DefaultResource } from "sst";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, GetCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from 'uuid';
import { Item, mapToTeam, mapToItem } from "./team.mapper";
import { Team } from "./team";

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

export async function newTeamWithName(_name: string, resource = DefaultResource): Promise<Team> {
    
    const team: Team = {
        id: uuidv4(),
        name: _name,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    const item = mapToItem(team);

    const params = {
        TableName: resource.BigTransit.name,
        Item: item
    };

    await ddbDocClient.send(new PutCommand(params));
    return team;
}

export async function getTeamById(id: string, resource = DefaultResource): Promise<Team | null> {
    
    const params = {
        TableName: resource.BigTransit.name,
        Key: {
            PK: `TEAM#${id}`,
            SK: 'INFO'
        }
    };

    try {
        const result = await ddbDocClient.send(new GetCommand(params));
        return result.Item ? mapToTeam(result.Item as Item) : null;
    } catch (error) {
        console.error('Error retrieving team:', error);
        throw error;
    }
}