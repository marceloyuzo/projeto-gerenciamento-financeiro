import { PrismaOperationsRepository } from '../../repositories/prisma/prisma-operations-repository'
import { EditOperationUseCase } from '../edit-operation'

export function makeEditOperationUseCase() {
  const operationsRepository = new PrismaOperationsRepository()
  const useCase = new EditOperationUseCase(operationsRepository)

  return useCase
}
