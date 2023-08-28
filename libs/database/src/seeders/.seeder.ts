import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { MgmtTypeSeeder } from './mgmt-type.seeder';

export default class SeederAll implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    console.log('✅ Seeder Start');
    await MgmtTypeSeeder(dataSource);
    console.log('✅ Seeder End');
  }
}
