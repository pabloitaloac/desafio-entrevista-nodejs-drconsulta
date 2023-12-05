# Estacionamento API

Este projeto é uma API REST para gerenciar um estacionamento de carros e motos. Foi desenvolvido utilizando o framework NestJS com TypeOrm para a ORM, MySQL como banco de dados e Swagger para documentação da API.

## Tecnologias Utilizadas

- **NestJS:** Framework Node.js para construção de aplicativos eficientes, escaláveis e de fácil manutenção.
- **TypeOrm:** ORM (Object-Relational Mapping) para TypeScript e JavaScript.
- **MySQL:** Banco de dados relacional utilizado para persistência dos dados.
- **Swagger:** Ferramenta para documentação da API.


## Estrutura do Projeto

- `src/` : Pasta principal do código-fonte.
  - `controllers/`: Contém os controladores que manipulam as requisições HTTP.
  - `services/`: Serviços que encapsulam a lógica de negócios.
  - `auth/`: Middlewares de autenticação utilizados na aplicação.
  - `app.module.ts`: Módulo principal da aplicação.
  - `main.ts`: Ponto de entrada da aplicação.

## Configuração

### Configuração do Banco de Dados:

- Certifique-se de ter o MySQL instalado e em execução.
- Faça login no MySQL, utilizando suas próprias credenciais "root" pelo Command Line Client:
- Crie um banco de dados com o nome "estacionamento":
```bash
CREATE DATABASE IF NOT EXISTS estacionamento;
```
- Crie um usuário "estacionamento_user_dev" com uma senha "abcdefgh":
```bash
CREATE USER 'estacionamento_user_dev'@'localhost' IDENTIFIED BY 'abcdefgh';
```
- Garanta os privilégios para o usuário:
```bash
GRANT ALL PRIVILEGES ON estacionamento.* TO 'estacionamento_user_dev'@'localhost';
```
- Dê flush para atualizar os privilégios:
```bash
FLUSH PRIVILEGES;
``` 




### Instalação de Dependências

```bash
npm install
```

### Execução da Aplicação

```bash
npm run start:dev
```

## Acesse a documentação Swagger em http://localhost:3000/api.
## Utilizar o token abaixo para autenticar as rotas necessárias
```bash
rvdf6D%bd5d$%¨D$%d54
```
