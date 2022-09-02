import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Rate from 'App/Models/Rate'

export default class RateSeeder extends BaseSeeder {
  public async run () {
    await Rate.createMany([
      {
        amount: 2000,
        currencyId : 1,
        currencyToId : 2
      }
    ])
  }
}
