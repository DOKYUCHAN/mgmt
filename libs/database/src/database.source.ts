// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

import { getEntities } from './entities';

// migration용 config
// 2개 이상의 dataSource를 export할 경우 migration 쪽에서 error가 발생, 1개만 export 할 것
const options: DataSourceOptions & SeederOptions = {
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: getEntities(),
  migrations: [__dirname + '/migrations/*.ts'],
  seeds: [__dirname + '\\seeders\\.seeder.ts'],
};

export const dataSource = new DataSource(options);
