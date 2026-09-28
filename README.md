# Diário de Bordo - PWA

Aplicação web desenvolvida com **HTML, CSS e JavaScript** para registrar atividades e momentos do dia.

O projeto foi desenvolvido como uma **Progressive Web App (PWA)**, permitindo instalação no dispositivo, funcionamento offline e persistência das informações no navegador.

## Funcionalidades

- Criar novas entradas com título, descrição e data
- Listar as entradas registradas
- Remover entradas
- Persistir os dados utilizando `localStorage`
- Manter os dados após recarregar a página
- Funcionamento offline
- Instalação como aplicativo
- Interface responsiva para desktop e dispositivos móveis

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- LocalStorage
- Web App Manifest
- Service Worker
- Cache API

## Estrutura do projeto

```text
diario-de-bordo-pwa/
│
├── icons/
│   ├── icon-192.png
│   └── icon-512.png
│
├── index.html
├── style.css
├── script.js
├── manifest.json
├── service-worker.js
└── README.md
```

## Como executar

Clone ou baixe o repositório e abra o projeto utilizando um servidor local.

Uma opção é utilizar a extensão **Live Server** no Visual Studio Code.

Com o projeto aberto no VS Code:

1. Abra o arquivo `index.html`.
2. Clique em `Go Live`.
3. A aplicação será aberta no navegador através de um endereço local.

Exemplo:

```text
http://127.0.0.1:5500/index.html
```

## Persistência dos dados

As entradas são armazenadas utilizando `localStorage`.

Dessa forma, os registros continuam disponíveis mesmo depois de atualizar ou fechar a página, sem necessidade de banco de dados externo.

## Progressive Web App

O projeto utiliza um arquivo `manifest.json` contendo as configurações necessárias para instalação da aplicação.

Foram configurados:

- Nome e nome curto da aplicação
- Cor do tema
- Cor de fundo
- Modo de exibição `standalone`
- Ícones nas resoluções 192x192 e 512x512

A aplicação também utiliza o evento `beforeinstallprompt` para disponibilizar a instalação quando suportada pelo navegador.

## Funcionamento offline

O arquivo `service-worker.js` realiza o cache dos principais arquivos da aplicação.

Assim, após o primeiro carregamento, o Diário de Bordo pode continuar sendo acessado mesmo sem conexão com a internet.

O Service Worker foi testado no Chrome DevTools e apresentou o status:

```text
activated and is running
```

O funcionamento offline também foi testado utilizando a opção `Offline` do Chrome DevTools.

## Responsividade

A interface foi desenvolvida para se adaptar a diferentes tamanhos de tela utilizando CSS Grid e Media Queries.

Em dispositivos menores, o formulário e a lista de entradas passam a ser exibidos em uma única coluna.

## Teste com Lighthouse

A aplicação foi analisada utilizando o Lighthouse do Chrome DevTools no modo Mobile.

Resultados obtidos:

| Categoria | Pontuação |
|---|---:|
| Performance | 100 |
| Accessibility | 91 |
| Best Practices | 100 |
| SEO | 90 |

## Testes realizados

Foram testados manualmente:

- Criação de entradas
- Listagem das entradas
- Exclusão de entradas
- Persistência após recarregar a página
- Funcionamento offline
- Registro e ativação do Service Worker
- Manifest da aplicação
- Instalação como PWA
- Responsividade em dispositivos móveis
- Análise com Lighthouse
