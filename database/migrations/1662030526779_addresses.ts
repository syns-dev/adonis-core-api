import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Addresses extends BaseSchema {
  protected tableName = 'addresses';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.uuid('uid').notNullable();
      table.integer('city_id').unsigned().references('id').inTable('cities').onDelete('CASCADE');
      table.string('number', 45);
      table.string('street', 45);
      table.string('district', 45);
      table.string('reference', 45);
      table.string('phone_number', 45);
      table.float('longitude');
      table.float('latitude');
      table.boolean('is_deleted').defaultTo(false).notNullable();
      table.timestamps(true,true);
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
