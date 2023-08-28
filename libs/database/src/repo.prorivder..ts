import { DataSource } from 'typeorm';
import { Dept, Team, MgmtType, MgmtItem, Manager } from '@app/database/entities';

export const repoProvider = [
  {
    provide: 'DEPT_REPO',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Dept),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'TEAM_REPO',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Team),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'MGMT_TYPE_REPO',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(MgmtType),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'MGMT_ITEM_REPO',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(MgmtItem),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'MANAGER_REPO',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Manager),
    inject: ['DATA_SOURCE'],
  },
];
