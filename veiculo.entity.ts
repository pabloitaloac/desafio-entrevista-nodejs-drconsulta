import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { EstabelecimentoEntity } from './estabelecimento.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty , Length} from 'class-validator';


@Entity()
export class VeiculoEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  @IsNotEmpty()
  id: number;
  
  @Column()
  @ApiProperty()
  @IsNotEmpty()
  @Length(1, 255)
  marca: string;
  
  @Column()
  @ApiProperty()
  @IsNotEmpty()
  @Length(1, 255)
  modelo: string;
  
  @Column()
  @ApiProperty()
  @IsNotEmpty()
  @Length(1, 255)
  cor: string;
  
  @Column()
  @ApiProperty()
  @IsNotEmpty()
  @Length(1, 255)
  placa: string;
  
  @Column()
  @ApiProperty()
  @IsNotEmpty()
  @Length(1, 255)
  tipo: string;

  @Column({ name: 'estabelecimento_id', default: 1  })
  @ApiProperty()
  @IsNotEmpty()
  estabelecimento_id: number;


  

  @ManyToOne(() => EstabelecimentoEntity, (estabelecimento) => estabelecimento.veiculos)
  estabelecimento: EstabelecimentoEntity;
}
