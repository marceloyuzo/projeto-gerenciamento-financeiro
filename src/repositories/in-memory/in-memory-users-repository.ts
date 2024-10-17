import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../usersRepository'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async create(data: Prisma.UserCreateInput) {
    const user: User = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hashed: data.password_hashed,
      created_at: new Date(),
    }

    this.items.push(user)

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }
}
