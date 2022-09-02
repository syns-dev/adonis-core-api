import { DateTime } from 'luxon';
import { BaseModel, column,  hasMany, HasMany, beforeSave } from '@ioc:Adonis/Lucid/Orm';
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify';
import Address from './Address';
import Encryption from '@ioc:Adonis/Core/Encryption';

export default class City extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public uid: string;

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
  public isDeleted?: boolean;

  @hasMany(() => Address)
  public addresses: HasMany<typeof Address>;

  @beforeSave()
  public static async generateUid (city: City) {
    city.uid = Encryption.encrypt(`${DateTime.now().toString()}${city.id}`);
  }
}
