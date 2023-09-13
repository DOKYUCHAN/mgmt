import { Dept } from './dept.entity';
import { Team } from './team.entity';
import { MgmtType } from './mgmt-type.entity';
import { MgmtItem } from './mgmt-item.entity';
import { Manager } from './manager.entity';

const getEntities = () => {
  const entities: any[] = [Dept, Team, MgmtType, MgmtItem, Manager];
  return entities;
};

export { getEntities, Dept, Team, MgmtType, MgmtItem, Manager };
