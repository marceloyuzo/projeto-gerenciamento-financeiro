import { Operation } from '@prisma/client'
import { OperationsRepository } from '../repositories/operationsRepository'
import { z } from 'zod'

interface RegisterOperationRequest {
  userId: string
  name: string
  category: string
  price: number
  type: string
  date: Date
}

interface RegisterOperationResponse {
  operation: Operation
}

const registerOperationSchema = z.object({
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
  price: z.number(),
  type: z.enum(['Deposit', 'Credit', 'Debit']),
  date: z.date(),
})

export class RegisterOperationUseCase {
  constructor(private operationsRepository: OperationsRepository) {}

  async execute(
    req: RegisterOperationRequest,
  ): Promise<RegisterOperationResponse> {
    const { name, category, date, price, type, userId } =
      registerOperationSchema.parse(req)

    const operation = await this.operationsRepository.create({
      name,
      category,
      price,
      user_id: userId,
      date,
      type,
    })

    return {
      operation,
    }
  }
}
