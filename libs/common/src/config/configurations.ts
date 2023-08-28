import { TConfiguration } from '@app/types';

const configurations = (): TConfiguration => {
  const env = process.env.NODE_ENV || 'local';
  const serverName = process.env.SERVER_NAME || 'UNKNOWN';

  return {
    APP: {
      ENV: env,
      SERVER_NAME: serverName,
      PORT: +process.env.SERVER_PORT,
    },
    DB: {
      DB_TYPE: process.env.DB_TYPE,
      DB_HOST: process.env.DB_HOST,
      DB_PORT: process.env.DB_PORT,
      DB_USER: process.env.DB_USER,
      DB_PASSWORD: process.env.DB_PASSWORD,
      DB_NAME: process.env.DB_NAME,
    },
  };
};

export { configurations };
