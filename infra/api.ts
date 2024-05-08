import { database } from "./database";

export const api = new sst.aws.ApiGatewayV2("BigTransitApi")
  api.route("GET /teams", {  
  link: [database],
  handler: "./packages/functions/src/api.teams",
});