import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Features extends BaseSchema {
  protected tableName = 'features';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.uuid('uid').notNullable();
      table.string('name', 45).notNullable();
      table.string('slug', 45).notNullable();
      table.string('url', 45);
      table.integer('feature_id ').unsigned().references('id').inTable('features');
      table.integer('position');
      table.text('description').nullable();
      table.boolean('is_deleted').defaultTo(false);
      table.timestamps(true, true);
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
