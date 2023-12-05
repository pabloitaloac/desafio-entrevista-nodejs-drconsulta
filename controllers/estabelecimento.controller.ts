import { Controller, Get, Post, Put, Delete, Param, Body , UseGuards } from '@nestjs/common';
import { EstabelecimentoService } from '../services/estabelecimento.service';
import { EstabelecimentoEntity } from '../entity/estabelecimento.entity';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthMiddleware } from 'src/auth/auth.middleware';


@Controller('estabelecimentos')
@UseGuards(AuthMiddleware)
@ApiBearerAuth() 
@ApiTags('estabelecimentos - usar token "rvdf6D%bd5d$%¨D$%d54"') 
export class EstabelecimentoController {
  constructor(private readonly estabelecimentoService: EstabelecimentoService) {}

  @Get()
  @ApiOperation({ summary: 'buscar todos os estabelecimentos' })
  findAll(): Promise<EstabelecimentoEntity[]> {
    return this.estabelecimentoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'buscar estabelecimento específico' })
  findOne(@Param('id') id: string): Promise<EstabelecimentoEntity> {
    return this.estabelecimentoService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'adicionar novo estabelecimento' })
  create(@Body() estabelecimentoData: EstabelecimentoEntity): Promise<EstabelecimentoEntity> {
    return this.estabelecimentoService.create(estabelecimentoData);
  }

  @Put(':id')
  @ApiOperation({ summary: 'modificar estabelecimento específico' })
  update(@Param('id') id: string, @Body() estabelecimentoData: EstabelecimentoEntity): Promise<EstabelecimentoEntity> {
    return this.estabelecimentoService.update(+id, estabelecimentoData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'deletar estabelecimento específico' })
  remove(@Param('id') id: string): Promise<void> {
    return this.estabelecimentoService.remove(+id);
  }
}
