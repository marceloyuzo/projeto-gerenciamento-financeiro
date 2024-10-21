import { Operation, Prisma } from '@prisma/client'
import { OperationsRepository } from '../operationsRepository'
import { randomUUID } from 'crypto'

export class InMemoryOperationsRepository implements OperationsRepository {
  public items: Operation[] = []

  async create(data: Prisma.OperationUncheckedCreateInput) {
    const operation: Operation = {
      id: randomUUID(),
      name: data.name,
      category_id: data.category_id,
      type: data.type,
      price: data.price,
      user_id: data.user_id,
    }
  }
}
