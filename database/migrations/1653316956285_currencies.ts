import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Currencies extends BaseSchema {

  protected tableName = 'currencies';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.uuid('uid').notNullable();
      table.string('name', 45).notNullable().unique();
      table.string('description', 45).nullable()
      table.string('slug', 45).notNullable().unique();
      table.boolean('is_default').defaultTo(false);
      table.boolean('is_deleted').defaultTo(false);
      table.timestamps(true,true);
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
