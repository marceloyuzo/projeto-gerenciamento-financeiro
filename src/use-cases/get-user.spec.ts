import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { GetUserUseCase } from './get-user'

let usersRepository: InMemoryUsersRepository
let sut: GetUserUseCase

describe('Get User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserUseCase(usersRepository)
  })

  it('should be able to get a user', async () => {
    const userCreated = await usersRepository.create({
      name: 'Marcelo Yuzo',
      email: 'marceloyuzo@hotmail.com',
      password_hashed: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: userCreated.id,
    })

    if (!user) {
      throw new Error()
    }

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('Marcelo Yuzo')
    expect(user.email).toEqual('marceloyuzo@hotmail.com')
  })
})
