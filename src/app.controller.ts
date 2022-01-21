import { Controller, Get } from '@nestjs/common'

@Controller('/')
export class AppController {
  @Get()
  hello_world() {
    return 'Hello world! 🚀'
  }
}
