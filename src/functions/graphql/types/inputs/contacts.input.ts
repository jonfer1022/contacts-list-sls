import { Field, InputType } from 'type-graphql';

@InputType('ContactInput')
export class ContactInput {
  @Field({ nullable: true })
  id?: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;
  
  @Field()
  countryCode: string;

  @Field()
  phone: string;

  @Field({ nullable: true })
  email?: string;
  
  @Field({ nullable: true })
  address?: string;
}
