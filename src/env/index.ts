import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  NODE_ENV: z.enum(['dev', 'production', 'test']).default('dev'),
  DATABASE_URL: z.coerce.string(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.log('Invalind Environment Variables', _env.error)

  throw new Error('Invalind Environment Variables')
}

export const env = _env.data
