import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role'

export default class RoleSeeder extends BaseSeeder {
  public async run () {
    await Role.createMany([
      {
        name: 'Super Admin',
        description: 'Administrateur general du système',
      },
      {
        name: 'Admin',
        description: 'Administrateur simple'
      },
      {
        name: 'Client',
        description: 'Client sur application mobile'
      },
    ])
  }
}


