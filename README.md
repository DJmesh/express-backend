# Black Box Backend

Este projeto é uma estrutura base para uma API utilizando **Express**, **MongoDB**, **JWT** e **Swagger**, organizada de forma modular e escalável.

## Estrutura do Projeto
```bash
bblack_box/
├── config/
│   └── config.json       // Configurações do banco para o Sequelize CLI
├── migrations/           // Arquivos de migração (ex.: criação da tabela "users")
├── seeders/              // Arquivos de seed (ex.: inserção do superusuário)
├── src/
│   ├── app.js            // Configuração da aplicação Express (middlewares, rotas, etc.)
│   ├── server.js         // Inicialização do servidor
│   ├── config/
│   │   ├── db.js         // Conexão com PostgreSQL via Sequelize
│   │   ├── env.js        // Carrega variáveis de ambiente (dotenv)
│   │   └── swagger.js    // Configuração do Swagger
│   ├── imports/          // (Opcional) Arquivo "barrel" para centralizar exports
│   │   └── index.js
│   ├── middleware/
│   │   ├── auth.js       // Middleware de autenticação JWT
│   │   └── errorHandler.js  // Middleware para tratamento global de erros
│   ├── models/           // Modelos do Sequelize
│   │   ├── index.js      // Inicializa e agrega os modelos
│   │   └── user.js       // Modelo "User"
│   ├── modules/          // Módulos por domínio/feature
│   │   ├── auth/
│   │   │   ├── auth.controller.js
│   │   │   └── auth.routes.js
│   │   ├── admin/
│   │   │   ├── admin.controller.js
│   │   │   └── admin.routes.js
│   │   └── user/
│   │       ├── user.controller.js
│   │       └── user.routes.js
│   └── utils/
│       └── logger.js     // Funções auxiliares, ex.: para logging
├── .env                  // Variáveis de ambiente (ex.: PG_URI, JWT_SECRET, PORT)
├── .gitignore            // Arquivos/pastas a serem ignorados pelo Git
└── package.json          // Dependências e scripts (start, dev, db:migrate, db:seed, etc.)
```

###  Diagrama de Fluxo de Dados (Mermaid)

erDiagram
    USER ||--o{ INCIDENT : "possui"
    INCIDENT ||--|{ INCIDENT_IMAGE : "tem"
    INCIDENT }|--|| LOCATION : "ocorre em"

    USER {
        int id PK
        string nome
        string email
        string senha
        enum role
        string birthdate
        string cpf
        string cep
        string address
        string bairro
        string localidade
        string uf
    }

    INCIDENT {
        int id PK
        string title
        int userId FK
        int locationId FK
    }

    INCIDENT_IMAGE {
        int id PK
        string url
        int incidentId FK
    }

    LOCATION {
        int id PK
        string nome
        string cidade
        string estado
        string pais
    }


### Diagrama da Estrutura do Projeto (Mermaid)

graph TD
  A[bbBlack_Box] --> B[config/]
  B --> B1[config.json]
  B --> B2[migrations/]
  B --> B3[seeders/]

  A --> C[src/]
  C --> C1[app.js]
  C --> C2[server.js]
  C --> C3[config/]
  C3 --> C4[db.js]
  C3 --> C5[env.js]
  C3 --> C6[swagger.js]
  C3 --> C7[imports/index.js]

  C --> D[middleware/]
  D --> D1[auth.js]
  D --> D2[errorHandler.js]

  C --> E[models/]
  E --> E1[index.js]
  E --> E2[user.js]
  E --> E3[incident.js]
  E --> E4[incidentImage.js]
  E --> E5[location.js]

  C --> F[modules/]
  F --> F1[auth/]
  F1 --> F1a[auth.controller.js]
  F1 --> F1b[auth.routes.js]
  F --> F2[user/]
  F2 --> F2a[user.controller.js]
  F2 --> F2b[user.routes.js]

  C --> G[utils/]

  A --> H[.env]
  A --> I[.gitignore]
  A --> J[package.json]

##  Arquitetura do Projeto (MVC)

Este projeto segue a arquitetura **MVC (Model-View-Controller)**, separando responsabilidades para manter o código limpo e escalável:

- **Models**: Definem a estrutura dos dados e as associações no banco de dados, usando Sequelize.
- **Controllers**: Contêm a lógica de negócio e controlam o fluxo das requisições.
- **Routes (Views)**: Definem os endpoints disponíveis na API e direcionam as requisições para os controllers.

Essa separação permite:
- Manutenção facilitada
- Reutilização de código
- Testabilidade
- Escalabilidade

Além disso, o projeto conta com middlewares reutilizáveis, Swagger para documentação da API, seeders/migrations organizados, e variáveis de ambiente via dotenv.


### Principais Pastas e Arquivos

- **config/** (na raiz):  
  - **config.json**: Configurações do banco de dados para o **Sequelize CLI**.
- **migrations/**: Arquivos de migração do banco (por exemplo, criação da tabela `users`).
- **seeders/**: Arquivos de seed (por exemplo, criação de um superusuário).
- **src/app.js**: Configura a aplicação Express, aplica middlewares (CORS, JSON, etc.) e registra rotas dos módulos.
- **src/server.js**: Inicializa o servidor na porta configurada em `.env` ou usa a 3000 como padrão.
- **src/config/db.js**: Configuração e conexão com o PostgreSQL via Sequelize.
- **src/config/env.js**: Carrega variáveis de ambiente usando **dotenv**.
- **src/config/swagger.js**: Configuração do Swagger para documentar a API em `/api-docs`.
- **src/models/**: Modelos do Sequelize e o arquivo `index.js` que faz o "bootstrapping" dos modelos.
- **src/modules/**: Cada módulo (por exemplo, `auth`, `admin`, `user`) contém seu próprio controller e rotas.
- **.env**: Variáveis de ambiente (PORT, PG_URI, JWT_SECRET, etc.).
- **package.json**: Lista de dependências, scripts de migração, seeds e execução do servidor.

---

## Instalação e Configuração

1. **Clonar o repositório**.
2. **Instalar dependências**:
```bash
   npm install
```
3. **Configurar variáveis de ambiente** no arquivo `.env`, por exemplo:
 ```bash
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/seu-banco
    JWT_SECRET=sua_chave_secreta
```

4. **Criar banco de dados** e usuário no PostgreSQL, caso ainda não existam:
```sql
CREATE DATABASE black_box;
CREATE USER admin WITH PASSWORD 'admin';
GRANT ALL PRIVILEGES ON DATABASE black_box TO admin;
```

5. **Scripts Importantes (package.json)**

**npm start**
 ```bash
    npm start
```
Executa node src/server.js, iniciando o servidor na porta definida em .env ou 3000.

**npm run dev**
 ```bash
    npm run dev
```
Executa o servidor com nodemon, reiniciando automaticamente a cada alteração de código. Ideal para desenvolvimento.

**npm run db:migrate**
 ```bash
    npm run db:migrate
```
Executa npx sequelize db:migrate, aplicando todas as migrações pendentes. É o equivalente a “migrate” no Django.

**npm run db:seed**
 ```bash
    npm run db:seed
```
Executa npx sequelize db:seed:all, rodando todos os arquivos de seeders (por exemplo, criando um superusuário).

**npm run db:rollback**
 ```bash
    npm run db:rollback
```
Executa npx sequelize db:migrate:undo, revertendo a última migração aplicada.

6. **Fluxo de Migrações e Seeds (Estilo Django)**

No Node.js com Sequelize, podemos criar e executar migrações usando o Sequelize CLI, de forma semelhante ao makemigrations e migrate do Django.

Instalar o Sequelize CLI (caso ainda não esteja no projeto):

 ```bash
    npm install --save-dev sequelize-cli
```

7. **Executando e Testando**

1. Execute as migrações para criar as tabelas:
 ```bash
    npm run db:migrate
```

2. Rode os seeders para criar o superusuário:
 ```bash
    npm run db:seed
```

3. Inicie o servidor:
 ```bash
    npm start
```
ou, em modo de desenvolvimento (com reinicialização automática):
 ```bash
    npm run dev
```

4. **Acesse a documentação Swagger em:
 ```bash
    http://localhost:3000/api-docs
```

8. **Autenticação e Login**
Endpoint de Login: **POST /api/auth/login**
Envie no corpo da requisição:
 ```bash
{
   "email": "admin@blackbox.com",
   "senha": "admin"
}
```

Endpoint de Cadastro: **POST /api/auth/register**
Cria um novo usuário com nome, email e senha. Exemplo:
 ```bash
{
  "nome": "Fulano",
  "email": "fulano@example.com",
  "senha": "minhaSenhaSegura"
}
```
Exemplo de Rota Protegida: 
**GET /api/user/profile**
É necessário enviar o token no cabeçalho Authorization. Se o token for válido, retorna as informações do perfil.

---

## Observações
**Banco de Dados:** Certifique-se de que o PostgreSQL esteja rodando e que o arquivo .env aponte para as credenciais corretas (PG_URI).
**JWT Secret:** Recomenda-se gerar uma chave segura e não versioná-la em repositórios públicos.

## Licença
Este projeto está sob a licença MIT.