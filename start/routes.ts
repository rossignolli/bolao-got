import Route from '@ioc:Adonis/Core/Route'
import apiLegalTerms from 'Config/info'

Route.get('/', async () => {
  return apiLegalTerms
})

Route.group(() => {
  Route.get('/', async () => {
    return apiLegalTerms
  })

  Route.group(() => {
    Route.post('/register', 'AuthController.register')
    Route.post('/login', 'AuthController.login')
    Route.post('/logout', 'AuthController.logout').middleware('auth:api')
  }).prefix('/auth')

  Route.group(() => {
    Route.get('/', 'CategoriesController.index')
    Route.get('/:id', 'CategoriesController.show')
    Route.post('', 'CategoriesController.store').middleware('auth:api')
    Route.put('/:id', 'CategoriesController.update').middleware('auth:api')
    Route.delete('/:id', 'CategoriesController.destroy').middleware('auth:api')
  }).prefix('/categories')

  Route.group(() => {
    Route.get('/', 'GamesController.index')
    Route.get('/:id', 'GamesController.show')
    Route.post('', 'GamesController.store').middleware('auth:api')
    Route.put('/:id', 'GamesController.update').middleware('auth:api')
    Route.delete('/:id', 'GamesController.destroy').middleware('auth:api')
  }).prefix('/games')
}).prefix('api')
