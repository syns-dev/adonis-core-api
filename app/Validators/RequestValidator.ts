import { schema } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class RequestValidator {
  constructor(protected ctx: HttpContextContract) {}

  public refs = schema.refs({
		id: this.ctx.params.id
	});

  public schema = schema.create({
    page: schema.number.optional(),
    per_page: schema.number.optional(),
    keyword : schema.string.optional(),
    field : schema.string.optional(),
    is_deleted : schema.boolean.optional(),
    key: schema.string.optional(),
    value: schema.string.optional()
  });

  public messages = {
    required: '{{ field }} est obligatoire',
    unique: '{{ field }} est déjà utilisé',
    maxLength: '{{ field }} doit avoir {{options.maxLength}} caracteres.',
  };
}
