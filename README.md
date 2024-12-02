# QA STORE Desafio - Loja Integrada

### Projeto testes automatizados da QA STORE Desafio
Projeto focado na funcionalidade do *carrinho de compras*. Desenvolvido com Cypress para garantir que os principais processos funcionem corretamente e tenha cobertura necessária.

## Ambiente de testes

- Sistema Operaicional ultilizado: Windows 11 Pro

## Pré-requisito
Para exeutar este projeto, é necessário ter as seguintes ferramentas instaladas:

- **Node.js**:  22.11.0
- **NPM**:  10.9.0

Certifique-se de que essas versões estão instaladas corretamente. Você pode verificar as versões com os seguintes comandos:

1. ** Acessar cmd e digitar:** 
    node -v 
    npm -v

## Instalação

1. **Clone este repositório em sua maquina**:

```bash
git clone https://github.com/seuusuario/nome-do-repositorio.git
```

2. **Instale as dependências e pacotes utilizando o NPM**:

No diretório do projeto, execute:

```bash
npm install
```
3. **Instale a versão do Cypress (13.15.2) e confirme a versão**:

npm install cypress@13.15.2 --save-dev
npx cypress --version

## Como usar

### Primeira execução do Cypress

Caso esteja executando pela primeira vez o Cypress na maquina, digite o seguinte código
```bash
npm run cy:firsttime
```

###Para usuários que já configuraram o Cypress

Se o Cypress já foi configurado no seu ambiente, você pode iniciar a ferramenta com o comando abaixo:

```bash
npm run cy:open
```

### Executando os testes

1. Cypress deve abrir uma janela, então clique na opção **"E2E Testing"** para iniciar.   
2. Selecione seu navegador desejado. 
3. Após selecionar o navegador, o Cypress deve abrir os testes disponíveis na aba de specs. Basta clicar no teste para executar.

______________________________________________________________________________________________________________________________________


## Executando os Testes via Linha de Comando (sem Interface Gráfica)
Caso prefira rodar os testes diretamente pelo terminal, sem a interface gráfica do Cypress, você pode utilizar os comandos abaixo.

```bash
npm run testRun
```
ou

```bash
npx cypress run
```
### 3. Relatórios e Evidências
    Ao executar os testes, o Cypress gera automaticamente evidências e relatórios. Para visualizar os resultados:

    Evidências:
    As capturas de tela e vídeos são salvos automaticamente nas pastas ***cypress/screenshots*** e ***cypress/videos***

    Relatório: 
    Para visualizar o relatório detalhado da execução: ***cypress/reports*** e deve conter um arquivo ***index.html***




## Tecnologias Utilizadas

- **Cypress**: Para automação de testes.
- **JavaScript**: Linguagem de programação utilizada nos testes.
- **Mocha**: Usado para geração de relatórios.

