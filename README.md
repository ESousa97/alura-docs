# AluraDocs: Arquitetura de Comunicação em Tempo Real com WebSockets

**Sincronizando a Colaboração: Uma Análise Profunda da Persistência e Comunicação Bidirecional em Tempo Real.**

---

## Abstract (Resumo Técnico)

Este projeto, **AluraDocs**, implementa uma plataforma de edição de documentos textuais colaborativa e em tempo real, servindo como um estudo de caso aprofundado sobre a aplicação de arquiteturas orientadas a eventos e comunicação full-duplex na web. O problema central abordado é a latência e a complexidade inerentes aos modelos tradicionais de requisição-resposta (HTTP) para aplicações que exigem sincronização de estado instantânea entre múltiplos clientes.

A solução proposta é uma aplicação web de página única (SPA) com um backend em Node.js que utiliza o protocolo WebSocket, por meio da biblioteca Socket.IO, para estabelecer canais de comunicação persistentes e bidirecionais. A metodologia emprega uma arquitetura desacoplada, com um servidor Express para servir os ativos estáticos, um servidor Socket.IO para orquestrar a lógica de comunicação em tempo real e um banco de dados NoSQL (MongoDB) para garantir a persistência do estado dos documentos.

## Badges Abrangentes

![Linguagem Principal](https://img.shields.io/github/languages/top/ESousa97/alura-docs?style=for-the-badge&logo=javascript&logoColor=white)
![Tamanho do Repositório](https://img.shields.io/github/repo-size/ESousa97/alura-docs?style=for-the-badge&label=Tamanho)
![Último Commit](https://img.shields.io/github/last-commit/ESousa97/alura-docs?style=for-the-badge&logo=git&label=Último%20Commit)
![Issues Abertas](https://img.shields.io/github/issues/ESousa97/alura-docs?style=for-the-badge&logo=github&label=Issues)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)

## Sumário (Table of Contents)

1. [Introdução e Motivação](#introdução-e-motivação)
2. [Arquitetura do Sistema](#arquitetura-do-sistema)
3. [Decisões de Design Chave](#decisões-de-design-chave)
4. [✨ Funcionalidades Detalhadas (com Casos de Uso)](#-funcionalidades-detalhadas-com-casos-de-uso)
5. [🛠️ Tech Stack Detalhado](#️-tech-stack-detalhado)
6. [📂 Estrutura Detalhada do Código-Fonte](#-estrutura-detalhada-do-código-fonte)
7. [📋 Pré-requisitos Avançados](#-pré-requisitos-avançados)
8. [🚀 Guia de Instalação e Configuração Avançada](#-guia-de-instalação-e-configuração-avançada)
9. [⚙️ Uso Avançado e Exemplos](#️-uso-avançado-e-exemplos)
10. [🔧 API Reference (Eventos Socket.IO)](#-api-reference-eventos-socketio)
11. [🧪 Estratégia de Testes e Qualidade de Código](#-estratégia-de-testes-e-qualidade-de-código)
12. [🚢 Deployment Detalhado e Escalabilidade](#-deployment-detalhado-e-escalabilidade)
13. [❓ FAQ (Perguntas Frequentes)](#-faq-perguntas-frequentes)
14. [📜 Licença e Aspectos Legais](#-licença-e-aspectos-legais)
15. [📞 Contato](#-contato)

## Introdução e Motivação

A web contemporânea evoluiu para além de um repositório de documentos estáticos, demandando interatividade e reatividade que o modelo clássico de requisição-resposta do HTTP não consegue suprir eficientemente. Aplicações como dashboards de monitoramento, chats, jogos online e, notavelmente, editores de texto colaborativos, exigem um fluxo de dados contínuo e de baixa latência entre o servidor e múltiplos clientes.

O protocolo WebSocket emerge como a solução canônica para este desafio, estabelecendo uma conexão full-duplex única e persistente sobre uma conexão TCP, permitindo que o servidor e o cliente enviem dados um ao outro a qualquer momento. O projeto **AluraDocs** foi concebido como uma exploração prática e didática desta tecnologia, fornecendo um exemplo concreto e funcional que aborda os principais desafios da colaboração em tempo real.

> **Demonstração interativa:** O GIF acima mostra a edição colaborativa em tempo real, criação de documentos e sincronização instantânea entre múltiplos usuários.

## Arquitetura do Sistema

A arquitetura do AluraDocs é baseada no padrão Cliente-Servidor, com uma clara separação de responsabilidades entre o frontend, o backend e a camada de persistência. A comunicação em tempo real é o pilar central que conecta esses componentes.

```mermaid
graph TD
    subgraph "Cliente (Navegador Web)"
        direction LR
        A[index.html / documento.html] -- Interação do Usuário --> B{Lógica de UI (index.js / documento.js)};
        B -- Emite/Recebe Eventos --> C[Módulo Socket (socket-front-*.js)];
    end

    subgraph "Servidor (Node.js)"
        direction LR
        E[Servidor HTTP (Express)] -- Serve Arquivos Estáticos --> A;
        F[Servidor Socket.IO] -- Conexão WebSocket --> C;
        F -- Orquestra Eventos --> G{Lógica de Negócio (socket-back.js)};
        G -- Solicita/Persiste Dados --> H[Camada de Acesso a Dados (documentosDb.js)];
    end

    subgraph "Banco de Dados"
        I[MongoDB Atlas]
    end

    C <--> F;
    H -- Conexão --> I;

    style A fill:#f9f,stroke:#333,stroke-width:2px
    style I fill:#9f9,stroke:#333,stroke-width:2px
    style F fill:#ccf,stroke:#333,stroke-width:2px
```

**Componentes Detalhados:**

**Cliente (Navegador Web):**
- **Interface do Usuário:** `index.html` para listagem/criação e `documento.html` para edição
- **Lógica de UI:** `index.js` e `documento.js` gerenciam DOM e eventos do usuário
- **Módulo Socket:** `socket-front-*.js` encapsulam toda interação com Socket.IO

**Servidor (Node.js):**
- **Servidor HTTP (Express):** Serve arquivos estáticos da pasta `public`
- **Servidor Socket.IO:** Gerencia conexões WebSocket e comunicação em tempo real
- **Lógica de Negócio:** `socket-back.js` orquestra eventos e regras de negócio
- **Camada de Acesso a Dados:** `documentosDb.js` abstrai operações com MongoDB

## Decisões de Design Chave

1. **Socket.IO sobre WebSockets Nativos:** Abstração robusta com reconexão automática, detecção de desconexão, fallbacks e sistema de Salas (Rooms) para organização eficiente.

2. **Uso Estratégico de Salas (Rooms):** Decisão crucial para escalabilidade. Clientes são agrupados por documento (`socket.join(nomeDocumento)`), garantindo que atualizações sejam enviadas apenas para usuários relevantes.

3. **Arquitetura Orientada a Eventos:** Sistema opera com eventos nomeados (ex: `selecionar_documento`, `texto_editor`), criando baixo acoplamento entre cliente e servidor.

4. **Camada de Acesso a Dados Abstrata:** `documentosDb.js` isola lógica de negócio dos detalhes do MongoDB, facilitando manutenção e possíveis migrações.

5. **Callbacks de Confirmação (Acknowledgements):** Em operações críticas, clientes recebem confirmação atômica do servidor antes de prosseguir.

## ✨ Funcionalidades Detalhadas (com Casos de Uso)

### 1. Listagem e Criação de Documentos

**Propósito:** Gerenciamento central de documentos com interface intuitiva e atualizações em tempo real.

**Caso de Uso:** Usuário acessa aplicação, visualiza lista de documentos existentes, cria "Relatório Trimestral" que aparece instantaneamente para todos os usuários conectados.

### 2. Edição Colaborativa em Tempo Real

**Propósito:** Múltiplos usuários editam simultaneamente o mesmo documento com sincronização instantânea.

**Caso de Uso:** 
1. Usuários A e B abrem documento "Relatório Trimestral"
2. Ambos entram na sala do documento automaticamente
3. Usuário A digita "Introdução" - cada tecla é transmitida via `texto_editor`
4. Usuário B vê texto aparecer em tempo real em seu editor

### 3. Exclusão de Documentos

**Propósito:** Remoção segura de documentos com notificação global instantânea.

**Caso de Uso:** Usuário exclui documento "Rascunho" da página de edição, todos os usuários na página inicial veem o documento desaparecer da lista automaticamente.

## 🛠️ Tech Stack Detalhado

| Categoria | Tecnologia | Versão | Propósito no Projeto | Justificativa da Escolha |
| :--- | :--- | :--- | :--- | :--- |
| **Backend** | **Node.js** | >= 16.x | Ambiente de execução do servidor | Plataforma assíncrona ideal para aplicações I/O-bound como WebSockets |
| **Backend** | **Express** | `^4.19.2` | Framework web para servidor HTTP | Minimalista e eficiente para servir arquivos estáticos |
| **Backend** | **Socket.IO** | `^4.7.5` | Biblioteca de comunicação em tempo real | Abstrai complexidade dos WebSockets com recursos avançados |
| **Database** | **MongoDB** | `6.8` | Banco NoSQL para persistência | Flexibilidade para armazenar conteúdo textual variável |
| **Frontend** | **HTML5 / CSS3** | N/A | Estrutura e estilização da interface | Padrões web fundamentais para UI responsiva |
| **Frontend** | **JavaScript (ESM)** | N/A | Lógica de cliente e interatividade | Módulos ES para organização moderna e modular |
| **Frontend** | **Bootstrap** | `5.2.2` | Framework CSS responsivo | Componentes pré-estilizados via CDN |
| **DevOps** | **Nodemon** | `^2.0.22` | Ferramenta de desenvolvimento | Auto-restart do servidor durante desenvolvimento |

## 📂 Estrutura Detalhada do Código-Fonte

```
alura-docs-main/
├── .gitignore                    # Arquivos ignorados pelo Git
├── package.json                  # Metadados e dependências do projeto
├── package-lock.json             # Versões exatas das dependências
├── public/                       # Ativos estáticos do cliente
│   ├── demo.gif                  # GIF de demonstração do projeto
│   ├── documento.html            # UI da página de edição
│   ├── documento.js              # Lógica UI para edição
│   ├── index.html                # UI da página principal
│   ├── index.js                  # Lógica UI para listagem
│   ├── socket-front-documento.js # Socket.IO para página de edição
│   └── socket-front-index.js     # Socket.IO para página principal
└── src/                          # Código-fonte do servidor
    ├── dbConnect.js              # Conexão com MongoDB
    ├── documentosDb.js           # Camada de Acesso a Dados (DAL)
    ├── servidor.js               # Configuração servidor HTTP/Socket.IO
    └── socket-back.js            # Lógica central de eventos Socket.IO
```

## 📋 Pré-requisitos Avançados

Para executar este projeto localmente:

- **Node.js**: Versão LTS (18.x ou superior)
- **NPM**: Instalado com Node.js
- **MongoDB Atlas**: Conta e string de conexão (ou MongoDB local)
- **Editor de Código**: Recomenda-se Visual Studio Code com extensões:
  - ES6 String HTML
  - Live Server (para desenvolvimento)
  - MongoDB for VS Code

## 🚀 Guia de Instalação e Configuração Avançada

1. **Clonar o Repositório:**
```bash
git clone https://github.com/ESousa97/alura-docs.git
cd alura-docs-main
```

2. **Instalar Dependências:**
```bash
npm install
```

3. **Configurar Banco de Dados (Recomendado):**
Crie arquivo `.env` na raiz:
```env
DB_CONNECTION_STRING="mongodb+srv://<user>:<password>@cluster.mongodb.net/<database>?retryWrites=true&w=majority"
PORT=3000
```

4. **Executar em Modo Desenvolvimento:**
```bash
npm run dev
```

5. **Acessar a Aplicação:**
Abra [http://localhost:3000](http://localhost:3000)

### Scripts Disponíveis
```bash
npm run dev        # Servidor desenvolvimento com Nodemon
npm start          # Servidor produção
npm test           # Executa testes (a implementar)
```

## ⚙️ Uso Avançado e Exemplos

**Padrão de Callbacks de Confirmação (Acknowledgements):**

```javascript
// Cliente (socket-front-documento.js)
function selecionarDocumento(nome) {
  socket.emit("selecionar_documento", nome, (texto) => {
    atualizaTextoEditor(texto); // Executa APENAS após resposta do servidor
  });
}

// Servidor (socket-back.js)
socket.on("selecionar_documento", async (nomeDocumento, devolverTexto) => {
  const documento = await encontrarDocumento(nomeDocumento);
  if (documento) {
    devolverTexto(documento.texto); // Invoca callback com dados
  }
});
```

**Gerenciamento de Salas para Eficiência:**

```javascript
// Usuários entram na sala do documento
socket.join(nomeDocumento);

// Atualizações são enviadas apenas para a sala específica
socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
```

## 🔧 API Reference (Eventos Socket.IO)

| Evento | Direção | Payload | Descrição |
| :--- | :--- | :--- | :--- |
| `obter_documentos` | C → S | `(callback)` | Solicita lista de todos os documentos |
| `adicionar_documento` | C → S | `nome: string` | Solicita criação de novo documento |
| `adicionar_documento_interface` | S → C | `nome: string` | Notifica criação para todos os clientes |
| `documento_existente` | S → C | `nome: string` | Informa que documento já existe |
| `selecionar_documento` | C → S | `nome: string, callback(texto)` | Entra na sala do documento |
| `texto_editor` | C → S | `{ texto: string, nomeDocumento: string }` | Envia conteúdo atualizado |
| `texto_editor_clientes` | S → C | `texto: string` | Retransmite texto para sala |
| `excluir_documento` | C → S | `nome: string` | Solicita exclusão de documento |
| `excluir_documento_sucesso` | S → C | `nome: string` | Confirma exclusão para todos |

## 🧪 Estratégia de Testes e Qualidade de Código

**Qualidade Atual:**
- Código organizado em módulos bem definidos
- Separação clara entre frontend e backend
- Uso de padrões modernos (ESM, async/await)

**Melhorias Futuras:**
- **Testes Unitários:** Jest + `mongodb-memory-server` para testar DAL
- **Testes de Integração:** Jest + `socket.io-client` para testar eventos
- **Linting:** ESLint + Prettier para consistência de código
- **CI/CD:** GitHub Actions para testes automatizados

## 🚢 Deployment Detalhado e Escalabilidade

**Plataformas Recomendadas:**
- **Heroku:** Deploy simples via Git, gerenciamento automático de infraestrutura
- **Railway:** Excelente para aplicações Node.js com WebSockets
- **DigitalOcean App Platform:** Escalabilidade e controle de custos

**Configuração para Produção:**
1. **Variáveis de Ambiente:** Migrar string de conexão e configurações sensíveis
2. **HTTPS:** Essencial para WebSockets em produção
3. **Monitoramento:** Implementar logs e métricas de performance

**Escalabilidade Horizontal:**
- **Adaptador Redis:** `socket.io-redis-adapter` para comunicação entre instâncias
- **Load Balancer:** Configuração sticky sessions para WebSockets
- **CDN:** Cache de arquivos estáticos

## ❓ FAQ (Perguntas Frequentes)

**P: Por que a aplicação não funciona abrindo o arquivo HTML diretamente?**
**R:** A aplicação depende de um servidor Node.js para executar Socket.IO e servir arquivos. Use `npm run dev` e acesse via `http://localhost:3000`.

**P: Posso usar este projeto em produção?**
**R:** No estado atual é primariamente didático. Para produção, implemente: autenticação, testes automatizados, configuração segura de variáveis e monitoramento.

**P: Como alterar a porta do servidor?**
**R:** Modifique a variável `porta` em `src/servidor.js` ou use variável de ambiente `PORT`.

**P: É possível usar outro banco de dados?**
**R:** Sim! Modifique apenas `src/documentosDb.js` mantendo a mesma interface. A arquitetura em camadas facilita essa troca.

**P: Como funciona a sincronização em tempo real?**
**R:** Cada digitação emite evento `texto_editor` que é retransmitido via Socket.IO para todos os usuários na mesma sala do documento.

## 📜 Licença e Aspectos Legais

Este projeto é distribuído sob a **Licença MIT**, permitindo uso, modificação e distribuição livres, desde que o aviso de copyright seja mantido. Para detalhes completos, consulte o arquivo [LICENSE](https://github.com/ESousa97/alura-docs/blob/main/LICENSE).

## 📞 Contato

- **GitHub:** [@ESousa97](https://github.com/ESousa97)
- **LinkedIn:** [Enoque Sousa](https://www.linkedin.com/in/enoque-sousa-bb89aa168/)
- **Issues:** Para bugs e sugestões, use [GitHub Issues](https://github.com/ESousa97/alura-docs/issues)

---

<p align="center">
  <img src="https://img.shields.io/github/stars/ESousa97/alura-docs?style=social" alt="GitHub Stars">
  <img src="https://img.shields.io/github/forks/ESousa97/alura-docs?style=social" alt="GitHub Forks">
</p>

<p align="center">
  <em>Desenvolvido com ❤️ por José Enoque - Explorando o poder da comunicação em tempo real</em>
</p>