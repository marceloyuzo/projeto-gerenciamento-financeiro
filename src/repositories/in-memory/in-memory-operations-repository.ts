import { Operation, Prisma } from '@prisma/client'
import { OperationsRepository } from '../operationsRepository'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import dayjs from 'dayjs'

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

  async edit(operation: Operation) {
    const indexOperation = this.items.findIndex(
      (item) => item.id === operation.id,
    )

    if (indexOperation >= 0) {
      this.items[indexOperation] = operation
    }

    return operation
  }

  async findById(operationId: string) {
    const operation = this.items.find((item) => item.id === operationId)

    if (!operation) {
      return null
    }

    return operation
  }

  async findManyByUserId(userId: string, page: number) {
    const operations = this.items
      .filter((item) => item.user_id === userId)
      .slice((page - 1) * 20, page * 20)

    return operations
  }

  async findManyByUserIdMonthly(userId: string, month: number) {
    const operations = this.items.filter(
      (item) =>
        item.user_id === userId && dayjs(item.date).month() === month - 1,
    )

    return operations
  }

  async findManyByUserIdYearly(userId: string, year: number) {
    const operations = this.items.filter(
      (item) => item.user_id === userId && dayjs(item.date).year() === year,
    )

    return operations
  }

  async findManyByUserIdPeriodically(
    userId: string,
    beginPeriod: Date,
    endPeriod: Date,
    page: number,
  ) {
    const operations = this.items
      .filter((item) => {
        const operationDate = dayjs(item.date)
        const beginDate = dayjs(beginPeriod)
        const endDate = dayjs(endPeriod)

        return (
          item.user_id === userId &&
          operationDate.isAfter(beginDate) &&
          operationDate.isBefore(endDate)
        )
      })
      .slice((page - 1) * 20, page * 20)

    return operations
  }
}
