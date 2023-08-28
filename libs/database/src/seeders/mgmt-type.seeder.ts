import { DataSource } from 'typeorm';

import { MgmtType } from '../entities';

export const MgmtTypeSeeder = async (dataSource: DataSource) => {
  const repository = dataSource.getRepository(MgmtType);

  await repository.delete({});
  await repository.insert([
    { mgmt_type_nm: 'WEB 서버' },
    { mgmt_type_nm: 'Application 서버' },
    { mgmt_type_nm: 'Database 서버' },
  ]);
};
