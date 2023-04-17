import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from '@modules/users/typeorm/entities/User';
import Transaction from '@modules/transactions/typeorm/entities/Transaction';

@Entity('accounts')
export default class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal')
  balance: number;

  @OneToOne(() => User, user => user.account)
  user: User;

  @OneToMany(() => Transaction, transaction => transaction.debitedAccount)
  transactionDebited: Transaction;

  @OneToMany(() => Transaction, transaction => transaction.creditedAccount)
  transactionCredited: Transaction;
}
