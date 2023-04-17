import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class CreateTransactions1681756555790 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(
      new Table({
        name: 'transactions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'value',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
      }),
    );
    await queryRunner.addColumn(
      'transactions',
      new TableColumn({
        name: 'debited_account_id',
        type: 'uuid',
      }),
    );
    await queryRunner.addColumn(
      'transactions',
      new TableColumn({
        name: 'credited_account_id',
        type: 'uuid',
      }),
    );
    await queryRunner.createForeignKey(
      'transactions',
      new TableForeignKey({
        name: 'UserAccountTransactionsDebited',
        columnNames: ['debited_account_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'accounts',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'transactions',
      new TableForeignKey({
        name: 'UserAccountTransactionsCredited',
        columnNames: ['credited_account_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'accounts',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'transactions',
      'UserAccountTransactionsDebited',
    );
    await queryRunner.dropForeignKey(
      'transactions',
      'UserAccountTransactionsCredited',
    );
    await queryRunner.dropColumn('transactions', 'debited_account_id');
    await queryRunner.dropColumn('transactions', 'credited_account_id');
    await queryRunner.dropTable('transactions');
  }
}
