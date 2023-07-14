# API SOLID com Fastify - Rocketseat - Ignite 2023 - Projeto 03

## Aplicação

GymPass style app.

### RFs (Requisitos funcionais)

- [x] deve ser possível se cadastrar;
- [x] deve ser possível se autenticar;
- [x] deve ser possível obter o perfil de um usuário logado;
- [x] deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] deve ser possível o usuário obter seu histórico de check-ins;
- [x] deve ser possível o usuário buscar academias próximas (até 10 km);
- [x] deve ser possível o usuário buscar academais pelo nome;
- [x] deve ser possível o usuário realizar check-in em uma academia;
- [x] deve ser possível validar o check-in de um usuário;
- [x] deve ser possível cadastrar uma academia;

### RNs (Regras de negócio)

- [x] o usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] o usuário não pode fazer 2 check-ins no mesmo dia;
- [x] o usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [x] o check-in só pode ser validado até 20 minutos após criado;
- [ ] o check-in só pode ser validado por administradores;
- [ ] a academia só pode ser cadastrada por administradores;

### RNFs (Requisitos não-funcionais)

- [x] a senha do usuário precisa estar criptografada;
- [x] os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] todas as listas de dados precisam estar paginadas com 20 itens por página;
- [ ] o usuário deve ser identificado com um JWT (JSON Web Token);

## Configuração

Criar o arquivo `.npmrc` com o conteúdo a seguir para que os pacotes sejam instalados com a versão exata, oou seja, sem que seja possível atualizações indesejadas.

```
save-exact=true
```

- Adição do typescript

```bash
yarn add -D typescript @types/node tsx tsup

npx tsc --init
```

O segundo comando vai criar o arquivo `tsconfig.json` e podemos alterar a configuração do parâmetro `target` para `es2020`.

Com o tsx foi adicionado a linha a seguir nos scripts do `package.json`

```json
"start": "tsx watch src/main.ts",
```



- Lint e organização do código

```bash
yarn add -D eslint prettier eslint-config-prettier
```

[Ordenar as importações - eslint-plugin-import](https://github.com/import-js/eslint-plugin-import/)

```
yarn add -D eslint-plugin-import @typescript-eslint/parser eslint-import-resolver-typescript eslint-import-resolver-babel-module eslint-plugin-module-resolver @typescript-eslint/eslint-plugin
```

ver configurações necessárias do `eslint-import-resolver-typescript` para funcionar correto com o path mapping

[Ordenar as importações - @trivago/prettier-plugin-sort-imports](https://github.com/trivago/prettier-plugin-sort-imports#readme)

```bash
yarn add -D @trivago/prettier-plugin-sort-imports
```

Este plugin pede para que coloque a ordenação que queremos no arquivo `.prettierrc.json` e ficaram estas opções.

```json
  "importOrder": [
    "^react$",
    "^react-native$",
    "^@react-navigation$",
    "^@storage/(.*)$",
    "^@screens/(.*)$",
    "^@components/(.*)$",
    "^@assets/(.*)$",
    "^[./]"
  ],
  "importOrderSeparation": true,
  "importOrderSortSpecifiers": true
```

- [Ciar alias para os imports, evitando passar caminhos complexos - babel-plugin-module-resolver](https://github.com/tleunen/babel-plugin-module-resolver)
```
yarn add -D babel-plugin-module-resolver
```



- [Atualização de pacotes por bot do Github - renovate](https://docs.renovatebot.com/)

## Instalações

### Pacote da API

- [Framework web](https://fastify.dev/docs/latest/Guides/Getting-Started)

```bash
yarn add fastify
```

[Variáveis de ambiente - dotenv](https://www.npmjs.com/package/dotenv)

```bash
yarn add dotenv
```

Será usado o arquivo `env/index.ts` para fazer as validações das variáveis de ambiente.

[Validação de dados - zod](https://www.npmjs.com/package/zod)

```bash
yarn add zod
```



- [ORM (Object Relational Mapper) - Query builder - Prisma](https://www.prisma.io/docs/getting-started/quickstart)

```bash
yarn add -D prisma
```

>Inicia a configuração do prisma
>
>```bash
>npx prisma init
>```

Após a configuração modelo de dados, rodar o comando a seguir para gerar os códigos para manipular os modelos no banco.

```bash
npx prisma generate
```
-- Este comando também vai instalar o pacote `@prisma/client` que é o que vai ser usado para manipular os dados no banco.
Instalaria o `prisma` se já não tivesse instalado.


- [Banco de dados PostgreSQL em container Docker](https://hub.docker.com/r/bitnami/postgresql)

Usaremos a imagem da Bitnami por causa de configurações de segurança pré definidas.
Uso do `docker-compose` para facilitar a configuração do banco.

```bash
docker-compose up -d
```

Com o banco disponível, podemos rodar o comando a seguir para criar as tabelas no banco.

```bash
npx prisma migrate dev
```


- [Geração de hash de senha - bcryptjs](https://www.npmjs.com/package/bcryptjs)
```bash
yarn add bcryptjs
yarn add -D @types/bcryptjs
```


-[Validação de datas - dayjs](https://day.js.org/docs/en/installation/installation)

```bash
yarn add dayjs
```

### Testes

- [Testes - vitest](https://github.com/vitest-dev/vitest)

```bash
yarn add -D vitest vite-tsconfig-paths @vitest/coverage-v8
```

O pacote `vite-tsconfig-paths` é para que o vitest entenda os path mapping do `tsconfig.json` e não dê erro de importação.
O último pacote instalado é para que o vitest gere o relatório de cobertura de testes. Vai gerar um relatório em html na pasta `coverage`.
```bash
vitest run --coverage
```

Podemos visualizar os testes de forma mais visual podemos instalar o pacote `vitest-ui` e rodar o comando a seguir.

```bash
yarn add -D @vitest/ui
```

E adicionamos mais um script no `package.json` para rodar o comando a seguir.

```json
"test:ui": "vitest --ui [--api 9527]"
```

<p style="font-size: 10px">Obs.: coloquei a opção --api 9527 pois havia algum conflito com a porta padrão.</p>



- [JWT JSON Web Token com Fastify - @fastify/jwt](https://github.com/fastify/fastify-jwt)

```bash
yarn add @fastify/jwt
```



- [A CLI tool to run multiple npm-scripts in parallel or sequential - npm-run-all](https://github.com/mysticatea/npm-run-all)
Este pacote nos permite exeutar scripts do package.json independente do sistema operacional.

```bash
yarn add -D npm-run-all
```



- [Executar os testes sem precisar colocar a aplicação no ar - supertest](https://www.npmjs.com/package/supertest)

```bash
yarn add -D supertest @types/supertest
```



- [Trabalhar com cookies - fastify-cookie](https://github.com/fastify/fastify-cookie)

```bash
yarn add @fastify/cookie
```
