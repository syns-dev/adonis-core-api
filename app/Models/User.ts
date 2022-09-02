import { DateTime } from 'luxon';
import Hash from '@ioc:Adonis/Core/Hash';
import {
  column,
  beforeSave,
  BaseModel,
  belongsTo,
  BelongsTo,
  HasMany,
  hasMany
} from '@ioc:Adonis/Lucid/Orm';
import Role from './Role';
import UserPayMode from './UserPayMode';
import Encryption from '@ioc:Adonis/Core/Encryption';

export default class User extends BaseModel {

  @column({ isPrimary: true })
  public id: number;

  @column()
  public uid: string;

  @column()
  public roleId: number;

  @column()
  public email: string;

  @column()
  public name: string;

  @column()
  public phone: string;

  @column({ serializeAs: null })
  public password: string;

  @column({ serializeAs: null })
  public otpCode: string;

  @column()
  public rememberMeToken?: string;

  @column()
  public isValidated?: boolean;

  @column()
  public isActivated?: boolean;

  @column()
  public isDeleted?: boolean;

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

  @hasMany(() => UserPayMode)
  public payModes: HasMany<typeof UserPayMode>;

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }

    user.uid = Encryption.encrypt(`${DateTime.now().toString()}${user.id}`);
  }

}
