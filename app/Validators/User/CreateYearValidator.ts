import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateYearValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    year: schema.number([
      rules.unique({ table: 'years', column: 'year' }),
      rules.range(1900, 2100),
    ]),
    votingStartDate: schema.date({}, [rules.beforeField('votingEndDate')]),
    votingEndDate: schema.date({}, [rules.afterField('votingStartDate')]),
  })
  public messages: CustomMessages = {
    'year.unique': 'This year is already registered.',
    'year.range': 'The year must be between 1900 and 2100.',
    'votingStartDate.beforeField': 'The voting start date must be before the voting end date.',
    'votingEndDate.afterField': 'The voting end date must be after the voting start date.',
  }
}
