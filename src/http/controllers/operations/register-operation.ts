import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeRegisterOperationUseCase } from '../../../use-cases/factories/make-register-operation-use-case'

export async function registerOperation(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const registerOperationSchema = z.object({
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
    date: z.coerce.date().default(new Date()),
  })

  const { name, category, price, type, date } = registerOperationSchema.parse(
    req.body,
  )

  try {
    const registerOperationUseCase = makeRegisterOperationUseCase()

    await registerOperationUseCase.execute({
      name,
      category,
      date,
      price,
      type,
      userId: req.user.sub,
    })

    return res.status(201).send()
  } catch (err) {
    return res.status(400).send(err)
  }
}
