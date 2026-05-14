import { Injectable } from '@nestjs/common';
import { CreateXpTransactionDto } from './dto/create-xp-transaction.dto';
import { UpdateXpTransactionDto } from './dto/update-xp-transaction.dto';

@Injectable()
export class XpTransactionsService {
  create(createXpTransactionDto: CreateXpTransactionDto) {
    return 'This action adds a new xpTransaction';
  }

  findAll() {
    return `This action returns all xpTransactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} xpTransaction`;
  }

  update(id: number, updateXpTransactionDto: UpdateXpTransactionDto) {
    return `This action updates a #${id} xpTransaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} xpTransaction`;
  }
}
