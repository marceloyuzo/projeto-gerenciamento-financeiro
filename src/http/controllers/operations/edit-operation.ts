import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeEditOperationUseCase } from '../../../use-cases/factories/make-edit-operation-use-case'

export async function editOperation(req: FastifyRequest, res: FastifyReply) {
  const editOperationParamsSchema = z.object({
    operationId: z.string(),
  })

  const editOperationBodySchema = z.object({
    name: z.string().optional(),
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
    price: z.coerce.number().optional(),
    type: z.enum(['Deposit', 'Credit', 'Debit']).optional(),
    date: z.date().optional(),
  })

  const { name, category, date, price, type } = editOperationBodySchema.parse(
    req.body,
  )

  const { operationId } = editOperationParamsSchema.parse(req.params)

  try {
    const editOperationUseCase = makeEditOperationUseCase()

    await editOperationUseCase.execute({
      operationId,
      name,
      category,
      date,
      price,
      type,
    })

    res.status(200).send()
  } catch (err) {
    res.status(400).send(err)
  }
}
