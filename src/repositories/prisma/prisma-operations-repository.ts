import { Prisma, Operation } from '@prisma/client'
import { OperationsRepository } from '../operationsRepository'
import { prisma } from '../../lib/prisma'

export class PrismaOperationsRepository implements OperationsRepository {
  async create(data: Prisma.OperationUncheckedCreateInput) {
    const operation = await prisma.operation.create({
      data,
    })

    return operation
  }

  async delete(operationId: string) {
    await prisma.operation.delete({
      where: {
        id: operationId,
      },
    })
  }

  async edit(operation: Operation) {
    const operationEdited = await prisma.operation.update({
      where: {
        id: operation.id,
      },
      data: operation,
    })

    return operationEdited
  }

  async findById(operationId: string) {
    const operation = await prisma.operation.findUnique({
      where: {
        id: operationId,
      },
    })

    if (!operation) {
      return null
    }

    return operation
  }

  async findManyByUserId(userId: string, page: number) {
    const operations = await prisma.operation.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return operations
  }

  async findManyByUserIdPeriodically(
    userId: string,
    beginPeriod: Date,
    endPeriod: Date,
    page?: number,
  ) {
    let operations = []

    if (page) {
      operations = await prisma.operation.findMany({
        where: {
          user_id: userId,
          date: {
            gte: beginPeriod,
            lte: endPeriod,
          },
        },
        take: 20,
        skip: (page - 1) * 20,
      })
    } else {
      operations = await prisma.operation.findMany({
        where: {
          user_id: userId,
          date: {
            gte: beginPeriod,
            lte: endPeriod,
          },
        },
      })
    }

    return operations
  }
}
