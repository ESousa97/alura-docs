<div align="center">

# Alura Docs

[![CI](https://img.shields.io/github/actions/workflow/status/ESousa97/alura-docs/ci.yml?style=flat&logo=github-actions&logoColor=white)](https://github.com/ESousa97/alura-docs/actions/workflows/ci.yml)
[![Security](https://img.shields.io/github/actions/workflow/status/ESousa97/alura-docs/codeql.yml?style=flat&logo=github&logoColor=white&label=security)](https://github.com/ESousa97/alura-docs/actions/workflows/codeql.yml)
[![CodeFactor](https://img.shields.io/codefactor/grade/github/ESousa97/alura-docs?style=flat&logo=codefactor&logoColor=white)](https://www.codefactor.io/repository/github/esousa97/alura-docs)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat&logo=opensourceinitiative&logoColor=white)](https://opensource.org/licenses/MIT)
[![Status](https://img.shields.io/badge/Status-Archived-lightgrey.svg?style=flat&logo=archive&logoColor=white)](#)

**Aplicação de documentos em tempo real construída com Express e Socket.IO. Permite criar, editar e excluir documentos com sincronização instantânea entre clientes.**

</div>

---

> **⚠️ Projeto Arquivado**
> Este projeto não recebe mais atualizações ou correções. O código permanece disponível como referência e pode ser utilizado livremente sob a licença MIT. Fique à vontade para fazer fork caso deseje continuar o desenvolvimento.

---

## Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Começando](#começando)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação](#instalação)
  - [Configuração](#configuração)
  - [Uso Local](#uso-local)
- [Modo Teste](#modo-teste)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Segurança](#segurança)
- [Contribuição](#contribuição)
- [Licença](#licença)
- [Contato](#contato)

---

## Sobre o Projeto

Alura Docs é uma aplicação de edição colaborativa de documentos em tempo real, construída com Node.js, Express e Socket.IO. O sistema permite que múltiplos usuários criem, editem e excluam documentos simultaneamente, com sincronização instantânea entre todos os clientes conectados.

O repositório implementa:

- **Edição em Tempo Real** — Sincronização instantânea via WebSockets (Socket.IO)
- **Persistência com MongoDB** — Armazenamento confiável de documentos
- **Interface Responsiva** — Frontend estático otimizado
- **Modo Teste** — Execução sem dependências de banco de dados
- **Arquitetura Cliente-Servidor** — Separação clara entre frontend e backend

---

## Funcionalidades

- **Criar Documentos** — Criação dinâmica de novos documentos
- **Edição Colaborativa** — Múltiplos usuários editando simultaneamente
- **Sincronização em Tempo Real** — Mudanças propagadas instantaneamente via WebSockets
- **Excluir Documentos** — Remoção de documentos com confirmação
- **Persistência** — Dados salvos automaticamente no MongoDB
- **Modo Offline** — Opção de execução sem banco de dados para testes

---

## Tecnologias

### Core

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=flat&logo=socketdotio&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)

### Ferramentas de Desenvolvimento

![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat&logo=prettier&logoColor=black)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=github-actions&logoColor=white)

| Categoria | Tecnologia | Descrição |
|-----------|------------|-----------|
| **Runtime** | Node.js 18+ | Plataforma JavaScript para backend |
| **Framework** | Express | Framework web minimalista |
| **WebSocket** | Socket.IO | Comunicação bidirecional em tempo real |
| **Database** | MongoDB | Banco de dados NoSQL para documentos |
| **Frontend** | HTML/CSS/JS | Interface estática responsiva |

**Requisitos mínimos:**

- Node.js 18+ (recomendado)
- npm (latest)
- MongoDB (local ou Atlas)

---

## Começando

### Pré-requisitos

```bash
node --version  # v18 ou superior
npm --version
```

**Banco de dados:**
- MongoDB local instalado, ou
- Conta no MongoDB Atlas (gratuita)

### Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/ESousa97/alura-docs.git
cd alura-docs
```

2. **Instale as dependências**

```bash
npm install
```

### Configuração

Crie um arquivo `.env` na raiz do projeto:

```bash
cp .env.example .env
```

Configure as variáveis de ambiente:

```env
# String de conexão do MongoDB
MONGODB_URI=mongodb://localhost:27017/alura-docs
# ou para MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/alura-docs

# Porta do servidor (padrão: 3000)
PORT=3000

# Ambiente de execução
NODE_ENV=development
```

### Uso Local

**Subir o servidor:**

```bash
npm start
```

Acesse: `http://localhost:3000`

A aplicação estará disponível com sincronização em tempo real funcionando.

---

## Modo Teste

Para executar a aplicação sem conexão com MongoDB (útil para testes ou desenvolvimento):

**Opção 1 - Via variável de ambiente:**

```bash
SKIP_DB=1 npm start
```

**Opção 2 - Via NODE_ENV:**

```bash
NODE_ENV=test npm start
```

**Opção 3 - No arquivo .env:**

```env
SKIP_DB=1
# ou
NODE_ENV=test
```

Neste modo, a aplicação funciona sem persistência, usando apenas memória.

---

## Scripts Disponíveis

```bash
# Iniciar servidor
npm start

# Executar testes
npm test

# Executar lint
npm run lint

# Formatar código automaticamente
npm run format

# Build (se aplicável)
npm run build
```

---

## Estrutura do Projeto

```
alura-docs/
├── .github/
│   └── workflows/
│       ├── ci.yml              # Pipeline de CI
│       └── codeql.yml          # Análise de segurança
├── src/                        # Backend Node.js
│   ├── config/                 # Configurações
│   ├── controllers/            # Controladores
│   ├── models/                 # Modelos MongoDB
│   ├── routes/                 # Rotas Express
│   ├── socket/                 # Handlers Socket.IO
│   └── server.js               # Entrypoint do servidor
├── public/                     # Frontend estático
│   ├── index.html
│   ├── documento.html
│   ├── css/
│   └── js/
├── test/                       # Testes automatizados
├── .env.example                # Exemplo de variáveis de ambiente
├── .gitignore                  # Arquivos ignorados
├── package.json                # Dependências e scripts
└── README.md                   # Este arquivo
```

---

## Segurança

### Boas Práticas Implementadas

- **Variáveis de Ambiente** — Nunca commitar segredos no código
- **Validação de Entrada** — Sanitização de dados do usuário
- **CORS Configurado** — Controle de origens permitidas
- **Análise Automática** — CodeQL e análise de dependências via CI/CD

### Recomendações

- Nunca commite o arquivo `.env`
- Use senhas fortes para MongoDB em produção
- Configure CORS adequadamente para seu domínio
- Mantenha dependências atualizadas

---

## Contribuição

Contribuições são bem-vindas! Para contribuir:

1. **Fork o projeto**
2. **Crie uma branch para sua feature:**
   ```bash
   git checkout -b feature/minha-feature
   ```
3. **Commit suas mudanças:**
   ```bash
   git commit -m "Adiciona nova funcionalidade"
   ```
4. **Push para a branch:**
   ```bash
   git push origin feature/minha-feature
   ```
5. **Abra um Pull Request**

### Diretrizes

- Siga os padrões de código existentes
- Adicione testes para novas funcionalidades
- Atualize a documentação quando necessário
- Reporte bugs através das [Issues](https://github.com/ESousa97/alura-docs/issues)

---

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

```
MIT License - você pode usar, copiar, modificar e distribuir este código.
```

---

## Contato

**José Enoque Costa de Sousa**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/enoque-sousa-bb89aa168/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white)](https://github.com/SousaDev97)
[![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=flat&logo=todoist&logoColor=white)](https://enoquesousa.vercel.app)

**Encontrou um bug?** [Abra uma Issue](https://github.com/ESousa97/alura-docs/issues)  
**Tem uma sugestão?** [Inicie uma Discussion](https://github.com/ESousa97/alura-docs/discussions)  
**Precisa de ajuda?** Entre em contato via LinkedIn

---

<div align="center">

**[⬆ Voltar ao topo](#alura-docs)**

Feito com ❤️ por [José Enoque](https://github.com/SousaDev97)

**Status do Projeto:** Archived — Sem novas atualizações

</div>
