import { FastifyInstance } from 'fastify'
import { registerOperation } from './register-operation'
import { verifyJWT } from '../middlewares/verify-jwt'
import { editOperation } from './edit-operation'
import { operationHistory } from './history'
import { removeOperation } from './remove-operation'
import { userMetrics } from './user-metrics'

export async function operationsRoutes(app: FastifyInstance) {
  app.post('/operations', { onRequest: [verifyJWT] }, registerOperation)
  app.patch(
    '/operation/:operationId/edit',
    { onRequest: [verifyJWT] },
    editOperation,
  )
  app.get('/operations/history', { onRequest: [verifyJWT] }, operationHistory)
  app.delete(
    '/operation/:operationId/delete',
    { onRequest: [verifyJWT] },
    removeOperation,
  )
  app.get('/operations/metrics', { onRequest: [verifyJWT] }, userMetrics)
}
