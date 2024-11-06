import { PrismaOperationsRepository } from '../../repositories/prisma/prisma-operations-repository'
import { FetchOperationsHistoryPeriodicallyUseCase } from '../fetch-operations-history-periodically'

export function makeFetchOperationsPeriocallyUseCase() {
  const operationsRepository = new PrismaOperationsRepository()
  const useCase = new FetchOperationsHistoryPeriodicallyUseCase(
    operationsRepository,
  )

  return useCase
}
