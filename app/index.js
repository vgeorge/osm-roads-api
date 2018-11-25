const boom = require('boom');
const Hapi = require('hapi');
const db = require('./db');

const server = Hapi.server({
  port: process.env.PORT || 3000,
  host: 'localhost'
});

const init = async () => {
  await server.start();
  console.log(`Server running at: ${server.info.uri}`); // eslint-disable-line
};

// ROUTES
server.route({
  method: 'GET',
  path: '/countries',
  handler: async function (request, h) {
    try {
      const countries = await db
        .select('*')
        .from('countries')
        .orderBy('id');
      return { countries };
    } catch (error) {
      return boom.badImplementation(error);
    }
  }
});

process.on('unhandledRejection', err => {
  console.log(err); // eslint-disable-line
  process.exit(1);
});

init();

module.exports = server;
