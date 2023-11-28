import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Nomination from './Nomination'

interface CountResult {
  total: number
}

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

  @hasMany(() => Nomination)
  public nominations: HasMany<typeof Nomination>

  public async hasNominations(): Promise<boolean> {
    const count = (await Nomination.query()
      .where('year_id', this.id)
      .count('* as total')) as unknown as CountResult[]
    return count[0].total > 0
  }
}
