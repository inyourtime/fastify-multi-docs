/**
 * @type {import('fastify').FastifyPluginAsync<>}
 */
export default (fastify, opts, done) => {
  fastify.get(
    '/',
    {
      schema: {
        querystring: {
          type: 'object',
          properties: { foo: { type: 'string' } },
        },
      },
      config: {
        documentDecorator: 'swagger2',
      },
    },
    async (request, reply) => {
      return { hello: 'world' }
    }
  )

  done()
}
