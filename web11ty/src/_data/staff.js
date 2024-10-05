/* eslint-disable @typescript-eslint/no-require-imports */

const { client, urlFor } = require('../helpers/sanity-client');

const query = `
    *[_type == "person" && active == true]{
      ...
    } | order(brevetto desc)
  `;

const certs = ['P1', 'P2', 'P3', 'PAiAr', 'M1', 'M2', 'M3'];
const seats = [
  'Consigliere',
  'Segretario',
  'Tesoriere',
  'Vicepresidente',
  'Presidente',
];

function partition(list, condition) {
  return list.reduce(
    (result, element) => {
      if (condition(element)) {
        result[0].push(element);
      } else {
        result[1].push(element);
      }
      return result;
    },
    [[], []]
  );
}

function sortByName(p1, p2) {
  if (p1.name < p2.name) {
    return -1;
  }
  if (p1.name > p2.name) {
    return 1;
  }
  return 0;
}

function sortByCert(p1, p2) {
  const i1 = certs.indexOf(p1.brevetto);
  const i2 = certs.indexOf(p2.brevetto);
  return i2 - i1 || sortByName(p1, p2);
}

function sortBySeat(p1, p2) {
  const i1 = seats.indexOf(p1.council_seat);
  const i2 = seats.indexOf(p2.council_seat);
  return i2 - i1 || sortByCert(p1, p2);
}

module.exports = async function () {
  try {
    const data = await client.fetch(query);

    const patched = data.map((person) => {
      if (person.image && person.image.asset) {
        person.image = urlFor(person.image.asset).height(400).url();
      } else {
        person.image =
          person.gender === 'Donna'
            ? '/images/placeholder-female.png'
            : '/images/placeholder-male.png';
      }
      return person;
    });

    const [council, staff] = partition(patched, (person) => person.council);
    const [istr, aiuti] = partition(
      staff,
      (person) => person.brevetto !== 'PAiAr'
    );

    const aiuti_str = aiuti.map((a) => a.name).join(', ');

    return {
      aiuti: aiuti_str,
      council: council.sort(sortBySeat),
      istr: istr.sort(sortByCert),
    };
  } catch (err) {
    console.error('Error fetching Sanity data: ', err);
    return []; // Return an empty array if something goes wrong
  }
};
