import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();
      table.uuid('uid').notNullable();
      table.integer('role_id').unsigned().references('id').inTable('roles').onDelete('CASCADE');
      table.string('name', 45).notNullable();
      table.string('email', 100).nullable().unique();
      table.string('phone', 45).nullable().unique();
      table.string('password', 180).notNullable();
      table.string('otp_code', 10).nullable();
      table.string('remember_me_token').nullable();
      table.boolean('is_validated').defaultTo(false).notNullable();
      table.boolean('is_activated').defaultTo(true).notNullable();
      table.boolean('is_deleted').defaultTo(false).notNullable();
      table.timestamps(true, true);
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
