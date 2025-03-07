// Document types
import corso from './documents/corso';
import event from './documents/event';
import { page } from './documents/page';
import person from './documents/person';
import homeBlock from './documents/home-block';
import siteSettings from './documents/siteSettings';

// Object types
import bioPortableText from './objects/bioPortableText';
import { figure } from './objects/figure';
import projectMember from './objects/projectMember';
import pagePortableText from './objects/pagePortableText';
import { simpleImage } from './objects/simpleImage';

// Then we give our schema to the builder and provide the result to Sanity
export default [
  bioPortableText,
  corso,
  homeBlock,
  event,
  figure,
  page,
  simpleImage,
  pagePortableText,
  person,
  projectMember,
  siteSettings,
];
