import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Roles extends BaseSchema {
  protected tableName = 'roles';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.uuid('uid').notNullable();
      table.string('name', 45).notNullable().unique();
      table.string('slug', 45).notNullable().unique();
      table.text('description').nullable();
      table.boolean('is_deleted').defaultTo(false);
      table.timestamps(true, true);
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
