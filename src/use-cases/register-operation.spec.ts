import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOperationsRepository } from '../repositories/in-memory/in-memory-operations-repository'
import { RegisterOperationUseCase } from './register-operation'

let operationsRepository: InMemoryOperationsRepository
let sut: RegisterOperationUseCase

describe('Register Operation Use Case', () => {
  beforeEach(() => {
    operationsRepository = new InMemoryOperationsRepository()
    sut = new RegisterOperationUseCase(operationsRepository)
  })

  it('should be able to register a operation', async () => {
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

  it('shoudnt be able to register a operation with wrong category', async () => {
    expect(async () => {
      await sut.execute({
        name: 'Ice cream',
        category: 'Random',
        type: 'Debit',
        price: 500,
        date: new Date(),
        userId: 'user-01',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
