export * as Team from "./team"
import { Resource } from "sst";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from 'uuid';

interface Team {
    teamID: string;
    name: string;
}

interface Item {
    PK: string;
    SK: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

export async function newTeamWithName(_name: string): Promise<Item> {
    
    const team: Team = {
        teamID: uuidv4(),
        name: _name
    };

    const item: Item = {
        PK: `TEAM#${team.teamID}`,
        SK: 'INFO',
        name: _name,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    const params = {
        TableName: Resource.BigTransit.name,
        Item: item
    };

    try {
        await ddbDocClient.send(new PutCommand(params));
        return item;
    } catch (error) {
        console.error('Error creating team:', error);
        throw error;
    }
}

export function fromID(_teamID: number) {
    return {
        teamID: "1",
        name: "Retention Team" 
    } as Team
}

export function list() {
    return undefined as Item[];
}