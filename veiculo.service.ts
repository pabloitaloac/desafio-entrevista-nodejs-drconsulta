import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VeiculoEntity } from '../entity/veiculo.entity';
import { EstabelecimentoEntity } from 'src/entity/estabelecimento.entity';


@Injectable()
export class VeiculoService {
  constructor(
    @InjectRepository(VeiculoEntity)
    private readonly veiculoRepository: Repository<VeiculoEntity>,
    @InjectRepository(EstabelecimentoEntity)
    private readonly estabelecimentoRepository: Repository<EstabelecimentoEntity>,
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

  async create(veiculoData: VeiculoEntity, estabelecimentoId: number): Promise<VeiculoEntity> {
    veiculoData.estabelecimento_id = estabelecimentoId
    veiculoData.placa = veiculoData.placa.replace(/[^a-zA-Z0-9]/g, '');
    console.log(veiculoData.placa);  
    
    const placaRegex = /[A-Za-z]{3}[0-9][0-9A-Za-z][0-9]{2}/i;
    if (!placaRegex.test(veiculoData.placa)) {
      throw new BadRequestException('A placa deve ter o formato DDD-NNNN ou DDD-NDNN.');
    }

    const veiculo = this.veiculoRepository.create(veiculoData);

    const savedVeiculo = await this.veiculoRepository.save(veiculo);

    if (veiculoData.tipo === 'moto') {
      await this.atualizarVagasEstabelecimento(estabelecimentoId, 'vagasMoto', 'add');
    } else if (veiculoData.tipo === 'carro') {
      await this.atualizarVagasEstabelecimento(estabelecimentoId, 'vagasCarro', 'add');
    }

    return savedVeiculo;
  }
            private async atualizarVagasEstabelecimento(estabelecimentoId: number, tipoVaga: 'vagasMoto' | 'vagasCarro' | null, option: 'add' | 'remove'): Promise<void> {
              if(!tipoVaga){ throw new NotFoundException(`Tipo de veículo errado / ausente`) }

              const estabelecimento = await this.estabelecimentoRepository.findOne({
                where: { id: estabelecimentoId },
              });
            
              if (!estabelecimento) {
                throw new NotFoundException(`Estabelecimento with ID ${estabelecimentoId} not found`);
              }

              option === 'add' ? (estabelecimento[tipoVaga] += 1) : (estabelecimento[tipoVaga] -= 1);

              await this.estabelecimentoRepository.save(estabelecimento);
            }


  async update(id: number, veiculoData: VeiculoEntity): Promise<VeiculoEntity> {
    const thisVeiculo = await this.findOne(id); 
    veiculoData.id = id
    veiculoData.estabelecimento_id = thisVeiculo.estabelecimento_id

    await this.veiculoRepository.update(id, veiculoData);
    return await this.findOne(id);
  }

async remove(id: number): Promise<void> {
  const veiculoToRemove = await this.veiculoRepository.findOne({
    where: { id: id },
  });

  if (!veiculoToRemove) {
    throw new NotFoundException(`Veiculo with ID ${id} not found`);
  }

  const estabelecimentoId = veiculoToRemove.estabelecimento_id;
  const tipo = veiculoToRemove.tipo === 'moto' ? 'vagasMoto': veiculoToRemove.tipo === 'carro' ? 'vagasCarro': null

  await this.atualizarVagasEstabelecimento(estabelecimentoId, tipo, 'remove');
  await this.veiculoRepository.remove(veiculoToRemove);
}


}
