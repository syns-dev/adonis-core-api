import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Currency from 'App/Models/Currency'

export default class CurrencySeeder extends BaseSeeder {
  public async run () {
    await Currency.createMany([
      {
        name: 'CDF',
        description: 'Franc Congolais',
      },
      {
        name: 'USD',
        description: 'Dollard Amériquain'
      },
    ])
  }
}
