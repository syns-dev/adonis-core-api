import { DateTime } from 'luxon';
import { BaseModel, column, hasMany, HasMany, beforeSave } from '@ioc:Adonis/Lucid/Orm';
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'
import User from './User';
import RolePermission from './RolePermission';
import Encryption from '@ioc:Adonis/Core/Encryption';

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public uid: string;

  @column()
  public name: string;

  @column()
  @slugify({
    strategy: 'simple',
    fields: ['name'],
    allowUpdates: true,
  })
  public slug: string;

  @column()
  public description?: string;

  @column()
  public isDeleted: boolean;

  @column.dateTime({ 
    autoCreate: true,
    serialize: (value: DateTime | null) => {
      return value ? DateTime.fromISO(value.toString()).setLocale('fr').toFormat('f') : value
    }, 
  })
  public createdAt: DateTime;

  @column.dateTime({ 
    autoCreate: true, 
    autoUpdate: true,
    serialize: (value: DateTime | null) => {
      return value ? DateTime.fromISO(value.toString()).setLocale('fr').toFormat('f') : value
    },  
  })
  public updatedAt: DateTime;

  @hasMany(() => User)
  public users: HasMany<typeof User>;

  @hasMany(() => RolePermission)
  public permissions: HasMany<typeof RolePermission>;

  @beforeSave()
  public static async generateUid (role: Role) {
    role.uid = Encryption.encrypt(`${DateTime.now().toString()}${role.id}`);
  }
}
