import { createClient } from '@libsql/client';

const client = createClient({
  url: process.env.TURSO_CONNECTION_URL || "libsql://next-labs-db-imple.aws-eu-west-1.turso.io",
  authToken: process.env.TURSO_AUTH_TOKEN || "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzM1MTIxODQsImlkIjoiMDE5Y2VkOGYtYzkwMS03MjIxLWIzZDQtOTE2YWMxYzRmNmY3IiwicmlkIjoiNWYyNTU3ODctOTZkMi00MGQzLTk0ZWYtMjYyZGI5OWYxYWMzIn0.-No-Zl91ee6Q-qTFHAGiMoNwxLiBgDZNTis30YMHlx_W1q2ooHmpH-G1NYgiYi1uYJJ8_IpuOSeYIqYKhwbDDw",
});

export default client;