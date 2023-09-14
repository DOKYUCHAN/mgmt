import { MgmtType, Team } from '@app/database';

export interface MgmtItemSchema {
  mgmt_item_id: string;
  partner: string;
  mgmt_item_nm: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;

  // 📌 Relational Variables
  team: Team;
  mgmtType: MgmtType;
}
