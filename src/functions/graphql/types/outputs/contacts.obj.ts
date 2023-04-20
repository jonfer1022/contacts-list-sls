import { Field, ObjectType } from 'type-graphql';
import { Contacts } from '..';

@ObjectType('ContactsObject')
export class ContactsObject {
  @Field(() => [Contacts])
  contacts: Contacts[];

  @Field()
  totalContacts: number;
}
