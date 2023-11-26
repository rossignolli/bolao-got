import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Year extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public year: number

  @column.dateTime({ autoCreate: false, autoUpdate: false })
  public votingStartDate: DateTime | null

  @column.dateTime({ autoCreate: false, autoUpdate: false })
  public votingEndDate: DateTime | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
