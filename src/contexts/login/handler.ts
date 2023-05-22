import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { LoginInput } from "./types";
import { login } from "./core";

async function handler(fastify: FastifyInstance, request: FastifyRequest, reply: FastifyReply) {
  const { error, data } = await login(request.body as LoginInput)

  if (error) {
    reply.status(401).send({ message: error });
    return;
  }

  reply.status(200).send(data);
}

export default handler;
