import type { FastifyPluginAsync } from 'fastify'
import type { FastifyStaticSwaggerOptions, FastifyDynamicSwaggerOptions } from '@fastify/swagger'

type FastifyMultiDocs = FastifyPluginAsync<fastifyMultiDocs.FastifyMultiDocsOptions>

declare namespace fastifyMultiDocs {
  export type SwaggerOptions = (FastifyStaticSwaggerOptions | Omit<FastifyDynamicSwaggerOptions, 'decorator'>)

  export interface FastifyMultiDocsOptions {
    documents: Array<Document>;
    scalarUi?: boolean;
  }

  interface Document {
    decorator: string;
    title?: string;
    swaggerOptions?: SwaggerOptions;
  }

  export const fastifyMultiDocs: FastifyMultiDocs
  export { fastifyMultiDocs as default }
}

declare function fastifyMultiDocs (...params: Parameters<FastifyMultiDocs>): ReturnType<FastifyMultiDocs>
export = fastifyMultiDocs
