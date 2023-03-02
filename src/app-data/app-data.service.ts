import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class AppDataService {
  syncAppData(appData: any) {
    const appDataFileContent = `${JSON.stringify(appData)}`;
    fs.writeFileSync('./appData.json', appDataFileContent, 'utf-8');
  }
  async getAppData() {
    return fs.readFileSync('./appData.json').toString();
  }
}
