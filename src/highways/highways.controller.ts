import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';

import { HighwaysService } from './highways.service';

import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Highways } from './highways.entity';

@Controller('highways')
@ApiTags('Highways')
export class HighwaysController {
  constructor(private service: HighwaysService) {}

  @Get()
  @ApiOkResponse({ type: [Highways] })
  getAllEmployees() {
    return this.service.getHighways();
  }

  @Get(':id')
  @ApiOkResponse({ type: Highways })
  findOne(@Param('id') id: string) {
    return this.service.getHighwayById(id);
  }
}
