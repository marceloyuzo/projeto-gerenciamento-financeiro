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
    const operations = this.operationsRepository.findManyByUserIdYearly(
      userId,
      year,
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
