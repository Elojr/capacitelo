import {
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  Entity,
  JoinColumn,
} from 'typeorm';
import Endereco from './Endereco';

@Entity()
export default class Empresa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  cnpj: string;

  @OneToOne(() => Endereco, (endereco) => endereco.empresa)
  @JoinColumn({ name: 'id_endereco' })
  endereco: Endereco;
}
