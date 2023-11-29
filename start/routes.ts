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

  Route.group(() => {
    Route.get('/', 'YearsController.index')
    Route.get('/:id', 'YearsController.show')
    Route.post('', 'YearsController.store').middleware('auth:api')
    Route.put('/:id', 'YearsController.update').middleware('auth:api')
    Route.delete('/:id', 'YearsController.destroy').middleware('auth:api')
  }).prefix('/years')

  Route.group(() => {
    Route.get('/', 'NominationsController.index')
    Route.get('/:id', 'NominationsController.show')
    Route.post('/', 'NominationsController.store').middleware('auth')
    Route.put('/:id', 'NominationsController.update').middleware('auth')
    Route.delete('/:id', 'NominationsController.destroy').middleware('auth')
  }).prefix('/nominations')

  Route.group(() => {
    Route.get('/', 'UserPredictionsController.index')
    Route.post('/', 'UserPredictionsController.store').middleware('auth')
    Route.put('/:id', 'UserPredictionsController.update').middleware('auth')
    Route.delete('/:id', 'UserPredictionsController.destroy').middleware('auth')
  }).prefix('/predictions')
}).prefix('api')
