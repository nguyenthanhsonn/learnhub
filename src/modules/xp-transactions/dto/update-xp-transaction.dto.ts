import { PartialType } from '@nestjs/mapped-types';
import { CreateXpTransactionDto } from './create-xp-transaction.dto';

export class UpdateXpTransactionDto extends PartialType(CreateXpTransactionDto) {}
