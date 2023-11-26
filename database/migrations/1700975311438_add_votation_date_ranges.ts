import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'years'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.dateTime('voting_start_date').notNullable()
      table.dateTime('voting_end_date').notNullable()
    })
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      // Rollback new columns
      table.dropColumn('voting_start_date')
      table.dropColumn('voting_end_date')
    })
  }
}
