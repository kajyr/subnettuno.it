import React from 'react';
import { graphql, Link } from 'gatsby';
import { Column, PageTitle } from 'atoms/page-elements';

import Layout from 'templates/Layout';
import { Body } from 'atoms/Article';
import PortableText from 'molecules/PortableText';

export default function Corso({ data }) {
  const { sanityCorso } = data;
  const { title, _rawBody } = sanityCorso;

  return (
    <Layout title={title}>
      <Column>
        <PageTitle>{title}</PageTitle>
        <Body>
          <PortableText
            raw={_rawBody}
            projectId={process.env.SANITY_PROJECT}
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
      </Column>
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
