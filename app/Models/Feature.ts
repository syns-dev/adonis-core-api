import { DateTime } from 'luxon';
import { BaseModel, column, belongsTo, BelongsTo, beforeSave } from '@ioc:Adonis/Lucid/Orm';
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify';
import Encryption from '@ioc:Adonis/Core/Encryption';

export default class Feature extends BaseModel {
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
  public url: string;

  @column()
  public description?: string;

  @column()
  public isDeleted: boolean;

  @column()
  public featureId: number;

  @column()
  public childs: Array<object>;

  @column()
  public position: number;

  @column.dateTime({ 
    autoCreate: true,
    serialize: (value: DateTime | null) => {
      return value ? DateTime.fromISO(value.toString()).setLocale('fr').toFormat('f') : value
    }, 
  })
  public createdAt?: DateTime;

  @column.dateTime({ 
    autoCreate: true, 
    autoUpdate: true,
    serialize: (value: DateTime | null) => {
      return value ? DateTime.fromISO(value.toString()).setLocale('fr').toFormat('f') : value
    },  
  })
  public updatedAt?: DateTime;

  @belongsTo(() => Feature)
  public parent: BelongsTo<typeof Feature>;

  @beforeSave()
  public static async generateUid (feature: Feature) {
    feature.uid = Encryption.encrypt(`${DateTime.now().toString()}${feature.id}`);
  }

}
