import { defineConfig } from '@prisma/engine-core';
import { config } from 'dotenv';

// Load environment variables from .env file
config({ path: '../../.env' });

export default defineConfig({
  datasources: {
    db: {
      url: process.env.DATABASE_URL || 'file:./dev.db',
    },
  },
});
