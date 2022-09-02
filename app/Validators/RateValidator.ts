import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RateValidator {

  constructor(protected ctx: HttpContextContract) {}

  public refs = schema.refs({
		id: this.ctx.params.id
	});

  public schema = schema.create({
    currency_id: schema.number(),
    currency_to_id: schema.number(),
    amount: schema.number(),
    is_default: schema.boolean.optional()
  });

  public messages = {
    required: '{{ field }} est obligatoire',
    unique: '{{ field }} est déjà utilisé',
    maxLength: '{{ field }} doit avoir {{options.maxLength}} caracteres.',
  };
}
