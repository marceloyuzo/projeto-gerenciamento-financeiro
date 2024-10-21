import { Operation, Prisma } from '@prisma/client'
import { OperationsRepository } from '../operationsRepository'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'

export class InMemoryOperationsRepository implements OperationsRepository {
  public items: Operation[] = []

  async create(data: Prisma.OperationUncheckedCreateInput) {
    const RequestSchema = z.object({
      userId: z.string(),
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

    const { name, category, type, price, date, userId } =
      RequestSchema.parse(data)

    const operation: Operation = {
      id: randomUUID(),
      name,
      date,
      category,
      price,
      type,
      user_id: userId,
    }

    this.items.push(operation)

    return operation
  }
}
