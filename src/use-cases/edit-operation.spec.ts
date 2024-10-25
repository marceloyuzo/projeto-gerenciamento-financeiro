import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOperationsRepository } from '../repositories/in-memory/in-memory-operations-repository'
import { EditOperationUseCase } from './edit-operation'

let operationsRepository: InMemoryOperationsRepository
let sut: EditOperationUseCase

describe('Edit Operation Use Case', () => {
  beforeEach(() => {
    operationsRepository = new InMemoryOperationsRepository()
    sut = new EditOperationUseCase(operationsRepository)
  })

  it('should be able to edit a operation', async () => {
    const operationCreated = await operationsRepository.create({
      id: 'id-01',
      name: 'Ice Cream',
      category: 'Food',
      price: 500,
      date: new Date(),
      type: 'Credit',
      user_id: 'user-01',
    })

    await sut.execute({
      operationId: operationCreated.id,
      name: 'Two Ice Cream',
      price: 1000,
      type: 'Debit',
    })

    const operation = await operationsRepository.findById(operationCreated.id)

    if (!operation) {
      throw new Error()
    }

    expect(operation.name).toEqual('Two Ice Cream')
    expect(operation.price).toEqual(1000)
    expect(operation.type).toEqual('Debit')
  })
})
