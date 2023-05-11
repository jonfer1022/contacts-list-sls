import "reflect-metadata";
import { middyfy } from "@libs/lambda";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import Cognito from "@libs/aws_services/cognito.services";

export const signIn = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      console.log("-----> ~ The signUp function has started");
      const { body } = event;
      const email = body["email"];
      const password = body["password"];

      const cognitoService = new Cognito();
      await cognitoService.signInUser(email, password);

      console.log("-----> ~ The signUp function has finished");
      return {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: "Success",
        statusCode: 200,
      };
    } catch (error) {
      console.log(`Error in signUp: ${error}`);
      throw new Error(error);
    }
  }
);
