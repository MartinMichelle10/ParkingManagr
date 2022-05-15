import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Render,
  Res,
  UseFilters,
} from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { createReadStream } from 'fs';
import { join } from 'path';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiExcludeEndpoint()
  @Get('/erd')
  getFile(@Res() res: any) {
    const file = createReadStream(join(process.cwd(), 'parking.html'));
    file.pipe(res);
  }
}
