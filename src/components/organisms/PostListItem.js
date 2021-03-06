import React from 'react';
import { Link } from 'gatsby';
import PostHeader from '../molecules/Post/Header';
import { Body, Article } from '../atoms/Article';

import { template } from '../helpers/string';

function truncateWords(text, words) {
  return text.split(' ').splice(0, words).join(' ').concat('&hellip;');
}

const LIMIT_WORDS = 125;

const PostListItem = ({ post }) => {
  const { words } = post.wordCount;

  const hasMore = !!post.html && words > LIMIT_WORDS;

  const html = hasMore ? truncateWords(post.html, LIMIT_WORDS) : post.html;

  return (
    <Article>
      <PostHeader
        permalink={post.fields.slug}
        title={post.frontmatter.title}
        date={post.frontmatter.date}
      />

      <Body
        dangerouslySetInnerHTML={{
          __html: template(html, {
            GATSBY_GA_MAPS_KEY: process.env.GATSBY_GA_MAPS_KEY,
          }),
        }}
      />
      {hasMore && <Link to={post.fields.slug}>Leggi tutto...</Link>}
    </Article>
  );
};

export default PostListItem;
