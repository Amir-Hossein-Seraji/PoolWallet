import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('transactions')
@UseGuards(AuthGuard('jwt')) 
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(@Body() data: any, @Request() req) {
    const userId = req.user.userId; 
    return this.transactionsService.create(data, userId);
  }

  @Get()
  findAll(@Request() req) {
    const userId = req.user.userId;
    return this.transactionsService.findAll(userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(id);
  }
}