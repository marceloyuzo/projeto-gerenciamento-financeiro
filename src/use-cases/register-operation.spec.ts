import { beforeEach, describe, expect, it } from 'vitest'
import { compare } from 'bcryptjs'
import { InMemoryOperationsRepository } from '../repositories/in-memory/in-memory-operations-repository'
import { RegisterOperationUseCase } from './register-operation'

let operationsRepository: InMemoryOperationsRepository
let sut: RegisterOperationUseCase

describe('Register Operation Use Case', () => {
  beforeEach(() => {
    operationsRepository = new InMemoryOperationsRepository()
    sut = new RegisterOperationUseCase(operationsRepository)
  })

  it('should be able to register', async () => {
    const { operation } = await sut.execute({
      name: 'Ice cream',
      category: 'Food',
      type: 'Debit',
      price: 500,
      date: new Date(),
      userId: 'user-01',
    })

    if (!operation) {
      throw new Error()
    }

    expect(operation.id).toEqual(expect.any(String))
  })
})
