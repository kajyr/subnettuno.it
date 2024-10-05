/* eslint-disable @typescript-eslint/no-require-imports */

require('dotenv').config({ path: '../.env' });
const { sanityToMd, urlFor } = require('./src/helpers/sanity-client');
const { toHTML } = require('@portabletext/to-html');

const myPortableTextComponents = {
  marks: {
    internalLink: ({ value, children }) => {
      console.log('Missing link to a recipe', value);
      return `<a className="underline">${children}</a>`;
    },
    link: ({ value, children }) => {
      const { blank, href } = value;
      return blank
        ? `<a
          href="${href}"
          className="underline"
          target="_blank"
          rel="noreferrer noopener"
        >
          ${children}
        </a>`
        : `<a href={href} className="underline">
          ${children} 
        </a>`;
    },
  },
};

module.exports = (config) => {
  config.addPassthroughCopy({
    'src/js': 'js',
    'static/images': 'images',
    'static/responses': 'responses',
  });

  config.addFilter('sanityToHTML', function (value) {
    return toHTML(value, { components: myPortableTextComponents });
  });
  config.addFilter('sanityRicettaToMd', function (value) {
    return sanityToMd(value);
  });
  config.addFilter('sanityImage', function (image) {
    return urlFor(image);
  });

  config.addFilter('json', function (value) {
    return JSON.stringify(value, null, 2);
  });

  return {
    dataTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'public',
    },
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
};
