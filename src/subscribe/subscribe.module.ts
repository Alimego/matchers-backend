import { Module } from '@nestjs/common';
import { SubscribeController } from './subscribe.controller';
import { SubscribeService } from './subscribe.service';
import { AuthGuard } from '../auth/gaurd/auth.gaurd';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [SubscribeController],
  providers: [SubscribeService, AuthGuard],
})
export class SubscribeModule {}
