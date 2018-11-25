const supertest = require('supertest');

const server = require('../app');

describe('all tests', function () {
  describe('endpoint /countries', function () {
    it('GET /countries returns status 200 and countries', async function () {
      return supertest(server.listener)
        .get('/countries')
        .expect(200, {
          countries: [
            {
              id: 'br',
              name: {
                en: 'Brazil',
                pt: 'Brasil'
              },
              continent: 'South America'
            }
          ]
        });
    });
  });
});

after(() => {
  server.stop();
});
