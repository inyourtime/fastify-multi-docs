import fp from 'fastify-plugin'

import swagger from './lib/swagger.js'
import route from './lib/route.js'

/**
 * @type {import('fastify').FastifyPluginAsync<import('./types').FastifyMultiDocsOptions>}
 */
async function fastifyMultiDocs (fastify, opts) {
  if (opts.documents === undefined) {
    throw new Error('"documents" option is required')
  }
  if (!Array.isArray(opts.documents)) {
    throw new Error('"documents" option must be an array')
  }

  for (const documentOptions of opts.documents) {
    if (typeof documentOptions.decorator !== 'string') {
      throw new Error('"documents.decorator" option must be a string')
    }

    // register swagger instance
    fastify.register(fp(swagger), {
      ...documentOptions,
    })
  }

  // register route
  fastify.register(route, {
    prefix: opts.routePrefix || '/docs',
    ...opts,
  })
}

export default fp(fastifyMultiDocs, {
  fastify: '5.x',
  name: 'fastify-multi-docs',
})
