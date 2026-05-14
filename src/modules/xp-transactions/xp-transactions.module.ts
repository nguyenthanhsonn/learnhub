import { Module } from '@nestjs/common';
import { XpTransactionsService } from './xp-transactions.service';
import { XpTransactionsController } from './xp-transactions.controller';

@Module({
  controllers: [XpTransactionsController],
  providers: [XpTransactionsService],
})
export class XpTransactionsModule {}
