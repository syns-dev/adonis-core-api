import { DateTime } from 'luxon';
import { BaseModel, column, belongsTo, BelongsTo, beforeSave } from '@ioc:Adonis/Lucid/Orm';
import Currency from './Currency';
import Encryption from '@ioc:Adonis/Core/Encryption';

export default class Rate extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public uid: string;

  @column()
  public currencyId: number;

  @column()
  public amount: number;

  @column()
  public currencyToId: number;

  @column()
  public isDefault: boolean;

  @column()
  public isDeleted: boolean;

  @belongsTo(() => Currency, {
    foreignKey : 'currencyId'
  })
  public currency: BelongsTo<typeof Currency>;

  @belongsTo(() => Currency, {
    foreignKey : 'currencyToId'
  })
  public currencyTo: BelongsTo<typeof Currency>;

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

  @beforeSave()
  public static async generateUid (rate: Rate) {
    rate.uid = Encryption.encrypt(`${DateTime.now().toString()}${rate.id}`);
  }
}
