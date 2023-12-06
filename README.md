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
## Funcionalidades:

### estabelecimentos:
- `(GET)/estabelecimentos` = Buscar todos os estabelecimentos
- `(POST) /estabelecimentos` = Criar novo estabelecimento
- `(GET) /estabelecimentos/{id}` = Buscar estabelecimento específico
- `(PUT) /estabelecimentos/{id}` = Atualizar estabelecimento específico
- `(DELETE) /estabelecimentos/{id}` = Remover estabelecimento específico

### Veículos:
- `(GET) /veiculos` = Buscar todos os veículos
- `(POST) /veiculos/{estabelecimento_id}` = Criar novo veículo + atualizar estabelecimento correspondente
- `(GET) /veiculos/{id}` = Buscar veículo específico
- `(PUT) /veiculos/{id}` = Atualizar veículo específico
- `(DELETE) /veiculos/{id}` = Remover veículo específico + atualizar estabelecimento correspondente
