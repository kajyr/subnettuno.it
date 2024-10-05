/* eslint-disable @typescript-eslint/no-require-imports */
const { client } = require('../helpers/sanity-client');

const query = `
    *[_type == "pagina" && sidebar != false]{
      ...
    } | order(title desc)
  `;

module.exports = async function () {
  try {
    const fetched = await client.fetch(query);

    console.log('Sanity data fetched successfully: ', fetched);

    return fetched;
  } catch (err) {
    console.error('Error fetching Sanity data: ', err);
    return []; // Return an empty array if something goes wrong
  }
};
