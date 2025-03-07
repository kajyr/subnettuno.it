import { client, urlFor } from '../helpers/sanity-client.js';

// Define your GROQ query to fetch the data
const query = `
  *[_type == "siteSettings"]{
    title,
    description,
    subtitle,
    _id,
    headerImages[]{
      asset
    },
  }
`;

// Fetch the data from Sanity during the build
export default async function () {
  const [sanityData] = await client.fetch(query);

  if (!sanityData) {
    throw new Error('No site configuration data found in Sanity');
  }

  const { headerImages, ...data } = sanityData;

  data.headerImages = headerImages.map((img) => {
    return urlFor(img.asset).height(500).url();
  });

  //console.log('Sanity data fetched successfully: ', data);

  data.curYear = new Date().getFullYear();

  return data;
}
