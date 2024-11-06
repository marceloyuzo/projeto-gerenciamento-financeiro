import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeRemoveOperationUseCase } from '../../../use-cases/factories/make-remove-operation-use-case'

export async function removeOperation(req: FastifyRequest, res: FastifyReply) {
  const removeOperationParamSchema = z.object({
    operationId: z.string(),
  })

  const { operationId } = removeOperationParamSchema.parse(req.params)

  try {
    const removeOperationUseCase = makeRemoveOperationUseCase()

    await removeOperationUseCase.execute({
      operationId,
    })
  } catch (err) {
    res.status(400).send()
  }

  res.status(204)
}
