import { PartialType } from '@nestjs/mapped-types';
import { LoginDto } from './login.dto';
import { UserRole } from 'src/modules/users/entities/user.entity';

export class RegisterDto extends PartialType(LoginDto) {
  role?: UserRole;
}
