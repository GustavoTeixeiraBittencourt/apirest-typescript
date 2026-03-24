# API REST TypeScript com Fastify

### Autor

Gustavo Teixeira Bittencourt de Oliveira

## Descrição

API REST moderna construída com **Fastify**, **TypeScript**, **Prisma** e **PostgreSQL**. Sistema completo de autenticação JWT e gerenciamento de usuários.

## Tecnologias

- **[Fastify](https://www.fastify.io/)** - Framework web de alta performance
- **[TypeScript](https://www.typescriptlang.org/)** - Superset tipado do JavaScript
- **[Prisma](https://www.prisma.io/)** - ORM moderno para Node.js
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional
- **[Zod](https://zod.dev/)** - Validação de schemas TypeScript-first
- **[bcrypt](https://github.com/kelektiv/node.bcrypt.js)** - Hashing de senhas
- **[JWT](https://jwt.io/)** - Autenticação baseada em tokens

## Funcionalidades

- Autenticação com JWT
- Registro e login de usuários
- Controle de acesso baseado em roles (USER/ADMIN)
- Validação de dados com Zod
- Senhas criptografadas com bcrypt
- Documentação automática com Swagger
- Gerenciamento completo de usuários (CRUD)

## Pré-requisitos

- **Node.js** 18+
- **pnpm** 8+
- **PostgreSQL** 14+

## Instalação

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd apirest-typescript
```

### 2. Instale as dependências

```bash
pnpm install
```

### 3. Configure as variáveis de ambiente

Copie o arquivo de exemplo e preencha com suas configurações:

```bash
cp .env.example .env
```

Edite o arquivo `.env`:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
JWT_SECRET="sua_chave_secreta_super_segura_aqui"
PORT=3000
NODE_ENV=development
```

### 4. Configure o banco de dados

```bash
# Gera o Prisma Client
pnpm prisma:generate

# Cria as tabelas no banco de dados
pnpm prisma:migrate

# (Opcional) Abra o Prisma Studio para visualizar os dados
pnpm prisma:studio
```

## Executando o projeto

### Modo desenvolvimento

```bash
pnpm dev
```

Servidor rodará em: http://localhost:3000

### Modo produção

```bash
# Compilar TypeScript
pnpm build

# Executar build
pnpm start
```

## Documentação da API

Acesse a documentação interativa do Swagger:

```
http://localhost:3000/docs
```

## Endpoints

### Autenticação

#### POST `/auth/sign-up`

Registra um novo usuário.

**Body:**

```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123",
  "address": "Rua Exemplo, 123",
  "role": "USER",
  "rg": "12.345.678-9",
  "cpf": "123.456.789-00"
}
```

#### POST `/auth/sign-in`

Faz login e retorna um token JWT.

**Body:**

```json
{
  "email": "joao@email.com",
  "password": "senha123"
}
```

**Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Usuários

> **Nota:** Todas as rotas de usuários requerem autenticação (Header: `Authorization: Bearer <token>`)

#### GET `/users` (ADMIN apenas)

Lista todos os usuários.

#### GET `/users/:id`

Busca usuário por ID.

#### PUT `/users/me`

Atualiza endereço do usuário logado.

**Body:**

```json
{
  "address": "Nova Rua, 456"
}
```

#### PUT `/users/:id` (ADMIN apenas)

Atualiza qualquer usuário.

#### POST `/users` (ADMIN apenas)

Cria um novo usuário.

## Scripts Disponíveis

| Script                 | Descrição                                              |
| ---------------------- | ------------------------------------------------------ |
| `pnpm dev`             | Inicia servidor em modo desenvolvimento com hot-reload |
| `pnpm build`           | Compila TypeScript para JavaScript                     |
| `pnpm start`           | Executa a versão compilada (produção)                  |
| `pnpm prisma:generate` | Gera o Prisma Client                                   |
| `pnpm prisma:migrate`  | Cria/aplica migrations do banco                        |
| `pnpm prisma:studio`   | Abre interface visual do banco de dados                |

## Estrutura do Projeto

```
apirest-typescript/
├── src/
│   ├── @types/          # Definições de tipos TypeScript
│   ├── controllers/     # Lógica de negócio
│   ├── routes/          # Definição de rotas
│   ├── schemas/         # Schemas de validação (Zod)
│   ├── plugins/         # Plugins do Fastify
│   └── app.ts           # Configuração principal do servidor
├── prisma/
│   └── schema.prisma    # Schema do banco de dados
├── .env.example         # Exemplo de variáveis de ambiente
├── .gitignore          # Arquivos ignorados pelo Git
├── package.json        # Dependências e scripts
├── tsconfig.json       # Configuração do TypeScript
└── README.md           # Este arquivo
```

## Segurança

- Senhas são criptografadas com bcrypt (10 salt rounds)
- Tokens JWT para autenticação
- Validação de entrada com Zod
- Proteção contra email duplicado
- Senhas nunca são retornadas nas respostas da API

## Modelo de Dados

### User

| Campo     | Tipo          | Descrição           |
| --------- | ------------- | ------------------- |
| id        | String (UUID) | Identificador único |
| email     | String        | Email (único)       |
| password  | String        | Senha criptografada |
| name      | String?       | Nome completo       |
| address   | String?       | Endereço            |
| role      | String        | Papel (USER/ADMIN)  |
| rg        | String?       | RG                  |
| cpf       | String?       | CPF                 |
| createdAt | DateTime      | Data de criação     |
| updatedAt | DateTime      | Data de atualização |

## Próximas Melhorias

Veja a lista completa de tarefas pendentes em [TAREFAS.md](./TAREFAS.md)

- [ ] Adicionar refresh tokens
- [ ] Implementar rate limiting
- [ ] Configurar CORS
- [ ] Adicionar testes automatizados
- [ ] Melhorar tipagem TypeScript
- [ ] Implementar validação de CPF

---

**Desenvolvido com Fastify + TypeScript**
