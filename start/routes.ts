import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.post('login', 'AuthController.login');
  Route.post('phone_login', 'AuthController.loginByPhone');
  Route.post('otp', 'AuthController.generateOTPCode');
  Route.post('otp_phone_change', 'AuthController.generateUpdatePhoneNumberOTPCode');
  Route.post('register', 'UsersController.store');
}).prefix('api');

Route.group(() => {
  Route.resource('users', 'UsersController');
  Route.resource('roles', 'RolesController');
  Route.resource('features', 'FeaturesController');
  Route.resource('role_permissions', 'RolePermissionsController');
  Route.resource('cities', 'CitiesController');
  Route.resource('addresses', 'AddressesController');
  Route.resource('currencies', 'CurrenciesController');
  Route.resource('rates', 'RatesController');
  Route.resource('pay_modes', 'PayModesController');
  Route.resource('user_pay_modes', 'UserPayModesController');
}).prefix('api');
