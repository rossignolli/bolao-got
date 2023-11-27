import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Game from 'App/Models/Game'

export default class GamesController {
  public async index({}: HttpContextContract) {
    const games = await Game.all()
    return games
  }

  public async store({ auth, request, response }: HttpContextContract) {
    const user = await auth.authenticate()
    if (!user.isAdmin) {
      return response.unauthorized('Only admins can create games')
    }

    const data = request.only(['title', 'releaseDate', 'publisher', 'developer', 'coverUrl'])
    const game = await Game.create(data)
    return game
  }

  public async show({ response, params }: HttpContextContract) {
    const game = await Game.findOrFail(params.id)

    if (!game) {
      return response.notFound('Game not found')
    }

    return game
  }

  public async update({ response, auth, params, request }: HttpContextContract) {
    const user = await auth.authenticate()

    if (!user.isAdmin) {
      return response.unauthorized('Only admins can update games')
    }

    const game = await Game.findOrFail(params.id)
    game.merge(request.only(['title', 'releaseDate', 'publisher', 'developer', 'coverUrl']))
    await game.save()
    return game
  }

  public async destroy({ response, auth, params }: HttpContextContract) {
    const user = await auth.authenticate()

    if (!user.isAdmin) {
      return response.unauthorized('Only admins can delete games')
    }

    const game = await Game.findOrFail(params.id)
    await game.delete()
    return response.ok('Game deleted')
  }
}
