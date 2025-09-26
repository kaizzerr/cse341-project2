const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Users and Tasks Api',
        description: 'Users and Tasks Api'
    },
    host: 'localhost:8000',
    schemes: ['http', 'https']
  };

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// This will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);