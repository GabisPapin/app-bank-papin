import 'dotenv/config';
import { DataSource } from 'typeorm';
import { CreateUsers1681751894630 } from './migrations/1681751894630-create-users';
import { CreateAccounts1681753393865 } from './migrations/1681753393865-create-accounts';
import { CreateTransactions1681756555790 } from './migrations/1681756555790-create-transactions';

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASS,
  database: process.env.POSTGRES_DB,
  entities: [],
  migrations: [
    CreateUsers1681751894630,
    CreateAccounts1681753393865,
    CreateTransactions1681756555790,
  ],
});
