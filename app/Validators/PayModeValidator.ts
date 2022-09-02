import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PayModeValidator {
  constructor(protected ctx: HttpContextContract) {}

  public refs = schema.refs({
		id: this.ctx.params.id
	});

  public schema = schema.create({
    name: schema.string({trim: true}, [
      rules.maxLength(45),
      rules.unique({ table: 'cities', column: 'name', caseInsensitive: false, where: { id: !this.refs.id } }),
    ]),
    description: schema.string.optional({trim: true})
  });

  public messages = {
    required: '{{ field }} est obligatoire',
    unique: '{{ field }} est déjà utilisé',
    maxLength: '{{ field }} doit avoir {{options.maxLength}} caracteres.',
  };
}
