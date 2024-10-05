// sanity.cli.js
import { defineCliConfig } from 'sanity/cli';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

export default defineCliConfig({
  api: {
    dataset: process.env.GATSBY_SANITY_DATASET,
    projectId: process.env.SANITY_PROJECT,
  },
});
