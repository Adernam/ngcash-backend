import { Entity, PrimaryColumn, Column, OneToMany, JoinColumn, OneToOne } from 'typeorm'
import { Transaction, User } from './index'

@Entity()
export class Account {
  @PrimaryColumn()
    id: string

  @Column()
    balance: number

  @OneToMany(() => Transaction, (transaction) => transaction.creditAccountId)
    creditAccount: Transaction[]

  @OneToMany(() => Transaction, (transaction) => transaction.debitedAccountId)
    debitedAccount: Transaction[]
}
