import { beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryOperationsRepository } from '../repositories/in-memory/in-memory-operations-repository'
import { afterEach } from 'node:test'
import { GetUserMetricYearlysUseCase } from './get-user-metrics-yearly'

let operationsRepository: InMemoryOperationsRepository
let sut: GetUserMetricYearlysUseCase

describe('Get User Metrics Yearly Use Case', () => {
  beforeEach(() => {
    operationsRepository = new InMemoryOperationsRepository()
    sut = new GetUserMetricYearlysUseCase(operationsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to get user metrics by year', async () => {
    vi.setSystemTime(new Date(2024, 9, 22, 0, 0, 0))

    await operationsRepository.create({
      id: 'operation-01',
      name: 'Operation 1',
      category: 'Food',
      price: 420,
      type: 'Credit',
      user_id: 'user-01',
      date: new Date(),
    })

    vi.setSystemTime(new Date(2024, 2, 22, 0, 0, 0))

    await operationsRepository.create({
      id: 'operation-02',
      name: 'Operation 2',
      category: 'Food',
      price: 520,
      type: 'Debit',
      user_id: 'user-01',
      date: new Date(),
    })

    vi.setSystemTime(new Date(2022, 9, 22, 0, 0, 0))

    await operationsRepository.create({
      id: 'operation-03',
      name: 'Operation 3',
      category: 'Investment',
      price: 1420,
      type: 'Deposit',
      user_id: 'user-01',
      date: new Date(),
    })

    vi.setSystemTime(new Date(2024, 9, 22, 0, 0, 0))

    await operationsRepository.create({
      id: 'operation-04',
      name: 'Operation 4',
      category: 'Investment',
      price: 1420,
      type: 'Deposit',
      user_id: 'user-02',
      date: new Date(),
    })

    const { metrics } = await sut.execute({
      userId: 'user-01',
      year: 2024,
    })

    expect(metrics.balance).toEqual(-940)
    expect(metrics.income).toEqual(0)
    expect(metrics.outcome).toEqual(940)
  })
})
