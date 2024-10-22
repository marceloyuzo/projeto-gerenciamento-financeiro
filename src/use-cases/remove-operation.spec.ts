import { beforeEach, describe, expect, it } from 'vitest'
import { RemoveOperationUseCase } from './remove-operation'
import { InMemoryOperationsRepository } from '../repositories/in-memory/in-memory-operations-repository'

let operationsRepository: InMemoryOperationsRepository
let sut: RemoveOperationUseCase

describe('Remove Operation Use Case', () => {
  beforeEach(() => {
    operationsRepository = new InMemoryOperationsRepository()
    sut = new RemoveOperationUseCase(operationsRepository)
  })

  it('should be able to delete a operation', async () => {
    const { id } = await operationsRepository.create({
      name: 'Ice cream',
      category: 'Food',
      type: 'Debit',
      price: 500,
      date: new Date(),
      user_id: 'user-01',
    })

    await sut.execute({ operationId: id })

    const operation = await operationsRepository.findById(id)

    expect(operation).toBeNull()
  })
})
