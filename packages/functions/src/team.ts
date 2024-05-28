import { Team } from "@bigtransit/core/team";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export async function getTeam() {
  const team = Team.fromID(1);
  return {
    headers: {
      'Content-Type': 'application/json',
    },
    statusCode: 200,
    body: JSON.stringify(team),   
  };
}

export async function newTeam(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

  try {
    const requestBody = JSON.parse(event.body || '{}');
    const _name = requestBody.name;
    console.log(_name);
  
    const team = Team.newTeamWithName(_name);
  
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