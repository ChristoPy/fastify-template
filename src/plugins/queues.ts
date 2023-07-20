import fp from 'fastify-plugin'
import { Job, Queue, Worker } from 'bullmq'
import IORedis, { RedisOptions } from 'ioredis'
import { readdirSync } from 'fs'
import { join, basename, extname } from 'path'
import { FastifyInstance } from 'fastify'

export interface ProcessorInjectedContext<T> {
  job: Job<T>
  fastify: FastifyInstance
}

/**
 * This plugin adds Bull queues to the Fastify instance
 */
export default fp(async (fastify, opts) => {
  const connection = new IORedis({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD
  } as RedisOptions)

  const queuesPath = join(__dirname, '../queues')
  const queueFiles = readdirSync(queuesPath)

  const queues: Record<string, Queue> = {}

  for (const file of queueFiles) {
    if (!file.endsWith('.js')) {

      continue
    }

    const queueName = basename(file, extname(file))
    const queue = new Queue(
      queueName,
      {
        connection,
        defaultJobOptions: {
          attempts: 3,
          backoff: {
            type: 'exponential',
            delay: 1000,
          },
          removeOnComplete: true
        },
      })

    const processorPath = join(queuesPath, file)
    const processor = require(processorPath).default

    new Worker(queueName, async (job) => {
      await processor({ job, fastify } as ProcessorInjectedContext<any>)
    }, { connection })

    queues[queueName] = queue
  }

  fastify.decorate('queues', queues)
})

// Update Fastify namespace to include queues
declare module 'fastify' {
  interface FastifyInstance {
    queues: {
      [key: string]: Queue
    }
  }
}
