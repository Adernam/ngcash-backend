import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm'
import { Account } from './index'
@Entity()
export class User {
  @PrimaryColumn()
    id: string

  @Column()
    username: string

  @Column()
    password: string

  @OneToOne(() => Account)
  @JoinColumn()
    accountId: Account
}
