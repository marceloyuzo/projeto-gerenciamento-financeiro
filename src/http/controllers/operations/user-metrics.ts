import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeGetUserMetricsMonthlyUseCase } from '../../../use-cases/factories/make-get-user-metrics-monthly-use-case'
import { makeGetUserMetricsYearlyUseCase } from '../../../use-cases/factories/make-get-user-metrics-yearly-use-case'

export async function userMetrics(req: FastifyRequest, res: FastifyReply) {
  const userMetricsQuerySchema = z.object({
    year: z.coerce.number(),
    month: z.coerce.number().optional(),
  })

  const { year, month } = userMetricsQuerySchema.parse(req.query)

  try {
    let userMetricsUseCase

    if (month) {
      userMetricsUseCase = makeGetUserMetricsMonthlyUseCase()

      const { metrics } = await userMetricsUseCase.execute({
        month,
        year,
        userId: req.user.sub,
      })

      res.status(200).send({ metrics })
    } else {
      userMetricsUseCase = makeGetUserMetricsYearlyUseCase()

      const { metrics } = await userMetricsUseCase.execute({
        year,
        userId: req.user.sub,
      })

      res.status(200).send({ metrics })
    }
  } catch (err) {
    res.status(400).send(err)
  }
}
