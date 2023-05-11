import "reflect-metadata";
import { middyfy } from "@libs/lambda";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import Cognito from "@libs/aws_services/cognito.services";

export const signUp = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      console.log("-----> ~ The signUp function has started");
      const { body } = event;
      const email = body["email"];
      const password = body["password"];
      const name = body["name"];

      const userAttr = [{ Name: "name", Value: name }];

      const cognitoService = new Cognito();
      await cognitoService.signUpUser(email, password, userAttr);

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

// user pool name = contactListPool
// app client name = contactListAppCognito
// user pool id = ap-southeast-2_FK6HYlNZ8
// pool arn = arn:aws:cognito-idp:ap-southeast-2:733189700685:userpool/ap-southeast-2_FK6HYlNZ8

// Authentication flows
// ALLOW_REFRESH_TOKEN_AUTH
// ALLOW_USER_PASSWORD_AUTH
// ALLOW_USER_SRP_AUTH

// Password minimum length
// 8 character(s)
// Password requirements
// Contains at least 1 number
// Contains at least 1 special character
// Contains at least 1 uppercase letter
// Contains at least 1 lowercase letter
