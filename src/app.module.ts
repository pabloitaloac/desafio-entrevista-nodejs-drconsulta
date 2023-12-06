import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstabelecimentoEntity } from './entity/estabelecimento.entity';
import { VeiculoEntity } from './entity/veiculo.entity';
import { EstabelecimentoController } from './controllers/estabelecimento.controller';
import { VeiculoController } from './controllers/veiculo.controller';
import { EstabelecimentoService } from './services/estabelecimento.service';
import { VeiculoService } from './services/veiculo.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy'; 
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AuthMiddleware } from './auth/auth.middleware';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '193.203.182.143',
      port: 3306,
      username: 'estacionamento_user_dev',
      password: 'abcdefgh',
      database: 'estacionamento',
      entities: [EstabelecimentoEntity, VeiculoEntity],
      synchronize: true,
    }), 
    TypeOrmModule.forFeature([EstabelecimentoEntity, VeiculoEntity]),
    JwtModule.register({
      secret: 'abcdefg123456789@@@',  
      signOptions: { expiresIn: '1h' }, 
    }),
  ],
  controllers: [AppController, EstabelecimentoController, VeiculoController],
  providers: [AppService, EstabelecimentoService, VeiculoService, 
    JwtStrategy
  ],
})


export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('/estabelecimentos', '/veiculos')    
    
  }
}
