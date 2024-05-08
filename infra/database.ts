export const database = new sst.aws.Dynamo("BigTransit", {
    fields: {
        PK: "string",
        SK: "string",
      },
      primaryIndex: {
        hashKey: "PK",
        rangeKey: "SK",
      },
});