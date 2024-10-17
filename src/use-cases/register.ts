import { User } from '@prisma/client'
import { UsersRepository } from '../repositories/usersRepository'
import { hash, compare } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User | null
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const sameEmail = await this.usersRepository.findByEmail(email)

    if (sameEmail) {
      throw new Error('Already have a account with same email.')
    }

    const passwordHashed = await hash(password, 6)

    const isPasswordHashed = await compare(password, passwordHashed)

    if (!isPasswordHashed) {
      throw new Error('Password not hashed.')
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hashed: passwordHashed,
    })

    return {
      user,
    }
  }
}
