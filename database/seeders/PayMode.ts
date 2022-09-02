import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import PayMode from 'App/Models/PayMode';

export default class PayModeSeeder extends BaseSeeder {
  public async run () {
    await PayMode.createMany([
      {
        name: 'Airtel money',
        description: 'airtel mobile money payment',
      },
      {
        name: 'M-Pesa',
        description: 'vodacom mobile money payment',
      },
      {
        name: 'Orange Money',
        description: 'orange mobile money payment',
      }
    ])
  }
}
