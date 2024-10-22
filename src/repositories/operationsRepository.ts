import { Operation, Prisma } from '@prisma/client'

export interface OperationsRepository {
  create(data: Prisma.OperationUncheckedCreateInput): Promise<Operation>
  delete(operationId: string): Promise<void>
  findById(operationId: string): Promise<Operation | null>
}
