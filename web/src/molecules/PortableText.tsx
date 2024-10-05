import React from 'react';
import { Link } from 'gatsby';

import { PortableText } from '@portabletext/react';
import urlBuilder from '@sanity/image-url';

const urlFor = (source) =>
  urlBuilder({
    dataset: 'production',
    projectId: process.env.SANITY_PROJECT,
  }).image(source);

const serializers = {
  marks: {
    internalLink: ({ value, children }) => {
      const { slug = {} } = value;
      const href = `/${slug.current}`;
      return <Link to={href}>{children}</Link>;
    },
    internalOldLink: ({ value, children }) => {
      const { href = {} } = value;
      return <Link to={href}>{children}</Link>;
    },
    link: ({ value, children }) => {
      const { blank, href } = value;
      return blank ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          style={{ textDecoration: 'underline' }}
        >
          {children}
        </a>
      ) : (
        <a href={href}>{children}</a>
      );
    },
  },
  types: {
    figure: ({ value }) => {
      return (
        <figure>
          <img
            className="w-1/2"
            src={urlFor(value.asset).width(780).url()}
            alt={value.alt}
          />
          {value.caption && <figcaption>{value.caption}</figcaption>}
        </figure>
      );
    },
  },
};

export default function MyPortableText({ raw }) {
  //@ts-expect-error
  return <PortableText value={raw} components={serializers} />;
}
