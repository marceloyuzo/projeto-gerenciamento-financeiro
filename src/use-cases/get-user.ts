import { User } from '@prisma/client'
import { UsersRepository } from '../repositories/usersRepository'

interface GetUserCaseRequest {
  userId: string
}

interface GetUserCaseResponse {
  user: User
}

export class GetUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ userId }: GetUserCaseRequest): Promise<GetUserCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new Error()
    }

    return {
      user,
    }
  }
}
