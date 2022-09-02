import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Feature from 'App/Models/Feature';

export default class FeatureSeeder extends BaseSeeder {
  public async run () {
    await Feature.createMany([
      {
        name: 'Adresses',
        description: '',
      },
      {
        name: 'Villes',
        description: 'lorem ipsum dolor',
      },
      {
        name: 'Devises',
        description: 'lorem ipsum dolor',
      },
      {
        name: 'Fonctionnalités',
        description: 'lorem ipsum dolor',
      },
      {
        name: 'Modes de paiement',
        description: 'lorem ipsum dolor',
      },
      {
        name: 'Utilisateurs',
        description: 'lorem ipsum dolor',
      },
    ])
  }
}
