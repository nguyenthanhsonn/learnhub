import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GamificationsService } from './gamifications.service';
import { CreateGamificationDto } from './dto/create-gamification.dto';
import { UpdateGamificationDto } from './dto/update-gamification.dto';

@Controller('gamifications')
export class GamificationsController {
  constructor(private readonly gamificationsService: GamificationsService) {}

  @Post()
  create(@Body() createGamificationDto: CreateGamificationDto) {
    return this.gamificationsService.create(createGamificationDto);
  }

  @Get()
  findAll() {
    return this.gamificationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gamificationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGamificationDto: UpdateGamificationDto) {
    return this.gamificationsService.update(+id, updateGamificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gamificationsService.remove(+id);
  }
}
