import { Operation } from '@prisma/client'
import { OperationsRepository } from '../repositories/operationsRepository'
import { z } from 'zod'

interface EditOperationRequest {
  operationId: string
  name?: string
  category?: string
  price?: number
  type?: string
  date?: Date
}

interface EditOperationResponse {
  operation: Operation
}

const typeCategorySchema = z.object({
  category: z
    .enum([
      'Housing',
      'Food',
      'Transport',
      'Health',
      'Education',
      'Leisure',
      'Investment',
    ])
    .optional(),
  type: z.enum(['Deposit', 'Credit', 'Debit']).optional(),
})

export class EditOperationUseCase {
  constructor(private operationsRepository: OperationsRepository) {}

  async execute({
    operationId,
    name,
    date,
    price,
    ...props
  }: EditOperationRequest): Promise<EditOperationResponse> {
    const operationExists =
      await this.operationsRepository.findById(operationId)

    if (!operationExists) {
      throw new Error()
    }

    const _props = typeCategorySchema.parse(props)

    const newOperation: Operation = {
      id: operationId,
      name: name !== undefined ? name : operationExists.name,
      price: price !== undefined ? price : operationExists.price,
      type: _props.type !== undefined ? _props.type : operationExists.type,
      category:
        _props.category !== undefined
          ? _props.category
          : operationExists.category,
      date: date !== undefined ? date : operationExists.date,
      user_id: operationExists.user_id,
    }

    const operationSaved = await this.operationsRepository.edit(newOperation)

    return {
      operation: operationSaved,
    }
  }
}
