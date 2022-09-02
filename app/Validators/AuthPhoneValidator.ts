import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthPhoneValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    phone: schema.string({ escape: true, trim: true }, [
        rules.maxLength(100),
    ]),
    new_phone: schema.string.optional({ escape: true, trim: true }, [
        rules.maxLength(100),
    ]),
    password: schema.string({ escape: true, trim: true }, [rules.maxLength(45)]),
  });

  public messages = {
    required: '{{ field }} est obligatoire',
    maxLength: '{{ field }} doit avoir {{options.maxLength}} caracteres.',
    email: 'Le mail fourni est invalide'
  };
}
