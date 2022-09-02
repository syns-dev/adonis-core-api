import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class UserPayModes extends BaseSchema {
  protected tableName = 'user_pay_modes';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.uuid('uid').notNullable();
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.integer('pay_mode_id').unsigned().references('id').inTable('pay_modes').onDelete('CASCADE');
      table.string('number', 100).notNullable();
      table.integer('is_activated').defaultTo(1);
      table.integer('is_deleted').defaultTo(0);
      table.timestamps(true, true);
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
