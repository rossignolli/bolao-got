import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddIsAdminToUsers extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.boolean('is_admin').defaultTo(false)
    })
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('is_admin')
    })
  }
}
