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

### Opção 2: Desenvolvimento Local

#### 1. Instalar dependências

```bash
npm install
```

#### 2. Configurar banco de dados PostgreSQL

Certifique-se de ter o PostgreSQL rodando e crie um banco de dados:

```sql
CREATE DATABASE teddy_db;
```

#### 3. Configurar variáveis de ambiente

Copie o arquivo `.env.example` para `.env` e configure suas variáveis:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
NODE_ENV=development
PORT=3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=teddy_db

# JWT
JWT_SECRET=super-secret-jwt-key-for-teddy-test-minimum-32-chars
JWT_EXPIRES_IN=1d
```

## 🚀 Executando a aplicação

### Com Makefile (Recomendado) ⭐

```bash
# Iniciar aplicação (mostra logs diretamente)
make run

# Iniciar aplicação em background
make run-bg

# Ver logs em tempo real (se rodando em background)
make logs

# Parar aplicação
make stop

# Rebuildar containers
make build

# Limpar tudo (containers + volumes)
make clean

# Ver status dos containers
make status

# Ver todos os comandos
make help
```

### Com Docker Compose Diretamente

```bash
# Subir todos os serviços
docker-compose up --build

# Executar em background
docker-compose up -d --build

# Ver logs da aplicação
docker-compose logs -f teddy-api

# Parar todos os serviços
docker-compose down
```

### Desenvolvimento Local

```bash
# Executar em modo desenvolvimento
npx nx serve teddy-api

# Build da aplicação
npx nx build teddy-api

# Executar testes
npx nx test teddy-api

# Executar testes E2E
npx nx e2e teddy-api-e2e
```

## 📋 API Endpoints

### Autenticação

#### POST /api/auth/register

Registrar um novo usuário.

**Body:**

```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "Nome do Usuário"
}
```

**Response:**

```json
{
  "accessToken": "jwt_token_here",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "Nome do Usuário"
  }
}
```

#### POST /api/auth/login

Fazer login.

**Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "accessToken": "jwt_token_here",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "Nome do Usuário"
  }
}
```

#### GET /api/auth/profile

Obter perfil do usuário autenticado (requer token JWT).

**Headers:**

```
Authorization: Bearer jwt_token_here
```

**Response:**

```json
{
  "id": 1,
  "email": "user@example.com",
  "name": "Nome do Usuário"
}
```

### CRUD de Usuários (Protegido por JWT)

#### POST /api/users

Criar um novo usuário.

**Headers:**

```
Authorization: Bearer jwt_token_here
```

**Body:**

```json
{
  "email": "newuser@example.com",
  "password": "password123",
  "name": "Novo Usuário"
}
```

#### GET /api/users

Listar todos os usuários ativos.

**Headers:**

```
Authorization: Bearer jwt_token_here
```

#### GET /api/users/:id

Obter usuário por ID.

**Headers:**

```
Authorization: Bearer jwt_token_here
```

#### PATCH /api/users/:id

Atualizar usuário.

**Headers:**

```
Authorization: Bearer jwt_token_here
```

**Body (campos opcionais):**

```json
{
  "email": "newemail@example.com",
  "password": "newpassword123",
  "name": "Novo Nome"
}
```

#### DELETE /api/users/:id

Soft delete de usuário.

**Headers:**

```
Authorization: Bearer jwt_token_here
```

#### GET /api/users/deleted

Listar usuários deletados (soft delete).

**Headers:**

```
Authorization: Bearer jwt_token_here
```

#### POST /api/users/:id/restore

Restaurar usuário deletado.

**Headers:**

```
Authorization: Bearer jwt_token_here
```

## 🔧 Recursos Implementados

- ✅ Monorepo NX configurado
- ✅ Aplicação NestJS com TypeScript
- ✅ Integração com PostgreSQL via TypeORM
- ✅ Validação de variáveis de ambiente com Zod
- ✅ Autenticação JWT com @nestjs/passport
- ✅ Hash de senhas com bcrypt
- ✅ Validação de DTOs com class-validator
- ✅ CORS habilitado
- ✅ Sincronização automática do banco em desenvolvimento

## 🧪 Testando a API

Você pode usar ferramentas como Postman, Insomnia ou curl para testar os endpoints:

```bash
# Registrar usuário
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Perfil (substitua JWT_TOKEN pelo token recebido)
curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer JWT_TOKEN"
```

## 📝 Notas para Entrevista Técnica

Este projeto demonstra:

1. **Arquitetura Monorepo** com NX
2. **Clean Architecture** com separação de responsabilidades
3. **Validação robusta** de dados de entrada e ambiente
4. **Segurança** com JWT e hash de senhas
5. **TypeScript** com tipagem forte
6. **ORM** para abstração do banco de dados
7. **Configuração flexível** via variáveis de ambiente

O projeto está pronto para desenvolvimento e pode ser facilmente estendido com novos módulos e funcionalidades.
