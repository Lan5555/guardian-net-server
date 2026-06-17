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
import { ReputationService } from './reputation.service';
import { CreateReputationDto } from './dto/create-reputation.dto';
import { UpdateReputationDto } from './dto/update-reputation.dto';

@Controller('reputation')
export class ReputationController {
  constructor(private readonly reputationService: ReputationService) {}

  @Post('/create')
  create(@Body() createReputationDto: CreateReputationDto) {
    return this.reputationService.create(createReputationDto);
  }

  @Get('/find-all')
  findAll() {
    return this.reputationService.findAll();
  }

  @Get('/find-one/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reputationService.findOne(id);
  }

  @Patch('/update/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReputationDto: UpdateReputationDto,
  ) {
    return this.reputationService.update(id, updateReputationDto);
  }

  @Delete('/delete/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.reputationService.remove(id);
  }
}
