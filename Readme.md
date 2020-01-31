# FORNECEDORES - EVENTOS
> API GraphQL destinada a armazenar dados __Fornecedores de Serviços__ para __Eventos__.

### Funções gerais
* Sistema de Login
* Busca fornecedores com filtro (_em desenvolvimento_)
* Envio de Emails em massa (_em teste_)
* Banco de __Fornecedores__
  * Múltiplos contados
  * Cidades / Estado de atuação
  * Categorizado por __Serviços__
  * Lista __Eventos__ onde já participou
  * Avaliação em cada __Evento__
  * Lembretes
* Banco de __Eventos__
* Campos de __Avaliação__ editáveis

### Características
* Autenticação baseada em _Token_
* Envio de Emails por _AWS SES_
* Sistema de filas usando _BULL_

### Requisitos do sistema
* NodeJs
* MySQL
* Yarn
* Redis

### Configuração inicial
* Criar uma cópia do arquivo __.env.example__ e renomear para __.env__ prenchendo os valores das variáveis de ambiente

### Instalação
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

### Inicialização
Inicialize o projeto executando o script:
```sh
yarn dev
# 'yarn dev:server' para rodar apenas servidor
# 'yarn dev:queue' para rodar apenas serviço fila (requer REDIS) 
```

## Projeto em desenvolvimento
### Atualizações (após _git pull_ )
Após realizar _git pull_ (sincronizar projeto) é recomendado procurar novas dependências executando:
```sh
yarn
```
Também é recomendado procurar por alterações na estrutura do banco de dados executando:
```sh
yarn sequelize db:migrate
```

### Readme em construção...