import { Account } from "entity";

export type TransactionDoneType = {
  transactionId: string;
  yourBalance: number;
};

export type TransactionUpdateDTO = {
  value: number;
  receiver: Account;
  sender: Account;
};

export type TransactionUpdateData = {
  balanceToSet: number;
  accountId: string;
};

export type TransactionSearchResponse = {
  id: string;
  value: number;
  createdAt: string;
  from: string;
  to: string;
};
