import Fastify from 'fastify'

const app = Fastify()

await app.register(import('../index.js'), {
  documents: [
    {
      decorator: 'swagger1',
      title: 'Swagger1',
      swaggerOptions: {
        openapi: {
          openapi: '3.0.0',
          info: {
            title: 'Test swagger',
            description: 'Testing the Fastify swagger API',
            version: '0.1.0',
          },
        },
      },
    },
    {
      decorator: 'swagger2',
      title: 'Swagger2',
    },
  ],
})

await app.register(import('./route.js'))

app.post(
  '/',
  {
    schema: {
      body: { type: 'object', properties: { foo: { type: 'string' } } },
    },
    config: {
      documentDecorator: 'swagger1',
    },
  },
  async (req, res) => {
    return { hello: 'world' }
  }
)

// app.get("/docs", (req, res) => app.swagger2());

app.ready().then(() => {
  // app.swagger1()
  // app.swagger2()
  // console.log(app.swagger1());
  // console.log(app.swagger2());
  console.log(app.printRoutes())

  app.listen({ port: 3000 })
})
