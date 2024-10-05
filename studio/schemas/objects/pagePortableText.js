import { FaExternalLinkAlt, FaLink } from 'react-icons/fa';
export default {
  name: 'pagePortableText',
  of: [
    {
      



lists: [{ title: 'Bullet', value: 'bullet' }],
      







// Marks let you mark up inline text in the block editor.
marks: {
        
        
        // Annotations can be any object structure – e.g. a link or a footnote.
annotations: [
          {
            blockEditor: {
              icon: FaLink,
            },
            fields: [
              {
                name: 'reference',
                title: 'Reference',
                to: [
                  { type: 'document' },
                  // other types you may want to link to
                ],
                type: 'reference',
              },
            ],
            name: 'internalLink',
            title: 'Internal link',
            type: 'object',
          },
          {
            blockEditor: {
              icon: FaLink,
            },
            fields: [
              {
                name: 'href',
                title: 'Relative URL',
                type: 'string',
              },
            ],
            name: 'internalOldLink',
            title: 'Internal link to other pages',
            type: 'object',
          },
          {
            blockEditor: {
              icon: FaExternalLinkAlt,
            },
            fields: [
              {
                name: 'href',
                title: 'URL',
                type: 'url',
              },
              {
                name: 'blank',
                title: 'Open in new tab',
                type: 'boolean',
              },
            ],
            name: 'link',
            title: 'External link',
            type: 'object',
          },
        ],
        
        // Decorators usually describe a single property – e.g. a typographic
// preference or highlighting by editors.
decorators: [
          { title: 'Grassetto', value: 'strong' },
          { title: 'Enfasi', value: 'em' },
        ],
      },
      
      
      
      
      
// Styles let you set what your user can mark up blocks with. These
// corrensponds with HTML tags, but you can set any title or value
// you want and decide how you want to deal with it where you want to
// use your content.
styles: [
        { title: 'Normale', value: 'normal' },
        { title: 'Titolo', value: 'h2' },
        { title: 'Titolo 2', value: 'h3' },
        { title: 'Sezione', value: 'h4' },
        { title: 'Citazione', value: 'blockquote' },
      ],
      
title: 'Block',
      
      type: 'block',
    },
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    {
      type: 'figure',
    },
  ],
  title: 'Portable Text',
  type: 'array',
};
