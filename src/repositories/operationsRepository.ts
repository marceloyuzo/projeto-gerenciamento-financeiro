import { Operation, Prisma } from '@prisma/client'

export interface OperationsRepository {
  create(data: Prisma.OperationUncheckedCreateInput): Promise<Operation>
  delete(operationId: string): Promise<void>
  edit(operation: Operation): Promise<Operation>
  findById(operationId: string): Promise<Operation | null>
  findManyByUserId(userId: string, page: number): Promise<Operation[]>
  findManyByUserIdPeriodically(
    userId: string,
    beginPeriod: Date,
    endPeriod: Date,
    page?: number,
  ): Promise<Operation[]>
}
