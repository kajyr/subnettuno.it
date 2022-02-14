import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import urlBuilder from '@sanity/image-url';

import BlockContent from '@sanity/block-content-to-react';

const Figure = styled.figure`
  img {
    width: 100%;
  }
`;

const urlFor = (source) =>
  urlBuilder({
    projectId: process.env.GATSBY_SANITY_PROJECT_ID,
    dataset: 'production',
  }).image(source);

const serializers = {
  types: {
    block: (props) => {
      return BlockContent.defaultSerializers.types.block(props);
    },
    image: (props) => BlockContent.defaultSerializers.types.image(props),
    figure: (props) => {
      return (
        <Figure>
          <img
            src={urlFor(props.node.asset).width(780).url()}
            alt={props.node.alt}
          />
          {props.node.caption && <figcaption>{props.node.caption}</figcaption>}
        </Figure>
      );
    },
  },
  span: (props) => BlockContent.defaultSerializers.span(props),
  marks: {
    link: ({ mark, children }) => {
      const { blank, href } = mark;
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
    internalLink: ({ mark, children }) => {
      const { slug = {} } = mark;
      const href = `/${slug.current}`;
      return <Link to={href}>{children}</Link>;
    },
    internalOldLink: ({ mark, children }) => {
      const { href = {} } = mark;
      return <Link to={href}>{children}</Link>;
    },
  },
  unknownType: (props) => {
    console.log('UnknownType', props);
    return null;
  },
};

export default function PortableText({ raw, dataset, projectId }) {
  return (
    <BlockContent
      blocks={raw}
      serializers={serializers}
      projectId={projectId || process.env.GATSBY_SANITY_PROJECT_ID}
      dataset={dataset || process.env.GATSBY_SANITY_DATASET}
    />
  );
}