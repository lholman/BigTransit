import { Handler } from "aws-lambda";

export const handler: Handler = async (event) => {
  return {
    statusCode: 200,
    body: `Welcome to Big Transit.`,
  };
};