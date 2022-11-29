import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Account } from "./index";

@Entity()
export class Transaction {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Account, (account) => account.id)
  @JoinColumn({ name: "account.debitedAccountId" })
  debitedAccountId: Account;

  @ManyToOne(() => Account, (account) => account.id)
  @JoinColumn({ name: "account.creditAccountId" })
  creditAccountId: Account;

  @Column()
  value: number;

  @Column()
  createdAt: string;
}
