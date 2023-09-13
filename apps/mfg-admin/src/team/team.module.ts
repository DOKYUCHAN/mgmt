import { Module } from '@nestjs/common';
import { LibsModule } from '@app/libs';

import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TeamRepository } from './team.repository';

@Module({
  imports: [LibsModule],
  controllers: [TeamController],
  providers: [TeamService, TeamRepository],
  exports: [TeamService, TeamRepository],
})
export class TeamModule {}
