import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthValidator {
    constructor(protected ctx: HttpContextContract) {}

    public schema = schema.create({
        email: schema.string({ escape: true, trim: true }, [
            rules.maxLength(100),
            rules.email(),
        ]),
        password: schema.string({ escape: true, trim: true }, [rules.maxLength(45)]),
    });

    public messages = {
        required: '{{ field }} est obligatoire',
        maxLength: '{{ field }} doit avoir {{options.maxLength}} caracteres.',
        email: 'Le mail fourni est invalide'
    };
}
