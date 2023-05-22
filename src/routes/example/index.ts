import { FastifyPluginAsync, RouteOptions } from "fastify"
import { handler } from "./handler"

const options: RouteOptions = {
  method: 'GET',
  url: '/',
  handler
}

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.route(options)
}

export default example;
