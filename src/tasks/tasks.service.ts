import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as fs from 'fs';

@Injectable()
export class TasksService {
  @Cron(CronExpression.EVERY_WEEKEND)
  apiLogRotation() {
    fs.truncate('src/logs/api.log', 0, (err) => {
      if (err) {
        console.error(`Error truncating api.log: ${err}`);
      }
    });
  }

  @Cron(CronExpression.EVERY_WEEKEND)
  errorLogRotation() {
    fs.truncate('src/logs/error.log', 0, (err) => {
      if (err) {
        console.error(`Error truncating error.log: ${err}`);
      }
    });
  }
}
