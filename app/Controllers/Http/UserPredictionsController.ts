import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import UserPredictionValidator from 'App/Validators/CreateUserPredictionValidator'
import UserPrediction from 'App/Models/UserPrediction'

export default class UserPredictionsController {
  public async index({}: HttpContextContract) {
    const predictions = await UserPrediction.all()
    return predictions
  }

  public async store({ request, auth }: HttpContextContract) {
    // Assuming the user is authenticated and their ID is available via auth
    const userId = auth.user!.id

    // Validate the request data
    const data = await request.validate(UserPredictionValidator)

    // Add the userId to the validated data
    const predictionData = { ...data, userId }

    // Create a new prediction
    const prediction = await UserPrediction.create(predictionData)

    return prediction
  }

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
