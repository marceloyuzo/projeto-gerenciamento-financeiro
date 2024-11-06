import { PrismaOperationsRepository } from '../../repositories/prisma/prisma-operations-repository'
import { FetchOperationsHistoryUseCase } from '../fetch-operations-history'

export function makeFetchOperationsUseCase() {
  const operationsRepository = new PrismaOperationsRepository()
  const useCase = new FetchOperationsHistoryUseCase(operationsRepository)

  return useCase
}
