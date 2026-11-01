import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema',
  migrations: {
    path: 'prisma/migrations',
    seed: 'bun --conditions=react-server prisma/seed.ts',
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
