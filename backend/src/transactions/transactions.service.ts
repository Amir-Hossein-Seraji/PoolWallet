import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  // 1. Create a transaction
  create(data: any, userId: string) {
    return this.prisma.transaction.create({
      data: {
        title: data.title,
        amount: parseFloat(data.amount),
        category: data.category,
        user_id: userId,
      }
    });
  }
  update(id: string, data: any) {
    return this.prisma.transaction.update({
      where: { id: id },
      data: {
        title: data.title,
        amount: parseFloat(data.amount),
        category: data.category,
      }
    });
  }
  // 2. Get all transactions
  findAll(userId: string) {
    return this.prisma.transaction.findMany({
      where: { user_id: userId },
      orderBy: { createdAt: 'desc' }
    });
  }

  // 3. Get ONE specific transaction by ID
  findOne(id: string) {
    return this.prisma.transaction.findUnique({
      where: { id: id }
    });
  }

  // 5. Delete a transaction
  remove(id: string) {
    return this.prisma.transaction.delete({
      where: { id: id }
    });
  }
}