import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiCookieAuth } from '@nestjs/swagger';
import { Role } from 'src/auth/roles/role.enum';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { AppDataService } from './app-data.service';
import appDataDto from './dto/appData.dto';

@Controller('app-data')
export class AppDataController {
  constructor(private readonly appDataService: AppDataService) {}

  /**
   * Fetches the appData JSON object for the app
   * @returns the appData JSON
   */
  @Get()
  @HttpCode(200)
  getAppData() {
    return this.appDataService.getAppData();
  }

  /**
   * Saves the local appData state with the provided JSON
   * @returns the newly saved appData
   */
  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiCookieAuth()
  @ApiBearerAuth()
  @Post()
  syncAppData(@Body() appData: appDataDto) {
    return this.appDataService.syncAppData(appData);
  }
}
