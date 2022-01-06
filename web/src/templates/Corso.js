import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/templates/Layout';
import { Body } from '../components/atoms/Article';
import PortableText from '../components/molecules/PortableText';

export default function Corso({ data }) {
  const { sanityCorso } = data;
  const { title, _rawBody } = sanityCorso;

  return (
    <Layout title={title}>
      <Body>
        <PortableText
          raw={_rawBody}
          projectId={process.env.GATSBY_SANITY_PROJECT_ID}
          dataset="production"
        />
        <div>
          <p>
            Per informazioni sui corsi potete{' '}
            <Link to="/contattaci">
              chiamare in segreteria o scrivere una mail
            </Link>
            .
          </p>
        </div>
      </Body>
    </Layout>
  );
}
export const pageQuery = graphql`
  query ($slug: String!) {
    sanityCorso(slug: { current: { eq: $slug } }) {
      title
      _rawBody
    }
  }
`;
