import { DateTime } from 'luxon';
import { BaseModel, column, belongsTo, BelongsTo, beforeSave } from '@ioc:Adonis/Lucid/Orm';
import City from './City';
import Encryption from '@ioc:Adonis/Core/Encryption';

export default class Address extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public uid: string;

  @column()
  public cityId: number;

  @column.dateTime({ 
    autoCreate: true,
    serialize: (value: DateTime | null) => {
      return value ? DateTime.fromISO(value.toString()).setLocale('fr').toFormat('f') : value
    }, 
  })
  public createdAt: DateTime

  @column.dateTime({ 
    autoCreate: true, 
    autoUpdate: true,
    serialize: (value: DateTime | null) => {
      return value ? DateTime.fromISO(value.toString()).setLocale('fr').toFormat('f') : value
    },  
  })
  public updatedAt: DateTime

  @column()
  public number: number;

  @column()
  public street: string;

  @column()
  public district: string;

  @column()
  public reference: string;

  @column()
  public phoneNumber: string;

  @column()
  public longitude: string;

  @column()
  public latitude: string;

  @column()
  public isDeleted?: boolean;

  @belongsTo(() => City)
  public city: BelongsTo<typeof City>;

  @beforeSave()
  public static async generateUid (address: Address) {
    address.uid = Encryption.encrypt(`${DateTime.now().toString()}${address.id}`);
  }
}
