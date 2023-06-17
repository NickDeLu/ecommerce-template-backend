import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import { promises } from 'fs';

@Injectable()
export class StorageService {
  private readonly root = path.join(__dirname, '../../../src/storage/uploads');

  async delete(localPath: string) {
    try {
      let stat = await promises.lstat(this.root + localPath),
        isDir = stat.isDirectory(),
        isFile = stat.isFile();

      if (isFile) {
        await promises.unlink(this.root + localPath);
      } else if (isDir) {
        await this.rimraf(this.root + localPath);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async mkdir(localPath: string) {
    let alreadyExists = false;
    try {
      try {
        await promises.access(this.root + localPath);
        alreadyExists = true;
      } catch (error) {
        promises.mkdir(this.root + localPath);
      }
    } catch (err) {
      console.error(err);
    }
    if (alreadyExists) {
      throw new HttpException(
        'A folder of that name already exists',
        HttpStatus.CONFLICT,
      );
    }
  }

  async upload(localPath: string, files: any) {
    try {
      for (let file of files) {
        await promises.rename(
          file.path,
          this.root + localPath + file.originalname,
        );
      }
    } catch (err) {
      console.error(err);
    }
  }

  async list(localPath: string) {
    try {
      let dirs = [],
        files = [];

      if (localPath[localPath.length - 1] !== '/') {
        localPath += '/';
      }
      let items = await promises.readdir(this.root + localPath, {
        withFileTypes: true,
      });

      for (let item of items) {
        let isFile = item.isFile(),
          isDir = item.isDirectory();

        if (!isFile && !isDir) {
          continue;
        }

        let result: {
          type: any;
          path: any;
          basename?: any;
          name?: any;
          size?: any;
          extension?: any;
        } = {
          type: isFile ? 'file' : 'dir',
          path: localPath + item.name,
        };

        result.basename = result.name = path.basename(result.path);

        if (isFile) {
          let fileStat = await promises.stat(this.root + result.path);
          result.size = fileStat.size;
          result.extension = path.extname(result.path).slice(1);
          result.name = path.basename(result.path, '.' + result.extension);
          files.push(result);
        } else {
          result.path += '/';
          dirs.push(result);
        }
      }

      return dirs.concat(files).filter((f) => f.path != '/.gitkeep');
    } catch (err) {
      console.error(err);
    }
  }

  async rimraf(dir) {
    const files = await promises.readdir(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = await promises.lstat(filePath);
      if (stat.isDirectory()) {
        await this.rimraf(filePath);
      } else {
        await promises.unlink(filePath);
      }
    }
    await promises.rmdir(dir);
  }
}
