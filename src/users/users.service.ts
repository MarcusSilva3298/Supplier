import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { ICreateUserDTO } from './dtos/ICreateUserDTO'
import { IUpdateUserDTO } from './dtos/IUpdateUserDTO'
import { v4 } from 'uuid'
import { User } from './entities/user.entity'
import { IListUserDTO } from './dtos/IListUserDTO'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create({ email, name, password }: ICreateUserDTO): Promise<User> {
    return await this.prisma.user.create({
      data: {
        id: v4(),
        email,
        name,
        password
      }
    })
  }

  async findAll({ name, email }: IListUserDTO) {
    return await this.prisma.user.findMany({
      where: {
        name: { contains: name },
        email: { contains: email }
      }
    })
  }

  async findByID(id: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: { id }
    })
  }

  async findByEmail(email: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: { email }
    })
  }

  async update(id: string, { name }: IUpdateUserDTO) {
    return await this.prisma.user.update({
      where: { id },
      data: { name }
    })
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
