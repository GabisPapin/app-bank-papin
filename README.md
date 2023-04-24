# Projeto App Bank Papin

Criei uma api (APIREST) simples para transações bancárias, onde é possível o cliente se cadastrar, criar sua conta com um valor inicial minimo de 100.00 reais, o cliente pode adicionar valores a conta e também retirar.

### Tecnologias utilizadas:

#### Nodejs, Typescript, TypeORM, Postgresql, express, docker

### Comandos para rodar o projeto:

Após clonar o projeto: git clone SSH

* npm install
* colocar as informações para rodar um banco de dados de acordo com o .env-example
* para rodar a aplicação ```npm``` ```run``` ```dev``` (mais informações de comandos no packege.json)

### Rotas:

#### Criar usuário: [POST] http://localhost:9000/users

* Corpo da requisição [JSON]

```
{
  "username": "@Rebeca",
  "email": "rebeca@gmail.com",
  "password": "20002221",
  "account": {
    "balance": 100.00
  }
}
```


#### Listar usuários: [GET] http://localhost:9000/users
Observação: Não aparece senha e dados da conta.

#### Atualizar dados do usuário: [PUT] http://localhost:9000/users/:id

* Autenticação Token: o token é retornado na requisição /sessions (login) que está descrita após as requisições de usuário.

* Corpo da requisição [JSON]

```
{
  "username": "@Rebeca",
  "email": "rebeca@gmail.com",
  "password": "20002221"
}
```

#### Retornar 1 usuário: [GET] http://localhost:9000/users/:id

* Autenticação Token: o token é retornado na requisição /sessions (login) que está descrita após as requisições de usuário.

#### Fazer login/ iniciar sessão: [POST] http://localhost:9000/sessions
Observação: Aqui é retornado o token do usuário.

* Corpo da requisição [JSON]

```
{
  "username": "@Rebeca",
  "password": "20002221"
}
```

#### Enviar email para recuperar senha: [POST] http://localhost:9000/password/forgot

* Corpo da requisição [JSON]

```
{
  "email": "rebeca@gmail.com"
}
```

#### Redefinir senha: [POST] http://localhost:9000/password/reset
Observação: utilizar token enviado na url do frontend: http://localhost:3000/${token}

* Corpo da requisição [JSON]

```
{
  "token": "89c0328e-6cfa-4d04-a546-916fdcd2509b",
  "password": "12345678",
  "password_confirmation": "12345678"
}
```

#### Inserir valor na conta: [POST] http://localhost:9000/account/debit/:id
Observação: utilizar o id do user.

* Autenticação Token: o token é retornado na requisição /sessions (login).

* Corpo da requisição [JSON]

```
{
  "valor": 60.00
}
```

#### Inserir valor na conta: [POST] http://localhost:9000/account/credit/:id
Observação: utilizar o id do user.

* Autenticação Token: o token é retornado na requisição /sessions (login).

* Corpo da requisição [JSON]

```
{
  "valor": 1000.00
}
```
