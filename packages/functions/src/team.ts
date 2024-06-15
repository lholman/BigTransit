import { Team } from "../../core/src/Team/team";
import { newTeamWithName, getTeamById } from "../../core/src/Team/team";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export async function getTeam(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  const teamID = event.pathParameters?.teamId;
    if (!teamID) {
        return {
            statusCode: 400,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: "teamId is required" }),
        };
    }

    try {
        const team = await getTeamById(teamID);
        if (!team) {
            return {
                statusCode: 404,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: "Team not found" }),
            };
        }

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(team),
        };
    } catch (error) {
        console.error('Error retrieving team:', error);
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: 'Internal Server Error' }),
        };
    }
}

export async function newTeam(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  try {
    const requestBody = JSON.parse(event.body || '{}');
    const name = requestBody.name;

    if (!name || typeof name !== 'string' || name.trim() === '') {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: 'Name is required and must be a non-empty string' }),
      };
    }

    const team = await newTeamWithName(name);

    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(team),
    };
  } catch (error) {
    console.error('Error creating new team:', error);

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
}
