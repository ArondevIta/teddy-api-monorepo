# Teddy Monorepo - NestJS API

Um monorepo simples usando NX com uma API NestJS, PostgreSQL, validação de ambiente com Zod e autenticação JWT.

## 🚀 Stack Tecnológica

- **NX** - Monorepo tooling
- **NestJS** - Framework Node.js
- **PostgreSQL** - Banco de dados
- **TypeORM** - ORM para TypeScript
- **JWT** - Autenticação com @nestjs/passport
- **Zod** - Validação de variáveis de ambiente
- **bcrypt** - Hash de senhas

## 📁 Estrutura do Projeto

```
teddy-test/
├── teddy-api/                 # Aplicação NestJS principal
│   ├── src/
│   │   ├── app/              # Módulo principal da aplicação
│   │   ├── auth/             # Módulo de autenticação JWT
│   │   ├── config/           # Configurações e validação de env
│   │   ├── entities/         # Entidades do banco de dados
│   │   └── main.ts           # Entry point da aplicação
├── teddy-api-e2e/            # Testes end-to-end
├── .env                      # Variáveis de ambiente
└── .env.example              # Exemplo de variáveis de ambiente
```

## 🛠️ Configuração

### Opção 1: Usando Makefile (Mais Fácil) ⭐

```bash
# Iniciar aplicação (banco + API)
make run

# Ver logs da aplicação
make logs

# Parar todos os serviços
make stop

# Ver todos os comandos disponíveis
make help
```

### Opção 2: Usando Docker Compose Diretamente

#### 1. Executar com Docker Compose

```bash
# Subir banco de dados e aplicação
docker-compose up --build
```

Este comando irá:

- Subir o PostgreSQL
- Aguardar o banco estar saudável
- Buildar e executar a aplicação NestJS
- Aplicação estará disponível em http://localhost:3000/api

#### 2. Parar os serviços

```bash
docker-compose down
```

## Recursos Implementados

- ✅ Monorepo NX configurado
- ✅ Aplicação NestJS com TypeScript
- ✅ Integração com PostgreSQL via TypeORM
- ✅ Validação de variáveis de ambiente com Zod
- ✅ Autenticação JWT com @nestjs/passport
- ✅ Hash de senhas com bcrypt
- ✅ Validação de DTOs com class-validator
- ✅ CORS habilitado
- ✅ Sincronização automática do banco em desenvolvimento
