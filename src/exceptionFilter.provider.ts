import { AllExceptionsFilter } from './allExceptionsFilter';

export const exceptionFilter = [
  {
    provide: 'APP_FILTER',
    useClass: AllExceptionsFilter,
  },
];
