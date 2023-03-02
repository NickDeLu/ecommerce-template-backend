import {
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiCookieAuth,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { StorageService } from './storage.service';

@Controller('storage/local')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiCookieAuth()
  @ApiBearerAuth()
  @ApiQuery({ name: 'path', type: 'string', required: true })
  @HttpCode(200)
  @Get('list')
  list(@Query('path') path: string = '/') {
    return this.storageService.list(path);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiCookieAuth()
  @ApiBearerAuth()
  @ApiQuery({ name: 'path', type: 'string', required: true })
  @UseInterceptors(FilesInterceptor('files'))
  @HttpCode(200)
  @Post('upload')
  upload(
    @Query('path') path: string = '/',
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    console.log(path);
    return this.storageService.upload(path, files);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiCookieAuth()
  @ApiBearerAuth()
  @ApiQuery({ name: 'path', type: 'string', required: true })
  @HttpCode(200)
  @Post('mkdir')
  mkdir(@Query('path') path: string = '/') {
    return this.storageService.mkdir(path);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiCookieAuth()
  @ApiBearerAuth()
  @ApiQuery({ name: 'path', type: 'string', required: true })
  @HttpCode(200)
  @Post('delete')
  delete(@Query('path') path: string = '/') {
    return this.storageService.delete(path);
  }
}
