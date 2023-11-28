import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Nomination from 'App/Models/Nomination'
import Year from 'App/Models/Year'
import CreateYearValidator from 'App/Validators/User/CreateYearValidator'
import UpdateYearValidator from 'App/Validators/Year/UpdateYearValidator'

export default class YearsController {
  public async index({}: HttpContextContract) {
    const years = await Year.all()
    return years
  }

  public async store({ auth, request, response }: HttpContextContract) {
    const user = await auth.authenticate()
    if (!user.isAdmin) {
      return response.unauthorized('Only admins can create years')
    }

    const validatedData = await request.validate(CreateYearValidator)

    const year = await Year.create(validatedData)
    return year
  }

  public async show({ response, params }: HttpContextContract) {
    const year = await Year.findOrFail(params.id)

    if (!year) {
      return response.notFound('Year not found')
    }

    return year
  }

  public async update({ response, auth, params, request }: HttpContextContract) {
    const user = await auth.authenticate()

    if (!user.isAdmin) {
      return response.unauthorized('Only admins can update years')
    }

    const year = await Year.findOrFail(params.id)
    const validatedData = await request.validate(UpdateYearValidator)

    year.merge(validatedData)

    await year.save()
    return year
  }

  public async destroy({ response, auth, params }: HttpContextContract) {
    const user = await auth.authenticate()
    const year = await Year.findOrFail(params.id)

    if (await year.hasNominations()) {
      return response.badRequest({
        message: 'Cannot delete this year because it has associated nominations.',
      })
    }
    if (!user.isAdmin) {
      return response.unauthorized('Only admins can delete years')
    }

    if (await year.hasNominations()) {
      return response.badRequest({
        message: 'Cannot delete this year because it has associated nominations.',
      })
    }

    await year.delete()
    return response.ok('Year deleted')
  }
}
