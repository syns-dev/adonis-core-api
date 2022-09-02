import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Rates extends BaseSchema {
  protected tableName = 'rates';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.uuid('uid').notNullable();
      table.integer('currency_id').unsigned().references('id').inTable('currencies').onDelete('CASCADE');
      table.integer('currency_to_id').unsigned().references('id').inTable('currencies').onDelete('CASCADE');
      table.float('amount').nullable();
      table.boolean('is_default').defaultTo(false);
      table.boolean('is_deleted').defaultTo(false);
      table.timestamps(true,true);
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
