import { Operation, Prisma } from '@prisma/client'

export interface OperationsRepository {
  create(data: Prisma.OperationUncheckedCreateInput): Promise<Operation>
}
