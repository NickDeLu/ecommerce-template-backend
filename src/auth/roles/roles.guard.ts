import { ROLES_KEY } from './roles.decorator';
import { AuthService } from '../auth.service';
import { Role } from './role.enum';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    const roles = await this.authService.getRoles(user.id);

    const authorized = roles.some((role) =>
      requiredRoles.includes(role as Role),
    );
    if (!authorized) {
      throw new HttpException(
        'You do not have sufficient permissions for this resource',
        HttpStatus.FORBIDDEN,
      );
    }

    return authorized;
  }
}
