import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  HttpException,
  Query
} from '@nestjs/common'
import { hash } from 'bcryptjs'
import { ICreateUserDTO } from './dtos/ICreateUserDTO'
import { IListUserDTO } from './dtos/IListUserDTO'
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
      status: 200,
      user
    }
  }

  @Get()
  async findAll(@Query() { name, email }: IListUserDTO) {
    const users = await this.usersService.findAll({ name, email })

    return {
      message: users.length > 0 ? 'Users Found' : 'None User Found',
      status: 200,
      users: users.map((user) => {
        delete user.password

        return user
      })
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findByID(id)

    delete user.password

    return {
      message: user ? 'User Found' : 'None User Found',
      status: 200,
      user
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() { name }: IUpdateUserDTO) {
    const user = await this.usersService.update(id, { name })

    delete user.password

    return {
      message: 'User Updated',
      status: 200,
      user
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id)
  }
}
