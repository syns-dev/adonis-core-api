import { DateTime } from 'luxon';
import { BaseModel, column, HasMany, hasMany, beforeSave } from '@ioc:Adonis/Lucid/Orm';
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify';
import Rate from './Rate';
import Encryption from '@ioc:Adonis/Core/Encryption';

export default class Currency extends BaseModel {
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
  public isDeleted?: boolean;

  @hasMany(() => Rate)
  public rates: HasMany<typeof Rate>;
  
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
  public static async generateUid (currency: Currency) {
    currency.uid = Encryption.encrypt(`${DateTime.now().toString()}${currency.id}`);
  }
}
