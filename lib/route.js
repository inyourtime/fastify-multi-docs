import { getHtmlDocument } from '@scalar/core/libs/html-rendering'

/**
 * @type {import('fastify').FastifyPluginAsync<>}
 */
export default async (fastify, opts) => {
  let docIndex = 0
  const scalarSources = []

  for (const doc of opts.documents) {
    docIndex++

    const url = `/doc-${docIndex}/openapi.json`

    fastify.route({
      method: 'GET',
      url,
      schema: { hide: true },
      handler: () => fastify[doc.decorator](),
    })

    scalarSources.push({
      title: doc.title || doc.decorator,
      url: `${opts.prefix}${url}`,
    })
  }

  // register Scalar route
  if (opts.scalarUi !== false) {
    fastify.route({
      method: 'GET',
      url: '/',
      schema: { hide: true },
      handler: (_, reply) =>
        reply.type('text/html').send(
          getHtmlDocument({
            sources: scalarSources,
          })
        ),
    })
  }
}
