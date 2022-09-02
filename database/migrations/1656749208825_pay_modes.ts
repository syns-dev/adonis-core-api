import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class PayModes extends BaseSchema {
  protected tableName = 'pay_modes';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.uuid('uid').notNullable();
      table.string('name', 45).unique().notNullable();
      table.string('slug', 45).unique().notNullable();
      table.string('description', 255);
      table.integer('is_activated').defaultTo(1);
      table.integer('is_deleted').defaultTo(0);
      table.timestamps(true, true);
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
