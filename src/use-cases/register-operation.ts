import { Operation } from '@prisma/client'
import { OperationsRepository } from '../repositories/operationsRepository'

enum TypeOperation {
  deposit,
  credit,
  debit,
}

interface RegisterOperationRequest {
  name: string
  category: string
  price: number
  type: TypeOperation
  date: Date
}

interface RegisterOperationResponse {
  operation: Operation
}

export class RegisterOperationUseCase {
  constructor(private operationsRepository: OperationsRepository) {}

  execute({
    name,
    category,
    price,
    type,
    date,
  }: RegisterOperationRequest): Promise<RegisterOperationResponse> {
    
  }
}
