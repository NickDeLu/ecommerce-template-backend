import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCookieAuth,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { readFileSync } from 'fs';
import { Role } from 'src/auth/roles/role.enum';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';

@ApiTags('logs')
@Controller('logs')
export class LogsController {
  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiCookieAuth()
  @ApiBearerAuth()
  @ApiQuery({ name: 'page', type: 'number', required: false })
  @ApiQuery({ name: 'limit', type: 'number', required: false })
  @Get('api')
  getApiLogs(
    @Res() response: any,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    const file = readFileSync(`${process.cwd()}/src/logs/api.log`);
    const startIndex = (page - 1) * limit;
    const logs = file
      .toString()
      .split('\n')
      .slice(startIndex, Number(startIndex) + Number(limit));
    response.setHeader('Content-Type', 'text/plain');
    response.send(logs.join('\n'));
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiCookieAuth()
  @ApiBearerAuth()
  @ApiQuery({ name: 'page', type: 'number', required: false })
  @ApiQuery({ name: 'limit', type: 'number', required: false })
  @ApiQuery({ name: 'verbose', type: 'boolean', required: false })
  @Get('error')
  getErrorLogs(
    @Res() response: any,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('verbose') verbose: any = false,
  ) {
    const file = readFileSync(`${process.cwd()}/src/logs/error.log`);
    const startIndex = (page - 1) * limit;
    let logs: string | any[];
    if (JSON.parse(verbose) === true) {
      logs = file
        .toString()
        .split('Response Code:')
        .map((log, index) => {
          if (index === 0) {
            return log;
          }
          return `Response Code:${log}`;
        });
    } else {
      logs = file
        .toString()
        .split('\n')
        .filter((line) => line.startsWith('Response Code:'));
    }
    const paginatedLogs = logs.slice(
      startIndex,
      Number(startIndex) + Number(limit),
    );
    response.setHeader('Content-Type', 'text/plain');
    response.send(paginatedLogs.join('\n'));
  }
}
