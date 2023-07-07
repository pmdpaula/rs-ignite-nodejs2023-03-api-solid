# API SOLID com Fastify - Rocketseat - Ignite 2023 - Projeto 03

## Aplicação

GymPass style app.

### RFs (Requisitos funcionais)

- [ ] deve ser possível se cadastrar;
- [ ] deve ser possível se autenticar;
- [ ] deve ser possível obter o perfil de um usuário logado;
- [ ] deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [ ] deve ser possível o usuário obter seu histórico de check-ins;
- [ ] deve ser possível o usuário buscar academias próximas;
- [ ] deve ser possível o usuário buscar academais pelo nome;
- [ ] deve ser possível o usuário realizar check-in em uma academia;
- [ ] deve ser possível validar o check-in de um usuário;
- [ ] deve ser possível cadastrar uma academia;

### RNs (Regras de negócio)

- [ ] o usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] o usuário não pode fazer 2 check-ins no mesmo dia;
- [ ] o usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] o check-in só pode ser validado até 20 minutos após criado;
- [ ] o check-in só pode ser validado por administradores;
- [ ] a academia só pode ser cadastrada por administradores;

### RNFs (Requisitos não-funcionais)

- [ ] a senha do usuário precisa estar criptografada;
- [ ] os dados da aplicação precisam estar persistdiso em um banco PostgreSQL;
- [ ] todas as listas de dados precisam estar paginadas com 20 itens por página;
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
yarn add -D eslint-plugin-import @typescript-eslint/parser eslint-import-resolver-typescript eslint-import-resolver-babel-module eslint-plugin-module-resolver
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

### Pacotes de exibição

[Exibição de texto - fast-printf](https://www.npmjs.com/package/fast-printf)

```bash
yarn add fast-printf
```

[Animação de texto - chalk-animation](https://github.com/bokub/chalk-animation)

```bash
yarn add chalk-animation
yarn add -D @types/chalk-animation
```

[Barra de progresso - cli-progress](https://www.npmjs.com/package/cli-progress)

```bash
yarn add cli-progress
yarn add -D @types/cli-progress
```

[Texto em cores - colors](https://github.com/Marak/colors.js)

```bash
yarn add colors
```
