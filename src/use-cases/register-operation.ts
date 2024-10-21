import { Operation } from '@prisma/client'
import { OperationsRepository } from '../repositories/operationsRepository'
import { z } from 'zod'

interface RegisterOperationRequest {
  userId: string
  name: string
  category: TypeCategory
  price: number
  type: TypeOperation
  date: Date
}

interface RegisterOperationResponse {
  operation: Operation
}

const registerOperationSchema = z.object({
  userId: z.string(),
  name: z.string(),
  category: z.nativeEnum(TypeCategory), // Validação usando o enum
  price: z.number(),
  type: z.string(),
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
