import { Module } from '@nestjs/common';
import { GamificationsService } from './gamifications.service';
import { GamificationsController } from './gamifications.controller';

@Module({
  controllers: [GamificationsController],
  providers: [GamificationsService],
})
export class GamificationsModule {}
