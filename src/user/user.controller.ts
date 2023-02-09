import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCookieAuth,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { plainToInstance, plainToClass } from 'class-transformer';
import { AddressEntity } from 'src/address/address.entity';
import { AddressService } from 'src/address/address.service';
import CreateAddressDto from 'src/address/dto/createAddressDto.dto';
import { Role } from 'src/auth/roles/role.enum';
import { Roles } from 'src/auth/roles/roles.decorator';
import { ProductEntity } from 'src/product/product.entity';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import UpdateUserDto from './dto/updateUser.dto';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import UpdateAddressDto from 'src/address/dto/updateAddressDto.dto';
import { PaymentService } from 'src/payment/payment.service';
import CreatePaymentDto from 'src/payment/dto/createPayment.dto';
import { PaymentEntity } from 'src/payment/payment.entity';
import UpdatePaymentDto from 'src/payment/dto/updatePayment.dto';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly addressService: AddressService,
    private readonly paymentService: PaymentService,
  ) {}

  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiCookieAuth()
  @ApiBearerAuth()
  @Get()
  getUsers() {
    return this.userService.getAll();
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiCookieAuth()
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: 'string' })
  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.getOneById(id);
  }

  @Roles(Role.customer)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiCookieAuth()
  @ApiBearerAuth()
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() user: UpdateUserDto) {
    return this.userService.updateUser(id, user);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiCookieAuth()
  @ApiBearerAuth()
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @Roles(Role.customer)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiCookieAuth()
  @ApiBearerAuth()
  @Post('address')
  createAddress(@Body() address: CreateAddressDto) {
    return plainToClass(
      AddressEntity,
      this.addressService.createAddress(address),
    );
  }

  @Roles(Role.customer)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiCookieAuth()
  @ApiBearerAuth()
  @Put('address/:id')
  updateAddress(@Param('id') id: string, @Body() address: UpdateAddressDto) {
    return this.addressService.updateAddress(id, address);
  }

  @Roles(Role.customer)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiCookieAuth()
  @ApiBearerAuth()
  @Delete('address/:id')
  deleteAddress(@Param('id') id: string) {
    return this.addressService.deleteAddress(id);
  }

  @Roles(Role.customer)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiCookieAuth()
  @ApiBearerAuth()
  @Post('payment')
  createPaymentMethod(@Body() payment: CreatePaymentDto) {
    return plainToClass(
      PaymentEntity,
      this.paymentService.createPayment(payment),
    );
  }

  @Roles(Role.customer)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiCookieAuth()
  @ApiBearerAuth()
  @Put('payment/:id')
  updatePaymentMethod(
    @Param('id') id: string,
    @Body() payment: UpdatePaymentDto,
  ) {
    return this.paymentService.updatePayment(id, payment);
  }

  @Roles(Role.customer)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiCookieAuth()
  @ApiBearerAuth()
  @Delete('payment/:id')
  deletePaymentMethod(@Param('id') id: string) {
    return this.paymentService.deletePayment(id);
  }
}
