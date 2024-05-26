import { database } from "./database";

export const api = new sst.aws.ApiGatewayV2("BigTransitApi")
  api.route("GET /teams/{teamId}", {  
    link: [database],
    handler: "./packages/functions/src/team.getTeam",
  });
  api.route("POST /teams", {
    link: [database],
    handler: "./packages/functions/src/team.newTeam",
  });
