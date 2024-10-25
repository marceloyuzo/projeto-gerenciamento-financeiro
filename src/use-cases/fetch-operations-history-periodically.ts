import { Operation } from '@prisma/client'
import { OperationsRepository } from '../repositories/operationsRepository'

interface FetchOperationsHistoryPeriodicallyRequest {
  userId: string
  beginPeriod: Date
  endPeriod: Date
  page: number
}

interface FetchOperationsHistoryPeriodicallyResponse {
  operations: Operation[]
}

export class FetchOperationsHistoryPeriodicallyUseCase {
  constructor(private operationsRepository: OperationsRepository) {}

  async execute({
    userId,
    beginPeriod,
    endPeriod,
    page,
  }: FetchOperationsHistoryPeriodicallyRequest): Promise<FetchOperationsHistoryPeriodicallyResponse> {
    const operations =
      await this.operationsRepository.findManyByUserIdPeriodically(
        userId,
        beginPeriod,
        endPeriod,
        page,
      )

    return {
      operations,
    }
  }
}
