import type { APIRoute } from 'astro';

export const prerender = true;

const schema = {
  openapi: '3.1.0',
  info: {
    title: 'H & H Custom Cabinetry Public API',
    version: '1.0.0',
    description: 'Read-only verified business information for H & H Custom Cabinetry. No authentication is required.',
  },
  servers: [{ url: 'https://hhcustomcabinetry.ca' }],
  paths: {
    '/api/v1/business.json': {
      get: {
        operationId: 'getBusinessInformation',
        summary: 'Get verified business information',
        responses: {
          '200': {
            description: 'Verified public details, services, and action links',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['name', 'website', 'serviceArea', 'services', 'showroom', 'contact', 'actions'],
                  properties: {
                    name: { type: 'string' },
                    website: { type: 'string', format: 'uri' },
                    serviceArea: { type: 'string' },
                    services: { type: 'array', items: { type: 'string' } },
                    showroom: { type: 'object' },
                    contact: { type: 'object' },
                    actions: { type: 'object' },
                    social: { type: 'object' },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/status.json': {
      get: {
        operationId: 'getApiStatus',
        summary: 'Get public API status',
        responses: {
          '200': {
            description: 'API is available',
            content: { 'application/json': { schema: { type: 'object' } } },
          },
        },
      },
    },
  },
};

export const GET: APIRoute = () =>
  new Response(JSON.stringify(schema, null, 2), {
    headers: { 'Content-Type': 'application/vnd.oai.openapi+json; charset=utf-8' },
  });
