import { Injectable, NotFoundException, BadRequestException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstabelecimentoEntity } from '../entity/estabelecimento.entity';

@Injectable()
export class EstabelecimentoService {
  constructor(
    @InjectRepository(EstabelecimentoEntity)
    private readonly estabelecimentoRepository: Repository<EstabelecimentoEntity>,
  ) {}

  async findAll(): Promise<EstabelecimentoEntity[]> {
    return await this.estabelecimentoRepository.find();
  }

  async findOne(id: number): Promise<EstabelecimentoEntity> {
    const estabelecimento = await this.estabelecimentoRepository.findOne({where:{id:id}});  
    if (!estabelecimento) {
      throw new NotFoundException(`Estabelecimento com ID ${id} não encontrado.`);
    }
    return estabelecimento;
  }

  async create(estabelecimentoData: EstabelecimentoEntity): Promise<EstabelecimentoEntity> {
    estabelecimentoData.cnpj = estabelecimentoData.cnpj.replace(/\D/g, '');
    if (estabelecimentoData.cnpj.length !== 14) {
      throw new BadRequestException('O CNPJ deve conter exatamente 14 números.');
    }
    estabelecimentoData.telefone = estabelecimentoData.telefone.replace(/\D/g, '');
    if (estabelecimentoData.telefone.length !== 11) {
      throw new BadRequestException('O número deve ser no formato (xx)xxxxx-xxxx, ou com a mesma quantidade de dígitos');
    }

    const estabelecimento = this.estabelecimentoRepository.create(estabelecimentoData);
    return await this.estabelecimentoRepository.save(estabelecimento);
  }

  async update(id: number, estabelecimentoData: EstabelecimentoEntity): Promise<EstabelecimentoEntity> {
    await this.findOne(id);  
    await this.estabelecimentoRepository.update(id, estabelecimentoData);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);  
    await this.estabelecimentoRepository.delete(id);
  }
}
