import { Operation } from '@prisma/client'
import { OperationsRepository } from '../repositories/operationsRepository'

interface EditOperationRequest {
  operationId: string
}

interface EditOperationResponse {
  operation: Operation
}

export class EditOperationUseCase {
  constructor(private operationsRepository: OperationsRepository) {}

  async execute({
    operationId,
  }: EditOperationRequest): Promise<EditOperationResponse> {}
}
