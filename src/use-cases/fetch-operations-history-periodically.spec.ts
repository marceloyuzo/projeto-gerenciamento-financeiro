import { beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryOperationsRepository } from '../repositories/in-memory/in-memory-operations-repository'
import { FetchOperationsHistoryPeriodicallyUseCase } from './fetch-operations-history-periodically'
import { afterEach } from 'node:test'

let operationsRepository: InMemoryOperationsRepository
let sut: FetchOperationsHistoryPeriodicallyUseCase

describe('Fetch Operations History Periodically Use Case', () => {
  beforeEach(() => {
    operationsRepository = new InMemoryOperationsRepository()
    sut = new FetchOperationsHistoryPeriodicallyUseCase(operationsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to fetch operations by period', async () => {
    // Criacao de operacao dentro do periodo desejado
    vi.setSystemTime(new Date(2024, 9, 22, 0, 0, 0))

    operationsRepository.create({
      name: 'Operation 1',
      category: 'Food',
      price: 420,
      type: 'Credit',
      user_id: 'user-01',
      date: new Date(),
    })

    // Criacao de operacao fora do periodo desejado
    vi.setSystemTime(new Date(2024, 10, 22, 0, 0, 0))

    operationsRepository.create({
      name: 'Operation 2',
      category: 'Food',
      price: 420,
      type: 'Credit',
      user_id: 'user-01',
      date: new Date(),
    })

    const { operations } = await sut.execute({
      userId: 'user-01',
      beginPeriod: new Date(2024, 9, 10, 0, 0, 0),
      endPeriod: new Date(2024, 9, 30, 0, 0, 0),
      page: 1,
    })

    expect(operations).toHaveLength(1)
  })
})
