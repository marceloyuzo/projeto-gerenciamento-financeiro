import { OperationsRepository } from '../repositories/operationsRepository'

interface MetricsParams {
  balance: number
  income: number
  outcome: number
}

interface GetUserMetricsMonthlyRequest {
  userId: string
  month: number
}

interface GetUserMetricsMonthlyResponse {
  metrics: MetricsParams
}

export class GetUserMetricMonthlysUseCase {
  constructor(private operationsRepository: OperationsRepository) {}

  async execute({
    userId,
    month,
  }: GetUserMetricsMonthlyRequest): Promise<GetUserMetricsMonthlyResponse> {
    const operations = this.operationsRepository.findManyByUserIdMonthly(
      userId,
      month,
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
