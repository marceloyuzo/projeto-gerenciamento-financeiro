import { PrismaOperationsRepository } from '../../repositories/prisma/prisma-operations-repository'
import { RemoveOperationUseCase } from '../remove-operation'

export function makeRemoveOperationUseCase() {
  const operationsRepository = new PrismaOperationsRepository()
  const useCase = new RemoveOperationUseCase(operationsRepository)

  return useCase
}
