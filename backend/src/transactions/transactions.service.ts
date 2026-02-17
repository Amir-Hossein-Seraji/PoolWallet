import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  // 1. Create a transaction
  create(data: any) {
    return this.prisma.transaction.create({ data });
  }

  // 2. Get all transactions
  findAll() {
    return this.prisma.transaction.findMany({
      orderBy: { date: 'desc' } 
    });
  }

  // 3. Get ONE specific transaction by ID
  findOne(id: string) {
    return this.prisma.transaction.findUnique({
      where: { id: id }
    });
  }

  // 4. Update a transaction
  update(id: string, updateData: any) {
    return this.prisma.transaction.update({
      where: { id: id },
      data: updateData
    });
  }

  // 5. Delete a transaction
  remove(id: string) {
    return this.prisma.transaction.delete({
      where: { id: id }
    });
  }
}