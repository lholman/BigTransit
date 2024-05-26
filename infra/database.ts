export const database = new sst.aws.Dynamo("BigTransit", {
  fields: {
    PK: "string",
    SK: "string",
    name: "string",
    createdAt: "string",
    updatedAt: "string",    
  },
  primaryIndex: { hashKey: 'PK', rangeKey: 'SK' },
  localIndexes: {
    CreatedAtIndex: { rangeKey: "createdAt" },
    UpdatedAtIndex: { rangeKey: "updatedAt" },
    NameIndex: { rangeKey: "name" },
  }
});