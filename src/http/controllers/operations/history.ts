import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFetchOperationsUseCase } from '../../../use-cases/factories/make-fetch-operations-use-case'
import { makeFetchOperationsPeriocallyUseCase } from '../../../use-cases/factories/make-fetch-operations-periodically-use-case'

export async function operationHistory(req: FastifyRequest, res: FastifyReply) {
  const operationHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    beginPeriod: z.coerce.date().optional(),
    endPeriod: z.coerce.date().default(new Date()),
  })

  const { page, beginPeriod, endPeriod } = operationHistoryQuerySchema.parse(
    req.query,
  )

  try {
    let fetchOperationsUseCase

    if (beginPeriod && endPeriod) {
      fetchOperationsUseCase = makeFetchOperationsPeriocallyUseCase()

      const { operations } = await fetchOperationsUseCase.execute({
        page,
        beginPeriod,
        endPeriod,
        userId: req.user.sub,
      })

      return res.status(200).send({ operations })
    } else {
      fetchOperationsUseCase = makeFetchOperationsUseCase()

      const { operations } = await fetchOperationsUseCase.execute({
        page,
        userId: req.user.sub,
      })

      return res.status(200).send({ operations })
    }
  } catch (err) {
    return res.status(404).send(err)
  }
}
