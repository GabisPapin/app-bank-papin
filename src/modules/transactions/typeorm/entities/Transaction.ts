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
  @JoinColumn({ name: 'debitedAccountId' })
  debitedAccount: Account;

  @ManyToOne(() => Account, account => account.transactionCredited)
  @JoinColumn({ name: 'creditedAccountId' })
  creditedAccount: Account;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
