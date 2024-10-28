import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJWT(req: FastifyRequest, res: FastifyReply) {
  try {
    req.jwtVerify()
  } catch (err) {
    res.status(401).send('Unanthourized.')
  }
}
