import { PrismaOperationsRepository } from '../../repositories/prisma/prisma-operations-repository'
import { RegisterOperationUseCase } from '../register-operation'

export function makeRegisterOperationUseCase() {
  const operationsRepository = new PrismaOperationsRepository()
  const useCase = new RegisterOperationUseCase(operationsRepository)

  return useCase
}
