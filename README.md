# Configurando o projeto


```
Node      - 12.63
Yarn      - 1.22
Postgres  - 12.2
```

## Instalando dependências

```bash
yarn
```

## Executando testes

```bash
yarn test
```

## Configurando o banco de dados

 - Renomeie o arquivo `ormconfig.example.js` para `ormconfig.js`
 - Configure o objeto `devConfig` em `ormconfig.js` com as informações de conexão de seu banco de dados

```javascript
devConfig = {
  ...
  type: 'postgres',       // tipo de banco de dados
  host: 'localhost',      // endereço de acesso ao banco
  port: 5432,             // porta de conexão
  username: 'postgres',   // usuário
  password: 'postgres',   // senha
  database: 'postgres',  // nome da database
  ...
};
```

 - Após configurar a conexão execute:

```bash
yarn typeorm migration:run
```

# Executando o projeto

```bash
yarn dev:server
```

 - O projeto está sendo executado na porta `3333` e pronto para receber requisições

## API

### POST

```json
/customers

{
  "name": "Jhon Doe",
  "email": "jhondoe@email.com"
}

Response 200

{
  "name": "string",
  "email": "string",
  "id": "uuid"
}

```

### GET

```json
/customers

Response 200

{
  "name": "string",
  "email": "string",
  "id": "uuid"
}
```

## PUT

```json
/customers/{"customer_id"}

{
  "name": "Jhon One",
  "email": "jhonone@email.com",
}

Response 204

```

## DELETE

```json
/customers/{"customer_id"}

Response 204
```

### POST

```json
/login

{
  "email": "jhondoe@email.com"
}

Response 200

{
  "customer":{
    "name": "string",
    "email": "string",
    "id": "uuid"
  },
  "token": "string"
}

```

### POST

```json
/favorites/{"product_id"}

Response 201

{
  "product_id": "uuid",
  "customer_id": "uuid",
  "image": "string",
  "price": "number",
  "title": "string",
  "review_score": "number",
  "id": "uuid"
}

```

### GET

```json
/favorites/?page=1&size=25

Response 200

{
  "favorites": [
    {
      "product_id": "uuid",
      "customer_id": "uuid",
      "image": "string",
      "price": "number",
      "title": "string",
      "review_score": "number",
      "id": "uuid"
    }
  ],
  "total": "number"
}

```

### DELETE

```json
/favorites/{"product_id"}

Response 204
```
