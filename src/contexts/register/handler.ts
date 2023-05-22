import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { RegisterInput } from "./types";
import { register } from "./core";

async function handler(fastify: FastifyInstance, request: FastifyRequest, reply: FastifyReply) {
  const { error, data } = await register(request.body as RegisterInput)

  if (error) {
    reply.status(400).send({ message: error });
    return;
  }

  reply.status(200).send(data);
}

export default handler;
