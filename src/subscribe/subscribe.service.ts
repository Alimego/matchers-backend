import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SubscribeService {
  constructor(private prisma: PrismaService) {}
  async addSubscriber(email: string): Promise<{ message: string }> {
    try {
      await this.prisma.subscriber.create({
        data: {
          email,
        },
      });
      return { message: 'Subscriber added successfully' };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException(
          'Subscriber already exists. Thanks for subscribing!',
        );
      }
      throw new InternalServerErrorException('Internal server error');
    }
  }

  async getSubscribers() {
    try {
      return await this.prisma.subscriber.findMany();
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }
}
