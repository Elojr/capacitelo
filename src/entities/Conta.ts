import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Cliente from './Cliente';

@Entity()
export default class Conta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  agencia: string;

  @Column()
  numero: string;

  @Column({ type: 'float' })
  saldo: number;

  @ManyToOne(() => Cliente, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'id_cliente' })
  cliente: Cliente;
}
