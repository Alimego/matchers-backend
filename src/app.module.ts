import { Module } from '@nestjs/common';
import {} from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SubscribeService } from './subscribe/subscribe.service';
import { SubscribeModule } from './subscribe/subscribe.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    SubscribeModule,
    PrismaModule,
    UserModule,
  ],
  providers: [SubscribeService],
})
export class AppModule {}
