import { Operation } from '@prisma/client'
import { OperationsRepository } from '../repositories/operationsRepository'

interface FetchOperationsHistoryRequest {
  userId: string
  page: number
}

interface FetchOperationsHistoryResponse {
  operations: Operation[]
}

export class FetchOperationsHistoryUseCase {
  constructor(private operationsRepository: OperationsRepository) {}

  async execute({
    page,
    userId,
  }: FetchOperationsHistoryRequest): Promise<FetchOperationsHistoryResponse> {
    const operations = await this.operationsRepository.findManyByUserId(
      userId,
      page,
    )

    return {
      operations,
    }
  }
}
