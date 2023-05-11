import "reflect-metadata";
import { middyfy } from "@libs/lambda";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import Cognito from "@libs/aws_services/cognito.services";
import { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import schema from "./schema";

const confirmSignUp: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  try {
    console.log("-----> ~ The confirmSignUp function has started");
    const { email, code } = event.body;
    console.log("-----> ~ email, code:", email, code);
    console.log("-----> ~ schema:", schema);
    const cognitoService = new Cognito();
    await cognitoService.confirmSignUp(email, String(code));

    console.log("-----> ~ The confirmSignUp function has finished");
    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: "algo",
      statusCode: 200,
    };
  } catch (error) {
    console.log(`Error in confirmSignUp: ${error}`);
    throw new Error(error);
  }
};

export const main = middyfy(confirmSignUp);
