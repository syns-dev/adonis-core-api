import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RolePermissionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    role_id: schema.number(),
    feature_id: schema.number(),
    can_create: schema.boolean(),
    can_read: schema.boolean(),
    can_update: schema.boolean(),
    can_delete: schema.boolean(),
  });

  public messages = {};
}
