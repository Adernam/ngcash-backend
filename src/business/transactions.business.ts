import { IdGenerator } from "../services";
import { CreateTransferDTO } from "../types/create-transfer.type";
import { Transaction } from "../entity";
import { AccountData, TransactionData, UserData } from "../data";
import {
  TransactionDoneType,
  TransactionSearchResponse,
  TransactionUpdateDTO,
} from "types/transaction.type";
import moment from "moment";

export class TransactionsBusiness {
  constructor(
    private userData: UserData,
    private transactionData: TransactionData,
    private accountData: AccountData,
    private idGenerator: IdGenerator
  ) {}

  updateBalance = async ({
    receiver,
    sender,
    value,
  }: TransactionUpdateDTO): Promise<number> => {
    if (receiver.id === sender.id) {
      throw new Error("The sender cannot be the same as the receiver.");
    }

    const newBalanceReceiver = receiver.balance + value;
    const newBalanceSender = sender.balance - value;

    await this.accountData.updateBalance({
      accountId: receiver.id,
      balanceToSet: newBalanceReceiver,
    });
    await this.accountData.updateBalance({
      accountId: sender.id,
      balanceToSet: newBalanceSender,
    });

    return newBalanceSender;
  };

  createTransaction = async ({
    value,
    receiverName,
    senderId,
  }: CreateTransferDTO): Promise<TransactionDoneType> => {
    if (!value || !receiverName) {
      throw new Error("Value and receiver must be informed.");
    }

    const newIdTransaction = this.idGenerator.generateId();
    const sender = await this.userData.getUserById(senderId);
    const receiver = await this.userData.getUserByName(receiverName);

    if (!receiver) {
      throw new Error(`Receiver not found "${receiverName}"`);
    }

    const createdAt = moment().format("DD/MM/YYYY");

    const newTransaction: Transaction = {
      id: newIdTransaction,
      debitedAccountId: sender.accountId,
      creditAccountId: receiver.accountId,
      value: Number(value),
      createdAt,
    };

    await this.transactionData.insertTransaction(newTransaction);

    const newBalanceSender = await this.updateBalance({
      receiver: receiver.accountId,
      sender: sender.accountId,
      value,
    });

    return {
      transactionId: newIdTransaction,
      yourBalance: newBalanceSender,
    };
  };

  getTransactionByDate = async (date: string, idUser: string) => {
    if (!date) {
      throw new Error("Date must be informed.");
    }

    const user = await this.userData.getUserById(idUser);
    const account = await this.accountData.getAccount(user.accountId.id);

    if (!account) {
      throw new Error("Account not found.");
    }

    const transactionsAtDate = await this.transactionData.getTransferByDate(
      date,
      account.id
    );

    return transactionsAtDate;
  };
}
