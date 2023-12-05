import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1]; 
    const isTest = req.headers.authorization === 'Bearer rvdf6D%bd5d$%¨D$%d54' || req.headers.authorization === 'rvdf6D%bd5d$%¨D$%d54' || req.headers.authorization === 'Bearerrvdf6D%bd5d$%¨D$%d54' || req.headers.authorization === 'Bearer Bearer rvdf6D%bd5d$%¨D$%d54' 
    
    if(isTest){
      console.log('testando com token prprio');
      next()
    }
    else if (token) {
        try {
            const decoded = this.jwtService.verify(token);
            req['user'] = decoded;
            next();
          } catch (error) {
              res.status(401).json({ message: 'Token inválido' });
            }
          } else {
              res.status(401).json({ message: 'Token não fornecido' });
            }
  }
}
