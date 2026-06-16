import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CommunityAlertsService } from './community_alerts.service';
import { CreateCommunityAlertDto } from './dto/create-community_alert.dto';
import { UpdateCommunityAlertDto } from './dto/update-community_alert.dto';

@Controller('community-alerts')
export class CommunityAlertsController {
  constructor(
    private readonly communityAlertsService: CommunityAlertsService,
  ) {}

  @Post()
  create(@Body() createCommunityAlertDto: CreateCommunityAlertDto) {
    return this.communityAlertsService.create(createCommunityAlertDto);
  }

  @Get()
  findAll() {
    return this.communityAlertsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.communityAlertsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommunityAlertDto: UpdateCommunityAlertDto,
  ) {
    return this.communityAlertsService.update(id, updateCommunityAlertDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.communityAlertsService.remove(id);
  }
}
