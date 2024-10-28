import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetUserUseCase } from '../../../use-cases/factories/make-get-user-use-case'

export async function profile(req: FastifyRequest, res: FastifyReply) {
  const getUserUseCase = makeGetUserUseCase()

  const { user } = await getUserUseCase.execute({
    userId: req.user.sub,
  })

  return res.status(200).send({
    user: {
      ...user,
      password_hashed: undefined,
    },
  })
}
