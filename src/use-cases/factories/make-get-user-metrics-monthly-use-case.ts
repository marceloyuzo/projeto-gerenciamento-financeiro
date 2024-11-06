import { PrismaOperationsRepository } from '../../repositories/prisma/prisma-operations-repository'
import { GetUserMetricMonthlysUseCase } from '../get-user-metrics-monthly'

export function makeGetUserMetricsMonthlyUseCase() {
  const operationsRepository = new PrismaOperationsRepository()
  const useCase = new GetUserMetricMonthlysUseCase(operationsRepository)

  return useCase
}
