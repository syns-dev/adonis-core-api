import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class UserUpdateValidator {
  constructor(protected ctx: HttpContextContract) {};

  public refs = schema.refs({
		id: this.ctx.params.id
	});

  public schema = schema.create({
    role_id: schema.number(),
    full_name: schema.string({ trim: true }, [rules.maxLength(45)]),
    email: schema.string({ trim: true }, [
      rules.maxLength(100),
      rules.email(),
      rules.unique({ table: 'users', column: 'email', caseInsensitive: false, where: { id: !this.refs.id } }),
    ]),
    phone: schema.string({ trim: true }, [
      rules.maxLength(45),
      rules.unique({ table: 'users', column: 'phone', caseInsensitive: false, where: { id: !this.refs.id } }),
    ])
  });

  public messages = {
    required: '{{ field }} est obligatoire',
    unique: '{{ field }} est déjà utilisé',
    maxLength: '{{ field }} doit avoir {{options.maxLength}} caracteres.',
    email: 'Le mail fourni est invalide'
  };
}
