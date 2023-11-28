import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Nomination from 'App/Models/Nomination'
import NominationValidator from 'App/Validators/Nomination/NominationValidator'

export default class NominationsController {
  public async index({}: HttpContextContract) {
    const nominations = await Nomination.all()
    return nominations
  }

  public async store({ request }: HttpContextContract) {
    const data = await request.validate(NominationValidator)
    const nomination = await Nomination.create(data)
    return nomination
  }

  public async update({ request, params }: HttpContextContract) {
    const data = await request.validate(NominationValidator)
    const nomination = await Nomination.findOrFail(params.id)
    nomination.merge(data)
    await nomination.save()
    return nomination
  }
}
