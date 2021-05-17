import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import Empresa from './Empresa';
import Endereco from './Endereco';

@Entity()
export default class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  cpf: string;

  @Column({ nullable: true })
  telefone: string;

  @ManyToOne(() => Empresa)
  @JoinColumn({ name: 'id_empresa' })
  empresa: Empresa;

  @ManyToMany(() => Endereco)
  @JoinTable({ name: 'cliente_endereco' })
  enderecos: Endereco[];
}
