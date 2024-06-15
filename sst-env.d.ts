/* tslint:disable */
/* eslint-disable */
import "sst"
declare module "sst" {
  export interface Resource {
    BigTransit: {
      name: string
      type: "sst.aws.Dynamo"
    }
    BigTransitApi: {
      type: "sst.aws.ApiGatewayV2"
      url: string
    }
  }
}
export {}