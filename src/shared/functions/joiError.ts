import { HttpException } from '@nestjs/common'

export function joiError(err: any) {
  const parsedError = err.details.map((detail) => {
    let redo = detail.message.replace('"', ' ')
    redo = redo.replace('"', '')
    return redo
  })

  throw new HttpException(`Invalid data:${parsedError}`, 400)
}
