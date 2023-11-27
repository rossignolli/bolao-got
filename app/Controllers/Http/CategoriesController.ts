import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'

export default class CategoriesController {
  public async index({}: HttpContextContract) {
    const categories = await Category.all()
    return categories
  }

  public async store({ auth, request, response }: HttpContextContract) {
    const user = await auth.authenticate()

    if (!user.isAdmin) {
      return response.unauthorized('Only admins can create categories')
    }

    const data = request.only(['categoryName', 'categoryDescription']) // Adjust fields based on your model
    const category = await Category.create(data)
    return category
  }

  public async show({ params }: HttpContextContract) {
    const category = await Category.findOrFail(params.id)

    return category
  }

  public async update({ auth, request, params, response }: HttpContextContract) {
    const user = await auth.authenticate()

    if (!user.isAdmin) {
      return response.unauthorized('Only admins can update categories')
    }

    const category = await Category.findOrFail(params.id)
    category.merge(request.only(['categoryName', 'categoryDescription'])) // Adjust fields based on your model
    await category.save()
    return category
  }

  public async destroy({ auth, params, response }: HttpContextContract) {
    const user = await auth.authenticate()

    if (!user.isAdmin) {
      return response.unauthorized('Only admins can delete categories')
    }

    const category = await Category.findOrFail(params.id)
    await category.delete()
    return response.ok('Category deleted')
  }
}
