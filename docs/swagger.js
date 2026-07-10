const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Entrega Praça12",
      version: "1.0.0",
      description: "API para calcular taxa de entrega do Bebidas Praça12"
    },
    servers: [
      {
        url: "https://api-entrega-praca12.onrender.com"
      },
      {
        url: "http://localhost:3000"
      }
    ],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "x-api-key"
        }
      }
    },
    security: [
      {
        ApiKeyAuth: []
      }
    ]
  },
  apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;