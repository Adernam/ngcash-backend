import { Transaction } from "../entity";
import { dataSource } from "../data-source";

export class TransactionData {
  protected TABLE_NAME = "transaction";

  insertTransaction = async (
    transaction: Transaction
  ): Promise<Transaction> => {
    try {
      const result = await dataSource
        .createQueryBuilder()
        .insert()
        .into(this.TABLE_NAME)
        .values(transaction)
        .returning([
          "id",
          "creditAccount",
          "debitedAccount",
          "value",
          "createdAt",
        ])
        .execute();

      const { id, creditAccount, debitAccount, value, createdAt } =
        result.raw[0];

      return {
        id,
        creditAccountId: creditAccount,
        debitedAccountId: debitAccount,
        value,
        createdAt,
      };
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  getTransferByDate = async (
    date: string,
    accountId: string
  ): Promise<Transaction[]> => {
    try {
      return dataSource
        .getRepository(Transaction)
        .createQueryBuilder("transaction")
        .innerJoinAndSelect("transaction.debitedAccountId", "debitedAccountId")
        .innerJoinAndSelect("transaction.creditAccountId", "creditAccountId")
        .where("transaction.createdAt = :createdAt", { createdAt: date })
        .andWhere("transaction.debitedAccountId = :debitedAccountIdId", {
          debitedAccountIdId: accountId,
        })
        .orWhere("transaction.creditAccountId = :creditAccountIdId", {
          creditAccountIdId: accountId,
        })
        .select([
          "transaction.id",
          "transaction.value",
          "transaction.createdAt",
          "debitedAccountId.id",
          "creditAccountId.id",
        ])
        .getMany();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Databsae error !");
      }
    }
  };
}
