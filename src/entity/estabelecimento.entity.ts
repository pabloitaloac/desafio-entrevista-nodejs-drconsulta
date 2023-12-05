import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { VeiculoEntity } from './veiculo.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

@Entity()
export class EstabelecimentoEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;
  
  @Column()
  @ApiProperty()
  @IsNotEmpty()
  @Length(1, 255)
  nome: string;
  
  @Column()
  @ApiProperty()
  @IsNotEmpty()
  @Length(1, 255)
  cnpj: string;
  
  @Column()
  @ApiProperty()
  @IsNotEmpty()
  @Length(1, 255)
  endereco: string;
  
  @Column()
  @ApiProperty()
  @IsNotEmpty()
  @Length(1, 255)
  telefone: string;
  
  @Column({ name: 'vagas_moto' , default: 1 })
  @ApiProperty()
  @IsNotEmpty()
  vagasMoto: number;
  
  @Column({ name: 'vagas_carro', default: 1  })
  @ApiProperty()
  @IsNotEmpty()
  vagasCarro: number;

  @OneToMany(() => VeiculoEntity, (veiculo) => veiculo.estabelecimento)
  veiculos: VeiculoEntity[];
}
