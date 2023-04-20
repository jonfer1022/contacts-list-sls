import "reflect-metadata";
import { middyfy } from "@libs/lambda";
import * as vCards from "vcards-js";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import * as db from "../../config/connection";
import * as models from "../../graphql/types";
import { Contacts } from "../../graphql/types";

db.sqlz.addModels(Object.values(models));

export const generateVcard = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      console.log("-----> ~ The generateVcard function has started");
      const { body } = event;
      const vCard = vCards();
      const contactId = body["id"];
      let contactVcard = "";
      if (contactId) {
        const contact = await Contacts.findOne({ where: { id: contactId } });
        vCard.firstName = contact.firstName;
        vCard.lastName = contact.lastName;
        vCard.cellPhone = contact.phone;
        vCard.email = contact.email;
        vCard.homeAddress.street = contact.address;
        contactVcard = vCard.getFormattedString();
      } else {
        throw new Error("The parameter Id is requested");
      }

      console.log("-----> ~ The generateVcard function has finished");
      return {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: contactVcard,
        statusCode: 200,
      };
    } catch (error) {
      console.log(`Error in generateVcard: ${error}`);
      throw new Error(error);
    }
  }
);
