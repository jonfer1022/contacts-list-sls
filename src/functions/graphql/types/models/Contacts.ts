import {
  Column,
  CreatedAt,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType('Contacts')
@Table({ tableName: 'Contacts' })
export class Contacts extends Model<Contacts> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  @Field(() => ID)
  public id!: string;

  @Field({ description: 'Contacts First Name' })
  @Column
  public firstName!: string;

  @Field({ description: 'Contacts Last Name.' })
  @Column
  public lastName!: string;

  @Field({ description: 'Contacts Phone' })
  @Column
  public phone!: string;

  @Field({ description: 'Contacts Country code' })
  @Column
  public countryCode!: string;

  @Field({ description: 'Contacts email.', nullable: true })
  @Column
  public email!: string;

  @Field({ description: 'Contacts address.', nullable: true })
  @Column
  public address!: string;

  @Field({ description: 'Creation Date' })
  @CreatedAt
  public createdAt!: Date;

  @Field({ description: 'Updating Date' })
  @UpdatedAt
  public updatedAt!: Date;
}
