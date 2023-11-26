import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class RegisterValidator {
  public schema = schema.create({
    email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
    password: schema.string({}, [rules.minLength(6)]),
    username: schema.string({}, [
      rules.required(),
      rules.unique({ table: 'users', column: 'username' }),
    ]),
  })

  public messages = {
    'email.required': 'Email is required to register',
    'email.email': 'You must provide a valid email address',
    'email.unique': 'This email is already in use',
    'password.required': 'Password is required',
    'password.minLength': 'Password should be at least 6 characters long',
  }
}
