import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  public getValue(key: string): string {
    const value = this.env[key];

    if (!value) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k));
    return this;
  }

  public isProduction() {
    const mode = this.getValue('MODE');
    return mode != 'DEV';
  }

  public getDbConfig() {
    return {
      type: 'postgres' as const,

      host: this.getValue('DB_HOST'),
      port: parseInt(this.getValue('DB_PORT')),
      username: this.getValue('DB_USER'),
      password: this.getValue('DB_PASS'),
      database: this.getValue('DB_NAME'),

      migrationsTableName: 'migration',

      migrations: ['dist/database/migrations/*.js'],
      entities: ['dist/modules/**/*.entity.js'],
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'DB_HOST',
  'DB_PORT',
  'DB_USER',
  'DB_PASS',
  'DB_NAME',
]);

export const typeOrmConfig: TypeOrmModuleOptions = {
  ...configService.getDbConfig(),
  autoLoadEntities: true,
};

const dataSource = new DataSource(configService.getDbConfig());

export default dataSource;
