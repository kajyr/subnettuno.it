/* eslint-disable @typescript-eslint/no-require-imports */

const { client, urlFor } = require('../helpers/sanity-client');

const query = `
    *[_type == "event"]{
      ...
    } | order(date desc)
  `;

module.exports = async function () {
  try {
    const events = await client.fetch(query);

    const patched = events.map((event) => {
      const locandina = event.locandina;
      const copy = { ...event };

      if (locandina) {
        copy.locandina = {
          ...locandina,
          url: urlFor(locandina.asset).width(1024).url(),
        };
      }

      return copy;
    });
    // console.log('Sanity data fetched successfully: ', patched);

    return patched;
  } catch (err) {
    console.error('Error fetching Sanity data: ', err);
    return []; // Return an empty array if something goes wrong
  }
};
