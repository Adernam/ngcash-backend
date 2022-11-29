import { Account } from "../entity";
import { dataSource } from "../data-source";
import { DeleteResult } from "typeorm";
import { TransactionUpdateData } from "types/transaction.type";

export class AccountData {
  protected TBALE_NAME = "Accounts";

  createAccount = async (account: Account): Promise<Account> => {
    try {
      const result = await dataSource
        .createQueryBuilder()
        .insert()
        .into(Account)
        .values(account)
        .returning(["id", "creditAccount", "balance", "debitedAccount"])
        .execute();

      const { creditAccount, debitedAccount, balance, id } = result.raw[0];

      const newAccount: Account = {
        id,
        creditAccount,
        debitedAccount,
        balance,
      };

      return newAccount;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Databsae error !");
      }
    }
  };

  getAccount = async (id: string): Promise<Account> => {
    try {
      const account: any = await dataSource
        .getRepository(Account)
        .createQueryBuilder("account")
        .where("account.id = :id", { id })
        .getOne();

      if (!account) {
        throw new Error("Invalid username or password");
      }

      return account;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Databsae error !");
      }
    }
  };

  deleteAccount = async (id: string): Promise<DeleteResult> => {
    try {
      return dataSource
        .createQueryBuilder()
        .delete()
        .from(Account)
        .where("user.id = :id", { id })
        .execute();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Databsae error !");
      }
    }
  };

  updateBalance = async ({
    accountId,
    balanceToSet,
  }: TransactionUpdateData): Promise<number> => {
    try {
      const result = await dataSource
        .createQueryBuilder()
        .update(Account)
        .set({
          balance: balanceToSet,
        })
        .where("id = :id", { id: accountId })
        .returning("balance")
        .execute();

      const { balance } = result.raw[0];

      return balance;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
}
