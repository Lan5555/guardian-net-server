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
import { CommunityService } from './community.service';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';

@Controller('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Post('/create')
  create(@Body() createCommunityDto: CreateCommunityDto) {
    return this.communityService.create(createCommunityDto);
  }

  @Get('/find-all')
  findAll() {
    return this.communityService.findAll();
  }

  @Get('/find-one/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.communityService.findOne(id);
  }

  @Patch('/update-one/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommunityDto: UpdateCommunityDto,
  ) {
    return this.communityService.update(id, updateCommunityDto);
  }

  @Delete('/delete-one/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.communityService.remove(id);
  }
}
