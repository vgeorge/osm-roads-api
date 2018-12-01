const csv = require('fast-csv');

exports.readCsvFile = async function (filePath, userOptions) {
  const options = Object.assign(
    {
      headers: true,
      delimiter: ','
    },
    userOptions
  );

  return new Promise(function (resolve, reject) {
    csv
      .fromPath(filePath, options)
      .on('data', options.onEntry)
      .on('end', async () => {
        await options.onFinish();
        resolve();
      })
      .on('error', reject);
  });
};
