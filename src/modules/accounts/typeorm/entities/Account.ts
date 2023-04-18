import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from '../../../users/typeorm/entities/User';
import Transaction from '../../../transactions/typeorm/entities/Transaction';
// '@modules/transactions/typeorm/entities/Transaction';

@Entity('accounts')
export default class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal')
  balance: number;

  @OneToOne(() => User, user => user.account)
  user: User;

  @OneToMany(() => Transaction, transaction => transaction.debitedAccount, {
    cascade: true,
  })
  transactionDebited: Transaction;

  @OneToMany(() => Transaction, transaction => transaction.creditedAccount, {
    cascade: true,
  })
  transactionCredited: Transaction;
}
