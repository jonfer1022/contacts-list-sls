import { Query, Resolver } from "type-graphql";

@Resolver()
export class LoginResolver {
  @Query(() => Boolean)
  async login() {
    return true;
  }
}
