import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class AddressValidator {
  constructor(protected ctx: HttpContextContract) {}

  public refs = schema.refs({
		id: this.ctx.params.id
	});

  public schema = schema.create({
    city_id: schema.number(),
    number: schema.string.optional({trim: true}, [
      rules.maxLength(45)
    ]),
    street: schema.string({trim: true}, [
      rules.maxLength(45)
    ]),
    district: schema.string({trim: true}, [
      rules.maxLength(45)
    ]),
    reference: schema.string.optional({trim: true}, [
      rules.maxLength(45)
    ]),
    phone_number: schema.string.optional({trim: true}, [
      rules.maxLength(12)
    ]),
    longitude: schema.string.optional({trim: true}, [
      rules.maxLength(45)
    ]),
    latitude: schema.string.optional({trim: true}, [
      rules.maxLength(45)
    ]),
    description: schema.string.optional({trim: true})
  });

  public messages = {
    required: '{{ field }} est obligatoire',
    unique: '{{ field }} est déjà utilisé',
    maxLength: '{{ field }} doit avoir {{options.maxLength}} caracteres.',
  };
}
