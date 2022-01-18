import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { ICreateUserDTO } from './dtos/ICreateUserDTO'
import { IUpdateUserDTO } from './dtos/IUpdateUserDTO'
import { v4 } from 'uuid'
import { User } from './entities/user.entity'

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

  findAll() {
    return `This action returns all users`
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

  update(id: number, updateUserDto: IUpdateUserDTO) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
