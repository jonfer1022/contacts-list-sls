import { Op } from "sequelize";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Contacts } from "../types";
import { ContactInput } from "../types/inputs";
import { ContactsObject } from "../types/outputs";

@Resolver()
export class ContactsResolver {
  @Query(() => ContactsObject)
  async getContacts(
    @Arg("search", { nullable: true }) search: string,
    @Arg('pages', { defaultValue: 1 }) pages: number,
    @Arg('limit', { defaultValue: 10 }) limit: number,
  ) {
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

      const { count, rows } = await Contacts.findAndCountAll({
        where,
        order: [['firstName', 'ASC']],
        limit: limit,
        offset: (limit * pages) - limit
      });
      return { contacts: rows, totalContacts: count };
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
