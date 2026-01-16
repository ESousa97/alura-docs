# Alura Docs

[![CI](https://github.com/ESousa97/alura-docs/actions/workflows/ci.yml/badge.svg)](https://github.com/ESousa97/alura-docs/actions/workflows/ci.yml)
[![CodeQL](https://github.com/ESousa97/alura-docs/actions/workflows/codeql.yml/badge.svg)](https://github.com/ESousa97/alura-docs/actions/workflows/codeql.yml)
[![CodeFactor](https://www.codefactor.io/repository/github/ESousa97/alura-docs/badge)](https://www.codefactor.io/repository/github/ESousa97/alura-docs)

## Visão geral
Aplicação de documentos em tempo real construída com Express e Socket.IO. Permite criar, editar e excluir documentos com sincronização instantânea entre clientes.

## Requisitos
- Node.js 18+
- MongoDB (local ou Atlas)

## Configuração
Crie um arquivo .env com base em [.env.example](.env.example) e ajuste as variáveis:

- MONGODB_URI: string de conexão do MongoDB
- porta: porta do servidor (padrão 3000)

## Execução
```bash
npm install
npm run start
```

Em seguida, acesse http://localhost:3000.

## Modo teste (sem banco)
Para rodar testes ou iniciar sem conexão com MongoDB, defina:

- SKIP_DB=1
ou
- NODE_ENV=test

## Scripts disponíveis
- npm run start
- npm run test
- npm run lint
- npm run format
- npm run build

## Estrutura do projeto
- src/: backend Node.js (Express + Socket.IO)
- public/: frontend estático
- test/: testes automatizados

## Segurança
- Nunca commite segredos. Use variáveis de ambiente.

## Licença
Veja [LICENSE](LICENSE).
