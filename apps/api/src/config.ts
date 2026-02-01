export const config = {
  cors: {
    origins: process.env.CORS_ORIGINS?.split(',') || [
      'http://localhost:7200',
      'http://localhost:7201',
    ],
  },
  ws: {
    port: parseInt(process.env.WS_PORT || '7000'),
  },
};
