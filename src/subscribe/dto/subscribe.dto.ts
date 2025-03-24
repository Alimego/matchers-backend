import { IsEmail, IsNotEmpty } from 'class-validator';

export class subscribeDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
