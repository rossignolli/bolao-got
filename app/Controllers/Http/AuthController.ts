import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import LoginValidator from 'App/Validators/User/LoginValidator'
import RegisterValidator from 'App/Validators/User/RegisterValidator'

export default class AuthController {
  /**
   * Register a new user.
   */
  public async register({ request, response }: HttpContextContract) {
    const validatedData = await request.validate(RegisterValidator)

    // Check if user already exists
    const userExists = await User.findBy('email', validatedData.email)
    if (userExists) {
      return response.badRequest({ message: 'User already exists' })
    }

    // Create new user using validated data
    const user = await User.create(validatedData)

    return response.created({ message: 'User created successfully', user })
  }

  /**
   * Log in a user and return an API token.
   */
  public async login({ request, auth, response }: HttpContextContract) {
    const validatedData = await request.validate(LoginValidator)

    try {
      // Attempt to authenticate the user using validated data
      const token = await auth.use('api').attempt(validatedData.email, validatedData.password, {
        expiresIn: '7days', // Token is valid for 7 days
      })

      const user = await User.query().where('email', validatedData.email).firstOrFail()

      const isAdmin = user.isAdmin // Assuming isAdmin is a boolean field in your User model

      return {
        type: token.type,
        token: token.token,
        expires_at: token.expiresAt,
        user: {
          isAdmin: isAdmin,

          // ... include other user details as needed
        },
      }
    } catch {
      return response.badRequest('Invalid credentialss')
    }
  }

  /**
   * Log out a user by revoking the API token.
   */
  public async logout({ auth, response }: HttpContextContract) {
    await auth.use('api').revoke()
    return response.ok({ message: 'Logged out successfully' })
  }
}
