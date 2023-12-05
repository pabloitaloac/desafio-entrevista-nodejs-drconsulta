import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { VeiculoService } from '../services/veiculo.service';
import { VeiculoEntity } from '../entity/veiculo.entity';
import { ApiBearerAuth, ApiTags , ApiOperation } from '@nestjs/swagger';
import { AuthMiddleware } from 'src/auth/auth.middleware';


@UseGuards(AuthMiddleware)
@Controller('veiculos')
@ApiBearerAuth() 
@ApiTags('veiculos - usar token "rvdf6D%bd5d$%¨D$%d54"') 
export class VeiculoController {
  constructor(private readonly veiculoService: VeiculoService) {}

  @Get()
  @ApiOperation({ summary: 'buscar todos os veiculos' })
  findAll(): Promise<VeiculoEntity[]> {
    return this.veiculoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'buscar veiculo específico' })
  findOne(@Param('id') id: string): Promise<VeiculoEntity> {
    return this.veiculoService.findOne(+id);
  }

  @Post(':estabelecimento_id')
  adicionarVeiculo(@Body() veiculo: VeiculoEntity, @Param('estabelecimento_id') estabelecimentoId: number) {
    return this.veiculoService.create(veiculo, estabelecimentoId);
  }
 
  @Put(':id')
  @ApiOperation({ summary: 'modificar veiculo específico' })
  update(@Param('id') id: string, @Body() veiculoData: VeiculoEntity): Promise<VeiculoEntity> {
    return this.veiculoService.update(+id, veiculoData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'deletar veiculo específico' })
  remove(@Param('id') id: string): Promise<void> {
    return this.veiculoService.remove(+id);
  }
}
