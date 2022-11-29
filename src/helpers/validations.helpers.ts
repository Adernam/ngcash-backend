import { userLogin } from '../types/user-login.type'

export class Validations {
  private passContainsUppercase(pass: string) {
    return /[A-Z]/.test(pass)
  }

  private passContainsNumber(pass: string) {
    return /[0-9]/.test(pass)
  }

  validate(input: userLogin) {
    const { username, password } = input

    if (!username) {
      throw new Error('Please check the username field.')
    }

    if (!password) {
      throw new Error('Please check the password field.')
    }

    if (username.length < 3) {
      throw new Error('Usernam must contain at least 3 characters.')
    }

    if (password.length < 8) {
      throw new Error('Password must contain at least 8 characters.')
    }

    if (!this.passContainsUppercase(password)) {
      throw new Error(
        'The password must contain at least one uppercase letter.'
      )
    }

    if (!this.passContainsNumber(password)) {
      throw new Error('The password must contain at least one number.')
    }
  }
}
