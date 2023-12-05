import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VeiculoEntity } from '../entity/veiculo.entity';

@Injectable()
export class VeiculoService {
  constructor(
    @InjectRepository(VeiculoEntity)
    private readonly veiculoRepository: Repository<VeiculoEntity>,
  ) {}

  async findAll(): Promise<VeiculoEntity[]> {
    return await this.veiculoRepository.find();
  }

  async findOne(id: number): Promise<VeiculoEntity> {
    const veiculo = await this.veiculoRepository.findOne({where:{id:id}});  
    if (!veiculo) {
      throw new NotFoundException(`Veículo com ID ${id} não encontrado.`);
    }
    return veiculo;
  }

  async create(veiculoData: VeiculoEntity): Promise<VeiculoEntity> {
    veiculoData.placa = veiculoData.placa.replace(/[^a-zA-Z0-9]/g, '');
    console.log(veiculoData.placa);  
    
    const placaRegex = /[A-Za-z]{3}[0-9][0-9A-Za-z][0-9]{2}/i;
    if (!placaRegex.test(veiculoData.placa)) {
      throw new BadRequestException('A placa deve ter o formato DDD-NNNN ou DDD-NDNN.');
    }

    const veiculo = this.veiculoRepository.create(veiculoData);
    return await this.veiculoRepository.save(veiculo);
  }

  async update(id: number, veiculoData: VeiculoEntity): Promise<VeiculoEntity> {
    await this.findOne(id); 
    await this.veiculoRepository.update(id, veiculoData);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id); 
    await this.veiculoRepository.delete(id);
  }


}
