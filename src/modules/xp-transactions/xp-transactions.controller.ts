import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { XpTransactionsService } from './xp-transactions.service';
import { CreateXpTransactionDto } from './dto/create-xp-transaction.dto';
import { UpdateXpTransactionDto } from './dto/update-xp-transaction.dto';

@Controller('xp-transactions')
export class XpTransactionsController {
  constructor(private readonly xpTransactionsService: XpTransactionsService) {}

  @Post()
  create(@Body() createXpTransactionDto: CreateXpTransactionDto) {
    return this.xpTransactionsService.create(createXpTransactionDto);
  }

  @Get()
  findAll() {
    return this.xpTransactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.xpTransactionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateXpTransactionDto: UpdateXpTransactionDto) {
    return this.xpTransactionsService.update(+id, updateXpTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.xpTransactionsService.remove(+id);
  }
}
