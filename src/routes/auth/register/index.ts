import { FastifyPluginAsync, RouteOptions } from "fastify"
import handler from "../../../contexts/register/handler"

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const options: RouteOptions = {
    method: 'POST',
    url: '/',
    schema: {
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          email: { type: 'string' },
          password: { type: 'string' },
        },
        required: ['name', 'email', 'password'],
      },
    },
    handler: async function (request, reply) {
      return handler(fastify, request, reply)
    }
  }
  fastify.route(options)
}

export default example;
