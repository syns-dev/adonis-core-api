import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Cities extends BaseSchema {
  protected tableName = 'cities';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.uuid('uid').notNullable();
      table.string('name', 45).notNullable().unique();
      table.string('slug', 45).notNullable().unique();
      table.boolean('is_deleted').defaultTo(false);
      table.timestamps(true, true);
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
