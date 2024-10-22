import { OperationsRepository } from '../repositories/operationsRepository'

interface RemoveOperationRequest {
  operationId: string
}

export class RemoveOperationUseCase {
  constructor(private operationsRepository: OperationsRepository) {}

  async execute({ operationId }: RemoveOperationRequest): Promise<void> {
    const operationToBeRemoved =
      await this.operationsRepository.findById(operationId)

    if (!operationToBeRemoved) {
      throw new Error()
    }

    this.operationsRepository.delete(operationToBeRemoved.id)
  }
}
