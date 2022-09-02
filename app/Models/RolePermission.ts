import { DateTime } from 'luxon';
import { BaseModel, column, BelongsTo, belongsTo, beforeSave } from '@ioc:Adonis/Lucid/Orm';
import Feature from './Feature';
import Role from './Role';
import Encryption from '@ioc:Adonis/Core/Encryption';

export default class RolePermission extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public uid: string;

  @column()
  public roleId: number;

  @column()
  public featureId: number;

  @column()
  public canCreate: boolean;

  @column()
  public canRead: boolean;

  @column()
  public canUpdate: boolean;

  @column()
  public canDelete: boolean;

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

  @belongsTo(() => Role)
  public role: BelongsTo<typeof Role>;

  @belongsTo(() => Feature)
  public feature: BelongsTo<typeof Feature>;

  @beforeSave()
  public static async generateUid (rolePermission: RolePermission) {
    rolePermission.uid = Encryption.encrypt(`${DateTime.now().toString()}${rolePermission.id}`);
  }
}
