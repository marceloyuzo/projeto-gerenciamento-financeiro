import { OperationsRepository } from '../repositories/operationsRepository'

interface MetricsParams {
  balance: number
  income: number
  outcome: number
}

interface GetUserMetricsYearlyRequest {
  userId: string
  year: number
}

interface GetUserMetricsYearlyResponse {
  metrics: MetricsParams
}

export class GetUserMetricYearlysUseCase {
  constructor(private operationsRepository: OperationsRepository) {}

  async execute({
    userId,
    year,
  }: GetUserMetricsYearlyRequest): Promise<GetUserMetricsYearlyResponse> {
    const beginPeriod = new Date(year, 0, 1)
    const endPeriod = new Date(year, 11, 31)

    const operations = this.operationsRepository.findManyByUserIdPeriodically(
      userId,
      beginPeriod,
      endPeriod,
    )

    const metrics = (await operations).reduce(
      (acc, cur) => {
        if (cur.type === 'Deposit') {
          acc.income += cur.price
          acc.balance += cur.price
        }

        if (cur.type === 'Debit' || cur.type === 'Credit') {
          acc.outcome += cur.price
          acc.balance -= cur.price
        }

        return acc
      },
      {
        balance: 0,
        income: 0,
        outcome: 0,
      },
    )

    return {
      metrics,
    }
  }
}
