import { BaseDatabase } from "./BaseDatabase";
import { User } from "../business/entities/User";
import { CustomError } from "../business/error/CustomError";

export class UserDatabase extends BaseDatabase {

   private static TABLE_NAME = "film_shots_users";

   private static toUserModel(user: any): User {
      return new User(
         user.id,
         user.name,
         user.nickname,
         user.email,
         user.password
      );
   }

   public async createUser(
      id: string,
      email: string,
      name: string,
      password: string,
      nickname: string
   ): Promise<void> {
      try {
         await BaseDatabase.getConnection
            .insert({
               id,
               name,
               nickname,
               email,
               password
            })
            .into(UserDatabase.TABLE_NAME);
      } catch (error) {
         throw new Error(error.sqlMessage || error.message);
      }
   }

   public async getUserByEmail(email: string): Promise<User> {
      try {
         const result = await BaseDatabase.getConnection
            .select("*")
            .from(UserDatabase.TABLE_NAME)
            .where({ email });

         return UserDatabase.toUserModel(result[0]);
      } catch (error) {
         throw new CustomError(500, "An unexpected error ocurred");
      }
   }
}