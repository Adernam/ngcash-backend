import express from 'express'
import {} from '../business'
import { TransactionsController } from '../controller'
import { TransactionsBusiness } from '../business'
import { AccountData, TransactionData, UserData } from '../data'
import { TokenValidator } from '../middlewares'
import { IdGenerator } from '../services'

const transactionsRoute = express.Router()

const transactionBusiness = new TransactionsBusiness(
  new UserData(),
  new TransactionData(),
  new AccountData(),
  new IdGenerator()
)

const transactionsController = new TransactionsController(transactionBusiness)
const tokenValidator = new TokenValidator()

transactionsRoute.use('/', tokenValidator.validate)

transactionsRoute.put('/transfer', transactionsController.createTransaction)
transactionsRoute.post('/transfer', transactionsController.getTransactionByDate)

export { transactionsRoute }
