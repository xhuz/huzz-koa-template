import {createConnection, ConnectionOptions, Logger, QueryRunner} from 'typeorm';
import {environment} from '../../environments';
import {mysqlLogger} from '../core/logger';

export async function connection() {
  const config: ConnectionOptions = environment.db as any;
  Object.assign(config, {logger: new DbLogger()});
  try {
    return await createConnection(config);
  } catch (error) {
    mysqlLogger.error(error);
  }
}

class DbLogger implements Logger {

  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
    mysqlLogger.info(query);
  }

  logQueryError(error: string, query: string, parameters?: any[], queryRunner?: QueryRunner) {
    mysqlLogger.error(query, error);
  }

  logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner) {
    mysqlLogger.info(query, time);
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner) {
    mysqlLogger.info(message);
  }

  logMigration(message: string, queryRunner?: QueryRunner) {
    mysqlLogger.info(message);
  }

  log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner) {
    switch (level) {
      case 'info': {
        mysqlLogger.info(message);
        break;
      }
      case 'warn': {
        mysqlLogger.warn(message);
      }
    }
  }
}
