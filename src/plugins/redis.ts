import fp from 'fastify-plugin'
import fastifyRedis, { FastifyRedisPluginOptions, FastifyRedis } from '@fastify/redis'

/**
 * This plugin adds a redis client to the fastify instance
 */
export default fp<FastifyRedisPluginOptions>(async (fastify, opts) => {
  fastify.register(fastifyRedis, {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD,
  })
})

// update fastify namespace to include redis
declare module 'fastify' {
  interface FastifyInstance {
    redis: FastifyRedis
  }
}
