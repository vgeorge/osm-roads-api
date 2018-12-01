const { join } = require('path');

const { readCsvFile } = require('./utils');

exports.seed = function (knex) {
  const citiesCsvPath = join(__dirname, 'data', 'cities.csv');
  const cities = [];

  readCsvFile(citiesCsvPath, {
    onEntry: async entry => {
      entry.point = `SRID=4326;POINT(${entry.lon} ${entry.lat})`;
      entry.isCapital = entry.isCapital === '1';

      // Discard lat, lon
      const { lat, lon, ...city } = entry;

      cities.push(city);
    },
    onFinish: () => {
      // Deletes ALL
      return knex('cities')
        .del()
        .then(async function () {
          // Inserts ALL
          await knex('cities').insert(cities);
        });
    }
  });
};
