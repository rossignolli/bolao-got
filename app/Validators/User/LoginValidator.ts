import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class LoginValidator {
  public schema = schema.create({
    email: schema.string({}, [rules.email()]),
    password: schema.string({}),
  })

  public messages = {
    'email.required': 'Email is required to login',
    'email.email': 'You must provide a valid email address',
    'password.required': 'Password is required',
  }
}
