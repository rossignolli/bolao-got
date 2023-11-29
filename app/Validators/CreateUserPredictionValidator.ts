// app/Validators/UserPredictionValidator.ts

import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class UserPredictionValidator {
  public schema = schema.create({
    nominationId: schema.number([rules.exists({ table: 'nominations', column: 'id' })]),
    // Include other fields and validation rules as necessary
  })

  public messages = {
    'nominationId.exists': 'The provided nomination does not exist.',
    // Include other custom messages as necessary
  }
}
