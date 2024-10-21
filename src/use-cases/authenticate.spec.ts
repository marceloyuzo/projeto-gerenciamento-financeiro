import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    usersRepository.items.push({
      id: 'id-01',
      name: 'Marcelo Yuzo',
      email: 'marceloyuzo@hotmail.com',
      password_hashed: await hash('123456', 6),
      created_at: new Date(),
    })

    const { user } = await sut.execute({
      email: 'marceloyuzo@hotmail.com',
      password: '123456',
    })

    if (!user) {
      throw new Error()
    }

    expect(user.id).toEqual(expect.any(String))
  })

  it('shouldnt be able to authenticate with wrong password', async () => {
    usersRepository.items.push({
      id: 'id-01',
      name: 'Marcelo Yuzo',
      email: 'marceloyuzo@hotmail.com',
      password_hashed: await hash('123456', 6),
      created_at: new Date(),
    })

    expect(async () => {
      await sut.execute({
        email: 'marceloyuzo@hotmail.com',
        password: 'wrongPassword',
      })
    }).rejects.toBeInstanceOf(Error)
  })

  it('shouldnt be able to authenticate with wrong email', async () => {
    usersRepository.items.push({
      id: 'id-01',
      name: 'Marcelo Yuzo',
      email: 'marceloyuzo@hotmail.com',
      password_hashed: await hash('123456', 6),
      created_at: new Date(),
    })

    expect(async () => {
      await sut.execute({
        email: 'marceloyuzo0@hotmail.com',
        password: '123456',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
