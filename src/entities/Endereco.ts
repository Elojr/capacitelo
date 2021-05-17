import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import Empresa from './Empresa';

@Entity()
export default class Endereco {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cep: string;

  @Column()
  rua: string;

  @Column()
  cidade: string;

  @Column()
  estado: string;

  @Column({ nullable: true })
  complemento: string;

  @OneToOne(() => Empresa, (empresa) => empresa.endereco)
  empresa: Empresa;
}
