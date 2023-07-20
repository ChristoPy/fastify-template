import { ProcessorInjectedContext } from "../plugins/queues"

export interface ExampleJob {
  result: 42
}

export default async function ({ job, fastify }: ProcessorInjectedContext<ExampleJob>) {
  console.log(job.data.result)
  console.log(fastify.version)
}
