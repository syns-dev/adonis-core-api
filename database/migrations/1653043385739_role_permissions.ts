import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class RolePermissions extends BaseSchema {
  protected tableName = 'role_permissions';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.uuid('uid').notNullable();
      table.integer('role_id').unsigned().references('id').inTable('roles').onDelete('CASCADE');
      table.integer('feature_id').unsigned().references('id').inTable('features').onDelete('CASCADE');
      table.boolean('can_create').defaultTo(false);
      table.boolean('can_read').defaultTo(false);
      table.boolean('can_update').defaultTo(false);
      table.boolean('can_delete').defaultTo(false);
      table.boolean('is_deleted').defaultTo(false);
      table.timestamps(true, true);
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
