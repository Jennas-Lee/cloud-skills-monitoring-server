import { Options } from 'swagger-jsdoc';

const options: Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Cloud Skills Monitoring Server API Docs',
      description: 'REST API Using Swagger and Express.',
      version: '0.0.1'
    },
    servers: [
      // TODO: Add Production Host URL
      {
        url: 'http://localhost:3001'
      }
    ],
  },
  apis: [
    'src/models/*.ts',
    'src/routers/controllers/*.ts',
  ],
}

export default options;