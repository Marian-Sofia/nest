import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { TuitsService } from './tuits.service';
import { Tuit } from './tuit.entity';
import { CreateTuitDto, UpdateTuitDto } from './dto';

@Controller('tuits')
export class TuitsController {
  constructor(private readonly tuitService: TuitsService) {}

  @Get()
  getTuits(@Query() filterQuery): Promise<Tuit[]> | string {
    const { orderBy, searchTerm } = filterQuery;

    if (orderBy && searchTerm)
      return `All ${searchTerm} tuits ordered by ${orderBy}`;

    return this.tuitService.getTuits();
  }

  @Get(':id')
  getTuitById(@Param('id') id: number): Promise<Tuit> {
    return this.tuitService.getTuitById(id);
  }

  @Post()
  createTuit(@Body() message: CreateTuitDto): Promise<Tuit> {
    return this.tuitService.createTuit(message);
  }

  @Patch(':id')
  updateTuit(@Param('id') id: number, @Body() Tuit: UpdateTuitDto): Promise<Tuit> {
    return this.tuitService.updateTuit(id, Tuit);
  }

  @Delete(':id')
  removeTuit(@Param('id') id: number): Promise<string> {
    return this.tuitService.removeTuit(id);
  }
}
