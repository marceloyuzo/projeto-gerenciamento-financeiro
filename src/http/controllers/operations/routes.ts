import { FastifyInstance } from 'fastify'
import { registerOperation } from './register-operation'
import { verifyJWT } from '../middlewares/verify-jwt'
import { editOperation } from './edit-operation'

export async function operationsRoutes(app: FastifyInstance) {
  app.post('/operations', { onRequest: [verifyJWT] }, registerOperation)
  app.patch(
    '/operations/:operationId/edit',
    { onRequest: [verifyJWT] },
    editOperation,
  )
}
