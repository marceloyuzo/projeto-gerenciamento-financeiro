import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOperationsRepository } from '../repositories/in-memory/in-memory-operations-repository'
import { FetchOperationsHistoryUseCase } from './fetch-operations-history'

let operationsRepository: InMemoryOperationsRepository
let sut: FetchOperationsHistoryUseCase

describe('Fetch Operations Use Case', () => {
  beforeEach(() => {
    operationsRepository = new InMemoryOperationsRepository()
    sut = new FetchOperationsHistoryUseCase(operationsRepository)
  })

  it('should be able to fetch operations by user id', async () => {
    await operationsRepository.create({
      name: 'Ice Cream',
      category: 'Food',
      price: 500,
      date: new Date(),
      type: 'Credit',
      user_id: 'user-01',
    })

    await operationsRepository.create({
      name: 'Pop Corn',
      category: 'Food',
      price: 500,
      date: new Date(),
      type: 'Credit',
      user_id: 'user-01',
    })

    const { operations } = await sut.execute({
      userId: 'user-01',
      page: 1,
    })

    expect(operations).toHaveLength(2)
    expect(operations).toEqual([
      expect.objectContaining({ name: 'Ice Cream' }),
      expect.objectContaining({ name: 'Pop Corn' }),
    ])
  })

  it('should be able to fetch paginated operations by user id', async () => {
    for (let i = 1; i <= 22; i++) {
      await operationsRepository.create({
        name: `Pop Corn ${i}`,
        category: 'Food',
        price: 500,
        date: new Date(),
        type: 'Credit',
        user_id: 'user-01',
      })
    }

    const { operations } = await sut.execute({
      userId: 'user-01',
      page: 2,
    })

    expect(operations).toHaveLength(2)
    expect(operations).toEqual([
      expect.objectContaining({ name: 'Pop Corn 21' }),
      expect.objectContaining({ name: 'Pop Corn 22' }),
    ])
  })
})
