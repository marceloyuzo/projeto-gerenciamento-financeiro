import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'Marcelo Yuzo',
      email: 'marceloyuzo@hotmail.com',
      password: '123456',
    })

    if (!user) {
      throw new Error()
    }

    expect(user.id).toEqual(expect.any(String))
  })

  it('shouldnt be able to register with duplicate email', async () => {
    await sut.execute({
      name: 'Marcelo Yuzo',
      email: 'marceloyuzo@hotmail.com',
      password: '123456',
    })

    expect(async () => {
      await sut.execute({
        name: 'Marcelo Itami',
        email: 'marceloyuzo@hotmail.com',
        password: '123456',
      })
    }).rejects.toBeInstanceOf(Error)
  })

  it('should be password hashed', async () => {
    const { user } = await sut.execute({
      name: 'Marcelo Yuzo',
      email: 'marceloyuzo@hotmail.com',
      password: '123456',
    })

    if (!user) {
      throw new Error()
    }

    const isPasswordHashed = await compare('123456', user.password_hashed)

    expect(isPasswordHashed).toBeTruthy()
  })
})
