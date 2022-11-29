import * as jwt from 'jsonwebtoken'
import { authenticationData } from '../types/authentication-data.type'

export class Authenticator {
  generateToken = (payload: authenticationData): string => {
    return jwt.sign(payload, process.env.JWT_KEY as string, {
      expiresIn: '1d',
    })
  }

  getTokenData = (token: string): authenticationData | null => {
    try {
      return jwt.verify(
        token,
        process.env.JWT_KEY as string
      ) as authenticationData
    } catch (error) {
      return null
    }
  }
}
