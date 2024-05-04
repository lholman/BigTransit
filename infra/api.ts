export const api = new sst.aws.ApiGatewayV2("BigTransitApi")
  api.route("GET /teams", {  
  handler: "./packages/functions/src/api.teams",
});