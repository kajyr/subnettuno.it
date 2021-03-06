import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { fromMedium } from '../mediaqueries';

import TreeList from '../atoms/TreeList';

const Aside = styled.aside`
  order: 1;
  margin: 1em 0;

  h2 {
    text-transform: uppercase;
  }

  ul {
    padding-left: 1.4em;
  }

  @media ${fromMedium} {
    width: 27%;
    margin: 0;
  }
`;

const AsideSection = styled.section`
  border-top: 4px solid ${(p) => p.theme.black};
  padding-top: 1.6em;

  & + & {
    margin-top: 1.6em;
  }
`;

const Sidebar = () => {
  const data = useStaticQuery(graphql`
    query {
      pages: allMarkdownRemark(
        filter: {
          fields: { sourceInstanceName: { eq: "pages" } }
          frontmatter: { hidden: { ne: true } }
        }
      ) {
        edges {
          node {
            id
            frontmatter {
              title
            }
            fields {
              slug
            }
          }
        }
      }
      corsi: allMarkdownRemark(
        filter: { fields: { sourceInstanceName: { eq: "corsi" } } }
        sort: { order: ASC, fields: frontmatter___order }
      ) {
        edges {
          node {
            id
            frontmatter {
              title
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  const { edges } = data.pages;
  const corsiTreeList = data.corsi.edges.map((e) => e.node);

  return (
    <Aside>
      <AsideSection>
        <h2>Club Sub Nettuno</h2>
        <address>
          Associazione Sportiva Dilettantistica
          <br />
          c/o piscina Stadio "Carmen Longo"
          <br />
          accesso da via dello Sport 9<br />
          Bologna
          <br />
          tel. <a href="tel://051 6153552">051 6153552</a>
          <br />
          C.F. 01596311207
          <br />
          P.IVA 2665601205
        </address>
      </AsideSection>
      <AsideSection>
        <ul>
          <li>
            <TreeList
              title="Attività didattica"
              list={corsiTreeList}
              itemRenderer={(node) => (
                <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
              )}
            />
          </li>
          {edges.map(({ node }) => {
            return (
              <li key={node.id}>
                <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
              </li>
            );
          })}
          <li>
            <Link to="/dove-siamo">Dove siamo</Link>
          </li>
          <li>
            <Link to="/staff">Lo Staff</Link>
          </li>
          <li>
            <Link to="/contattaci">Contattaci</Link>
          </li>
        </ul>
      </AsideSection>
      <AsideSection>
        <p>Seguici sui social:</p>
        <ul>
          <li>
            <a
              href="https://www.facebook.com/clubsubnettuno"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/clubsubnettuno/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </li>
        </ul>
      </AsideSection>
    </Aside>
  );
};

export default Sidebar;
