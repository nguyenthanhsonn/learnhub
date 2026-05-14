import { Injectable } from '@nestjs/common';
import { CreateGamificationDto } from './dto/create-gamification.dto';
import { UpdateGamificationDto } from './dto/update-gamification.dto';

@Injectable()
export class GamificationsService {
  create(createGamificationDto: CreateGamificationDto) {
    return 'This action adds a new gamification';
  }

  findAll() {
    return `This action returns all gamifications`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gamification`;
  }

  update(id: number, updateGamificationDto: UpdateGamificationDto) {
    return `This action updates a #${id} gamification`;
  }

  remove(id: number) {
    return `This action removes a #${id} gamification`;
  }
}
