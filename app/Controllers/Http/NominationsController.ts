import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Nomination from 'App/Models/Nomination'
import NominationValidator from 'App/Validators/Nomination/NominationValidator'

export default class NominationsController {
  public async index({}: HttpContextContract) {
    const nominations = await Nomination.query().preload('year').preload('game').preload('category')
    return nominations
  }

  public async store({ auth, request, response }: HttpContextContract) {
    const user = await auth.authenticate()

    if (!user.isAdmin) {
      return response.unauthorized('Only admins can create nominations')
    }

    const data = await request.validate(NominationValidator)
    const nomination = await Nomination.create(data)
    return nomination
  }

  public async show({ response, params }: HttpContextContract) {
    const nomination = await Nomination.query()
      .where('id', params.id)
      .preload('year')
      .preload('game')
      .preload('category')
      .first()

    if (!nomination) {
      return response.notFound('Nomination not found')
    }

    return nomination
  }

  public async update({ auth, request, response, params }: HttpContextContract) {
    const user = await auth.authenticate()
    if (!user.isAdmin) {
      return response.unauthorized('Only admins can create games')
    }

    const data = await request.validate(NominationValidator)
    const nomination = await Nomination.findOrFail(params.id)
    nomination.merge(data)
    await nomination.save()
    return nomination
  }

  public async destroy({ auth, response, params }: HttpContextContract) {
    const user = await auth.authenticate()

    if (!user.isAdmin) {
      return response.unauthorized('Only admins can delete nominations')
    }

    const nomination = await Nomination.findOrFail(params.id)
    await nomination.delete()
    return response.ok('Nomination deleted')
  }
}
