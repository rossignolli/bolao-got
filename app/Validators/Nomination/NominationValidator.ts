import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class NominationValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    yearId: schema.number([rules.exists({ table: 'years', column: 'id' })]),
    categoryId: schema.number([rules.exists({ table: 'categories', column: 'id' })]),
    gameId: schema.number([rules.exists({ table: 'games', column: 'id' })]),
    isWinner: schema.boolean.optional(),
  })

  public messages: CustomMessages = {
    'yearId.exists': 'The provided year does not exist.',
    'categoryId.exists': 'The provided category does not exist.',
    'gameId.exists': 'The provided game does not exist.',
  }
}
