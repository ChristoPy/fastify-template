import { RouteOptions } from "fastify"

export const handler: RouteOptions["handler"] = async (request, reply) => {
  return 'this is an example'
}
