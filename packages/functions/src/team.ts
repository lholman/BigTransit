import { Team } from "../../core/src/Team/team";
import { newTeamWithName, getTeamById } from "../../core/src/Team/team.dal";
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
    const _name = requestBody.name;

    console.log("_name:", _name);

    const team = await newTeamWithName(_name);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(team),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
}
