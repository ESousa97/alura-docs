# Alura Docs

![CI](https://img.shields.io/badge/CI-configurar-lightgrey)
![CodeQL](https://img.shields.io/badge/CodeQL-configurar-lightgrey)
![Code%20Quality](https://img.shields.io/badge/Code%20Quality-configurar-lightgrey)
![Security](https://img.shields.io/badge/Security-configurar-lightgrey)

> Atualize os badges acima com o slug real do repositório para refletir o status do CI e CodeQL.

## Visão geral
Aplicação de documentos em tempo real com Express e Socket.IO.

## Requisitos
- Node.js 18+

## Configuração
Crie um arquivo .env com base em [.env.example](.env.example).

## Scripts
- npm run start
- npm run test
- npm run lint
- npm run format
- npm run build

## Execução
```bash
npm install
npm run start
```

## Testes
```bash
npm test
```

## Arquitetura
- src/: backend Node.js
- public/: frontend estático
- test/: testes automatizados

## Segurança
- Nunca commite segredos. Use variáveis de ambiente.

## Licença
Veja [LICENSE](LICENSE).
