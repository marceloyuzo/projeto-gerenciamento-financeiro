import { Operation, Prisma } from '@prisma/client'
import { OperationsRepository } from '../operationsRepository'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'

export class InMemoryOperationsRepository implements OperationsRepository {
  public items: Operation[] = []

  async create(data: Prisma.OperationUncheckedCreateInput) {
    const RequestSchema = z.object({
      user_id: z.string(),
      name: z.string(),
      category: z.enum([
        'Housing',
        'Food',
        'Transport',
        'Health',
        'Education',
        'Leisure',
        'Investment',
      ]),
      price: z.coerce.number(),
      type: z.enum(['Deposit', 'Credit', 'Debit']),
      date: z.coerce.date(),
    })

    const { name, category, type, price, date, user_id } =
      RequestSchema.parse(data)

    const operation: Operation = {
      id: randomUUID(),
      name,
      date,
      category,
      price,
      type,
      user_id,
    }

    this.items.push(operation)

    return operation
  }

  async delete(operationId: string) {
    const indexToBeDeleted = this.items.findIndex(
      (item) => item.id === operationId,
    )

    if (indexToBeDeleted !== -1) {
      this.items.splice(indexToBeDeleted, 1)
    }
  }

  async findById(operationId: string) {
    const operation = await this.items.find((item) => item.id === operationId)

    if (!operation) {
      return null
    }

    return operation
  }
}
