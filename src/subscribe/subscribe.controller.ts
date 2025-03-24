import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SubscribeService } from './subscribe.service';
import { subscribeDto } from './dto/subscribe.dto';
import { AuthGuard } from '../auth/gaurd/auth.gaurd';
import { RolesGuard } from '../auth/gaurd/roles.gaurd';
import { Role } from '../auth/enums/role.enum';
import { Roles } from '../auth/decorator/roles.decorator';
@Controller('subscribe')
export class SubscribeController {
  constructor(private readonly subscribeService: SubscribeService) {}

  @Post()
  addSubscriber(
    @Body() subscribeDto: subscribeDto,
  ): Promise<{ message: string }> {
    return this.subscribeService.addSubscriber(subscribeDto.email);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  getSubscribers() {
    return this.subscribeService.getSubscribers();
  }
}
