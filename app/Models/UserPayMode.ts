import { DateTime } from 'luxon';
import { BaseModel, column, belongsTo, BelongsTo, beforeSave } from '@ioc:Adonis/Lucid/Orm';
import PayMode from './PayMode';
import User from './User';
import Encryption from '@ioc:Adonis/Core/Encryption';

export default class UserPayMode extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public uid: string;

  @column()
  public userId: number;

  @column()
  public payModeId: number;

  @column()
  public number: string;

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

  @belongsTo(() => PayMode)
  public pay_mode: BelongsTo<typeof PayMode>;
  
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  @beforeSave()
  public static async generateUid (userPayMode: UserPayMode) {
    userPayMode.uid = Encryption.encrypt(`${DateTime.now().toString()}${userPayMode.id}`);
  }
}
