import { createClient } from '@libsql/client';

const client = createClient({
  url: process.env.TURSO_CONNECTION_URL || "libsql://next-labs-db-imple.aws-eu-west-1.turso.io",
  authToken: process.env.TURSO_AUTH_TOKEN || "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzM1MTM1NDcsImlkIjoiMDE5Y2VkOGYtYzkwMS03MjIxLWIzZDQtOTE2YWMxYzRmNmY3IiwicmlkIjoiNWYyNTU3ODctOTZkMi00MGQzLTk0ZWYtMjYyZGI5OWYxYWMzIn0.ol7j1UZnowcW99UcEUvVlHS0Et2-CvvF8-wWJkWqq2hpOp1P9j4fhTW3zbtbLJEec9wo5klsokayKYjHOzzNCA",
});

export default client;