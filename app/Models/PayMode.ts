import { DateTime } from 'luxon';
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify';
import { BaseModel, column, beforeSave } from '@ioc:Adonis/Lucid/Orm';
import Encryption from '@ioc:Adonis/Core/Encryption';

export default class PayMode extends BaseModel {
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
  public description: string;

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

  @beforeSave()
  public static async generateUid (payMode: PayMode) {
    payMode.uid = Encryption.encrypt(`${DateTime.now().toString()}${payMode.id}`);
  }
}
