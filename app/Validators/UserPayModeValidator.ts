import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserPayModeValidator {
  constructor(protected ctx: HttpContextContract) {}

  public refs = schema.refs({
		id: this.ctx.params.id
	});

  public schema = schema.create({
    user_id: schema.number(),
    pay_mode_id: schema.number(),
    number: schema.string({trim: true}, [
      rules.maxLength(100)
    ])
  });

  public messages = {
    required: '{{ field }} est obligatoire',
    unique: '{{ field }} est déjà utilisé',
    maxLength: '{{ field }} doit avoir {{options.maxLength}} caracteres.',
  };
}
