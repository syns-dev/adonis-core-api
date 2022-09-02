import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role';
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run () {
      
      const superAdmin = await Role.findBy('slug','super-admin');
      const admin = await Role.findBy('slug','admin');

      await User.createMany([
          {
            email: 'superadmin@gmail.com',
            name : 'Super Admin Simple',
            password: '12345678',
            isActivated : true,
            roleId: superAdmin?.id
          },
          {
            email: 'admin@gmail.com',
            name : 'Admin Simple',
            password: '12345678',
            isActivated : true,
            roleId : admin?.id
          },
        ])
  }
}
