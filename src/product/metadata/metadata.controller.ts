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
import { Role } from 'src/auth/roles/role.enum';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { CreateMetaDataGroupDto } from './dto/CreateMetaDataGroup.dto';
import { CreateMetaDataOptionDto } from './dto/CreateMetaDataOption.dto';
import { UpdateMetaDataGroupDto } from './dto/updateMetaDataGroup.dto';
import { UpdateMetaDataOptionDto } from './dto/updateMetaDataOption.dto';
import { MetadataService } from './metadata.service';

@ApiTags('Products')
@Controller('product/metadata')
export class MetadataController {
  constructor(private readonly metadataService: MetadataService) {}

  //metadata groups

  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiCookieAuth()
  @ApiBearerAuth()
  @Get('group')
  getMetadataGroups() {
    return this.metadataService.getMetadataGroups();
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiCookieAuth()
  @ApiBearerAuth()
  @Post('group')
  createMetadataGroup(@Body() metadataGroup: CreateMetaDataGroupDto) {
    return this.metadataService.createMetadataGroup(metadataGroup);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiCookieAuth()
  @ApiBearerAuth()
  @Put('group/:id')
  updateMetadataGroup(
    @Param('id') id: string,
    @Body() metadataGroup: UpdateMetaDataGroupDto,
  ) {
    return this.metadataService.updateMetadataGroup(id, metadataGroup);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiCookieAuth()
  @ApiBearerAuth()
  @Delete('group/:id')
  deleteMetadataGroup(@Param('id') id: string) {
    return this.metadataService.deleteMetadataGroup(id);
  }

  //metadata options

  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiCookieAuth()
  @ApiBearerAuth()
  @Get('option')
  getMetadataOptions() {
    return this.metadataService.getMetadataOptions();
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiCookieAuth()
  @ApiBearerAuth()
  @Post('option')
  createMetadataOption(@Body() metadataOption: CreateMetaDataOptionDto) {
    return this.metadataService.createMetadataOption(metadataOption);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiCookieAuth()
  @ApiBearerAuth()
  @Put('option/:id')
  updateMetadataOption(
    @Param('id') id: string,
    @Body() metadataOption: UpdateMetaDataOptionDto,
  ) {
    return this.metadataService.updateMetadataOption(id, metadataOption);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiCookieAuth()
  @ApiBearerAuth()
  @Delete('option/:id')
  deleteMetadataOption(@Param('id') id: string) {
    return this.metadataService.deleteMetadataOption(id);
  }
}
