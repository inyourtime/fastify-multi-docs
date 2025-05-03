import fastifySwagger from '@fastify/swagger'

/**
 * @type {import('fastify').FastifyPluginCallback<>}
 */
export default (fastify, opts, done) => {
  const options = opts.swaggerOptions || {}
  const { transform: transformFunc, ...swaggerOptions } = options

  // delete decorator option
  delete swaggerOptions.decorator

  fastify.register(fastifySwagger, {
    decorator: opts.decorator,
    transform: (args) => {
      // First call transform option if provided
      const result = transformFunc
        ? transformFunc(args)
        : { schema: args.schema, url: args.url }

      let hide = false
      if (args.route.config?.documentDecorator !== opts.decorator) {
        hide = true
      }

      return {
        schema: { ...result.schema, hide },
        url: result.url,
      }
    },
    ...swaggerOptions,
  })

  done()
}
