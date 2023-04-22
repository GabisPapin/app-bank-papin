import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Account from '../../../accounts/typeorm/entities/Account';
// '@modules/accounts/typeorm/entities/Account';

@Entity('transactions')
export default class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal')
  value: number;

  @ManyToOne(() => Account, account => account.transactionDebited)
  @JoinColumn({ name: 'debited_account_id' })
  debitedAccount: Account;

  @ManyToOne(() => Account, account => account.transactionCredited)
  @JoinColumn({ name: 'credited_account_id' })
  creditedAccount: Account;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
