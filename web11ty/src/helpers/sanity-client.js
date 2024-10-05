require('dotenv').config();
const sanityClient = require('@sanity/client');
const imageUrlBuilder = require('@sanity/image-url');

const projectId = process.env.SANITY_PROJECT;
const apiToken = process.env.SANITY_READ_TOKEN;

console.log('projectId', projectId);
console.log('apiToken', apiToken);

if (!projectId) {
  throw new Error('Missing env SANITY_PROJECT');
}

const client = sanityClient({
  apiVersion: '2021-08-31',
  dataset: 'production',
  projectId,
  token: apiToken,
  useCdn: true,
});
const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}

function sanityToMd({ mainImage, category, ingredienti, ...ricetta }) {
  const data = { ...ricetta };
  const other = {
    url: `/r/${ricetta.slug.current}`,
  };
  if (mainImage?.asset) {
    data.image = urlFor(mainImage?.asset).width(500);
  }
  if (category?.title) {
    data.category = category.title;
  }
  if (ingredienti) {
    other.ingredienti_blocks = ingredienti;
  }
  return {
    data,
    ...other,
  };
}

function getRicetteThumbs() {
  return client.fetch(
    `
    *[ _type == "ricetta" ]{
      title,
      slug { current },
      mainImage {
        asset
      },
      category -> { title }
    } | order(title desc)
  `,
    {}
  );
}

function getAllCategories() {
  return client.fetch(
    `
    *[ _type == "category" ]{
      title,
      slug { current },
   
    }
  `,
    {}
  );
}

module.exports = {
  client,
  getAllCategories,
  getRicetteThumbs,
  sanityToMd,
  urlFor,
};
