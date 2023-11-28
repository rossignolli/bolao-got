import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Game from './Game'
import Category from './Category'
import Year from './Year'
import UserPrediction from './UserPrediction'

export default class Nomination extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public yearId: number

  @column()
  public categoryId: number

  @column()
  public gameId: number

  @column()
  public isWinner: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Game, {
    foreignKey: 'gameId',
  })
  public game: BelongsTo<typeof Game>

  @belongsTo(() => Category, {
    foreignKey: 'categoryId',
  })
  public category: BelongsTo<typeof Category>

  @belongsTo(() => Year, {
    foreignKey: 'yearId',
  })
  public year: BelongsTo<typeof Year>

  @hasMany(() => UserPrediction)
  public predictions: HasMany<typeof UserPrediction>
}
