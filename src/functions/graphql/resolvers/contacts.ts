import { Op } from "sequelize";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Contacts } from "../types";
import { ContactInput } from "../types/inputs";

@Resolver()
export class ContactsResolver {
  @Query(() => [Contacts])
  async getContacts(@Arg("search", { nullable: true }) search: string) {
    try {
      let where: {
        [Op.or]?: [
          { firstName?: object },
          { lastName?: object },
          { countryCode?: object },
          { phone?: object },
          { email?: object },
          { address?: object }
        ];
      } = {};

      if (search) {
        where = {
          ...where,
          [Op.or]: [
            { firstName: { [Op.like]: `%${search}%` } },
            { lastName: { [Op.like]: `%${search}%` } },
            { countryCode: { [Op.like]: `%${search}%` } },
            { phone: { [Op.like]: `%${search}%` } },
            { email: { [Op.like]: `%${search}%` } },
            { address: { [Op.like]: `%${search}%` } },
          ],
        };
      }

      const { count, rows: rowsContants } = await Contacts.findAndCountAll({
        where,
      });
      return rowsContants;
    } catch (error) {
      console.log(`Error in getContacts: ${error}`);
      throw new Error(error);
    }
  }

  @Mutation(() => Boolean)
  async createContact(
    @Arg("contactInput")
    { firstName, lastName, countryCode, phone, email, address }: ContactInput
  ) {
    try {
      await Contacts.create({
        firstName,
        lastName,
        countryCode,
        phone,
        email,
        address,
      });
      return true;
    } catch (error) {
      console.log(`Error in createContact: ${error}`);
      throw new Error(error);
    }
  }

  @Mutation(() => Boolean)
  async editContact(
    @Arg("contactInput")
    {
      id,
      firstName,
      lastName,
      address,
      email,
      countryCode,
      phone,
    }: ContactInput
  ) {
    try {
      await Contacts.update(
        {
          lastName,
          firstName,
          phone,
          countryCode,
          address,
          email,
        },
        { where: { id } }
      );
      return true;
    } catch (error) {
      console.log(`Error in editContact: ${error}`);
      throw new Error(error);
    }
  }

  @Mutation(() => Boolean)
  async removeContact(@Arg("id") id: string) {
    try {
      await Contacts.destroy({ where: { id } });
      return true;
    } catch (error) {
      console.log(`Error in removeContact: ${error}`);
      throw new Error(error);
    }
  }
}
