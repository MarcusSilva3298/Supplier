import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  HttpException
} from '@nestjs/common'
import { hash } from 'bcryptjs'
import { ICreateUserDTO } from './dtos/ICreateUserDTO'
import { IUpdateUserDTO } from './dtos/IUpdateUserDTO'
import { CreateUserPipe } from './pipes/users-create.pipe'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(CreateUserPipe)
  async create(@Body() { name, email, password }: ICreateUserDTO) {
    const userExists = await this.usersService.findByEmail(email)

    if (userExists) {
      throw new HttpException('Email already in use', 400)
    }

    const hashPassword = await hash(password, 6)

    const user = await this.usersService.create({
      name,
      email,
      password: hashPassword
    })

    delete user.password

    return {
      message: 'User created',
      number: 200,
      user
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findByID(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: IUpdateUserDTO) {
    return this.usersService.update(+id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id)
  }
}
