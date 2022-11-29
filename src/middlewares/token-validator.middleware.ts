import { Request, Response, NextFunction } from 'express'
import { Authenticator } from '../services/authenticator.service'

export class TokenValidator {
  validate(req: Request, res: Response, next: NextFunction) {
    const authenticator = new Authenticator()
    const { token } = req.headers
    const messageNotAuthorized = 'User not authorized!'

    if (!token) {
      res.status(401).send('Invalid token')
    }

    const tokenData = authenticator.getTokenData(token as string)

    if (!tokenData) {
      res.status(401).send(messageNotAuthorized)
    }

    res.locals.idUser = tokenData?.idUser

    next()
  }
}
