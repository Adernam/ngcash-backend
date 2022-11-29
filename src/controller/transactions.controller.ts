import { Request, Response } from 'express'
import { TransactionsBusiness } from '../business/transactions.business'

export class TransactionsController {
  constructor(private transactionsBusiness: TransactionsBusiness) {}

  createTransaction = async (req: Request, res: Response): Promise<void> => {
    try {
      const { value, receiver } = req.body
      const { idUser } = res.locals

      const inputTransferDTO = {
        senderId: idUser,
        receiverName: receiver,
        value,
      }

      const idTransaction = await this.transactionsBusiness.createTransaction(inputTransferDTO)

      res.status(200).send({
        message: 'Transaction completed successfully!',
        idTransaction: idTransaction,
      })
    } catch (error: any) {
      console.log(error)
      res.status(400).send(error.message || error.sqlMessage)
    }
  }

  getTransactionByDate = async (req: Request, res: Response): Promise<void> => {
    try {
      const { date } = req.body
      const { idUser } = res.locals

      const transactionsAtDate = await this.transactionsBusiness.getTransactionByDate(date, idUser)

      res.status(200).send({ transactionsAtDate })
    } catch (error) {
      console.log(error)
      res.status(400).send(error.message || error.sqlMessage)
    }
  }
}
