import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './http-exception.filter';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
