import { dataSource } from "../data-source";
import { User } from "../entity/user.entity";

export class UserData {
  protected TABLE_NAME = "Users";

  createUser = async (user: any) => {
    try {
      return dataSource
        .createQueryBuilder()
        .insert()
        .into(User)
        .values(user)
        .returning(["id", "username", "accountId"])
        .execute();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Erro do banco !");
      }
    }
  };

  getUserByName = async (username: string): Promise<User> => {
    try {
      return dataSource
        .getRepository(User)
        .createQueryBuilder("user")
        .innerJoinAndSelect("user.accountId", "id")
        .where("user.username = :username", { username })
        .getOne();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Erro do banco !");
      }
    }
  };

  getUserById = async (id: string): Promise<User> => {
    try {
      return dataSource
        .getRepository(User)
        .createQueryBuilder("user")
        .innerJoinAndSelect("user.accountId", "id")
        .where("user.id = :id", { id })
        .getOne();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Erro do banco !");
      }
    }
  };

  getUserByAccountId = async (accountId: string) => {
    try {
      return dataSource
        .getRepository(User)
        .createQueryBuilder("user")
        .where("user.accountIdId = :accountId", { accountId })
        .getOne();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Erro do banco !");
      }
    }
  };
}
