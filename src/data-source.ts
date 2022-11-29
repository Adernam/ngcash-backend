import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User, Account, Transaction } from './entity/'

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'ngcash',
  synchronize: true,
  logging: false,
  entities: [User, Account, Transaction],
  migrations: [],
  subscribers: [],
})
