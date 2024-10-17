import { describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { RegisterUseCase } from './register'

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const useCase = new RegisterUseCase(usersRepository)

    const { user } = await useCase.execute({
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
    const usersRepository = new InMemoryUsersRepository()
    const useCase = new RegisterUseCase(usersRepository)

    await useCase.execute({
      name: 'Marcelo Yuzo',
      email: 'marceloyuzo@hotmail.com',
      password: '123456',
    })

    expect(async () => {
      await useCase.execute({
        name: 'Marcelo Itami',
        email: 'marceloyuzo@hotmail.com',
        password: '123456',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
