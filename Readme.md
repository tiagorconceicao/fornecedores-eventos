# FORNECEDORES - EVENTOS
> API GraphQL destinada a armazenar Fornecedores de Serviços para Eventos.

## Requisitos do sistema

* NodeJs
* MySQL
* Yarn
* Redis

## Configuração inicial
* Criar uma cópia do arquivo __.env.example__ e renomear para __.env__ prenchendo os valores das variáveis de ambiente

## Instalação
Instale dependências:
```sh
yarn
```
Crie o banco de dados:
```sh
yarn sequelize db:create
```
Migre a tabelas para o novo banco de dados:
```sh
yarn sequelize db:migrate
```

## Inicialização
Inicialize o projeto executando o script:
```sh
yarn dev
```

## Atualização (após __pull__)
Após realizar __pull__ ou sincronizar arquivos é recomendado procurar novas dependências executando:
```sh
yarn
```
Também é recomendado procurar por alterações na estrutura do banco de dados executando:
```sh
yarn sequelize db:migrate
```

#### Readme em construção...