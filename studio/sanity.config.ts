import { defineConfig } from 'sanity';
import schemaTypes from './schemas/schema';
import { deskTool } from 'sanity/desk';

import {
  dashboardTool,
  projectUsersWidget,
  projectInfoWidget,
} from '@sanity/dashboard';
import { netlifyWidget } from 'sanity-plugin-dashboard-widget-netlify';
import { media } from 'sanity-plugin-media';
import deskStructure from './deskStructure';

export default defineConfig({
  dataset: 'production',
  document: {
    actions: (prev, { schemaType }) => {
      if (schemaType === 'settings') {
        return prev.filter(
          ({ action }) =>
            !['unpublish', 'delete', 'duplicate'].includes(action || '')
        );
      }
      return prev;
    },
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter(
          (templateItem) => templateItem.templateId !== 'settings'
        );
      }
      return prev;
    },
  },
  name: 'subnettuno',
  plugins: [
    deskTool({
      structure: deskStructure,
    }),
    dashboardTool({
      widgets: [
        netlifyWidget({
          sites: [
            {
              apiId: 'a069426b-4078-4739-bb84-93bf7ae69ffc',
              buildHookId: '61c8d4e89516345887ace730',
              name: 'subnettuno-sanity-studio',
              title: 'Sanity Studio',
            },
            {
              apiId: '2957c68e-a3eb-40f4-b127-32195e2837dd',
              buildHookId: '61c99ccc375345182a0bcef9',
              name: 'subnettuno',
              title: 'Sito pubblico',
              url: 'https://subnettuno.it',
            },
          ],
          title: 'My Netlify deploys',
        }),
        projectInfoWidget(),
        projectUsersWidget(),
      ],
    }),
    media(),
  ],
  projectId: process.env.SANITY_PROJECT,
  root: true,
  schema: {
    types: schemaTypes,
  },
});
