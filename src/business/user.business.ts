import { AccountData, UserData } from '../data'
import { Validations } from '../helpers'
import { Authenticator } from '../services'
import { HashManager, IdGenerator } from '../services'
import { userLogin } from '../types/user-login.type'
import { AccountType as AccountType } from '../types/account.type'
import { User, Account } from '../entity'

export class UserBusiness {
  constructor(
    private userData: UserData,
    private accountData: AccountData,
    private idGenerator: IdGenerator,
    private hashManager: HashManager,
    private authenticator: Authenticator,
    private validations: Validations
  ) {}

  signup = async (input: userLogin) => {
    const { username, password } = input

    this.validations.validate(input)

    const registeredUser = await this.userData.getUserByName(username)

    if (registeredUser) {
      throw new Error('User already exists!')
    }

    const accountId = this.idGenerator.generateId()
    const defaultBalance = 100
    const newAccount: Account = {
      id: accountId,
      balance: defaultBalance,
      creditAccount: [],
      debitedAccount: [],
    }

    const account: Account = await this.accountData.createAccount(newAccount)

    const idUser = this.idGenerator.generateId()
    const hashedPassword = await this.hashManager.hash(password)
    const user: User = {
      id: idUser,
      username,
      password: hashedPassword,
      accountId: account,
    }

    await this.userData.createUser(user).catch(() => {
      this.accountData.deleteAccount(accountId)
      throw new Error('Error on create user account!')
    })

    const token: string = this.authenticator.generateToken({ idUser })

    return token
  }

  login = async (user: userLogin): Promise<string> => {
    const { username, password } = user

    if (!username || !password) {
      throw new Error('Fill in filds "username" and "password"')
    }

    const loadedUser: User = await new UserData().getUserByName(username)

    if (!loadedUser) {
      throw new Error('Invalid username or password!')
    }

    const comparePass = await this.hashManager.compare(
      password,
      loadedUser.password
    )

    if (!comparePass) {
      throw new Error('Invalid username or password!')
    }

    const token: string = this.authenticator.generateToken({
      idUser: loadedUser.id,
    })

    return token
  }

  getBalanceByName = async (idUser: string): Promise<AccountType> => {
    const result = await this.userData.getUserById(idUser)

    if (!result) {
      throw new Error('User not found!')
    }

    return {
      id: result.id,
      balance: result.accountId.balance,
    }
  }
}
