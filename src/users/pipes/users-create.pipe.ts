import { PipeTransform, Injectable } from '@nestjs/common'
import * as Joi from 'joi'
import { joiError } from 'src/shared/functions/joiError'

@Injectable()
export class CreateUserPipe implements PipeTransform {
  async transform(value: any) {
    await Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string()
        .required()
        .min(5)
        .message(' password must have at least five characters')
    })
      .validateAsync(value, { abortEarly: false })
      .catch((err) => joiError(err))

    return value
  }
}
