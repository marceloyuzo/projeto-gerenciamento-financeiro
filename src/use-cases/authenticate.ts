import { User } from '@prisma/client'
import { UsersRepository } from '../repositories/usersRepository'
import { compare } from 'bcryptjs'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new Error('Doesnt exist a account with this email')
    }

    const isPasswordCorrect = await compare(password, user?.password_hashed)

    if (!isPasswordCorrect) {
      throw new Error('Password is not correct')
    }

    return {
      user,
    }
  }
}
