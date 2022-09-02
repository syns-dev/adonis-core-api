import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import City from 'App/Models/City'

export default class CitySeeder extends BaseSeeder {
  public async run () {
    await City.createMany([
      {
        name: 'Lubumbashi'
      },
      {
        name: 'Kolwezi'
      },
      {
        name: 'Likasi'
      },
      {
        name: 'Kasumbalesa'
      },
      {
        name: 'Kinshasa'
      },
      {
        name: 'Goma'
      },
      {
        name: 'Bukavu'
      }
    ])
  }
}
