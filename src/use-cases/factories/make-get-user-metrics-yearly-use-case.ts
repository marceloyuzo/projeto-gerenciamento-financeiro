import { PrismaOperationsRepository } from '../../repositories/prisma/prisma-operations-repository'
import { GetUserMetricYearlysUseCase } from '../get-user-metrics-yearly'

export function makeGetUserMetricsYearlyUseCase() {
  const operationsRepository = new PrismaOperationsRepository()
  const useCase = new GetUserMetricYearlysUseCase(operationsRepository)

  return useCase
}
