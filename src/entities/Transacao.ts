import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Conta from './Conta';

@Entity()
export default class Transacao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo: string;

  @CreateDateColumn()
  data: Date;

  @Column()
  valor: number;

  @ManyToOne(() => Conta)
  @JoinColumn({ name: 'id_conta' })
  conta: Conta;
}
