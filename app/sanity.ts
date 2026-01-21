import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: "rnmfqyjs",
  dataset: "production",
  apiVersion: "2025-01-18",
  useCdn: false,
});