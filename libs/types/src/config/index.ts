type TAppConfig = {
  ENV: string;
  SERVER_NAME: string;
  PORT: number;
};

type TDatabaseConfig = {
  DB_TYPE: string;
  DB_HOST: string;
  DB_PORT: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
};

type TConfiguration = {
  APP: TAppConfig;
  DB: TDatabaseConfig;
};

export { TConfiguration, TAppConfig, TDatabaseConfig };
