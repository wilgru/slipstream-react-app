# SlipStream

SlipStream is a stream of consciousness note taking web app where you can view your notes in different ways.

## Getting Started

### 1. Install recommended extensions (VS Code)

Install all the recommended extensions for this repo to make sure you have as close as the same development environment as everyone else (strongly recommend the Sort Imports, Tailwind, ESlint and Prettier extensions at least).

The recommended extensions can be found under `.vscode/extensions.json` but VS Code should prompt you to install them when first opening the repo as well.

Ensure the ESlint and Prettier extensions are enabled, and that you are using the workspace settings instead of your personal settings (which should be overridden by workspace settings by default).

### 2. Create .env file

Run the following command at the root of the repo's directory to create your `.env` file:

```
cp .env.example .env
```

### 3. Install npm Packages

Run this command to install this repos npm packages locally:

```
npm install
```

### 4. Start the Pocketbase Docker Container

Run the following command at the root of the repo's directory to create your `Dockerfile`:

```
cp Dockerfile.example Dockerfile
```

Once the docker file is created you can use `docker compose` start up the to create Pocketbase image and start the container. For the first time you run the Docker compose, run this command:

```
docker compose up --build
```

Otherwise you can run the command without the --build flag:

```
docker compose up
```

After stopping the container, use this command to make sure its properly spun down:

```
docker compose down
```

### 5. Start the React App

The React app isn't dockerised, so you can just run it locally on your machine.

To start the Vite server, run this npm command:

```
npm run start:dev
```

## Development

### Comments

Ideally the code itself should be used as the source of truth, so comments should something that the code doesn't. The following prefixes can be used with comments which can make them stand out with highlighting using the Better Comments extension:

<img width="389" alt="better_comments_demo" src="https://github.com/wilgru/slipstream-react-app/assets/40753609/2595ddfe-bd86-4a07-bbbf-ed9a837efc6a"><br>

TODOs and FIXMEs in particular can also be tracked using the TODO tree extension if installed.

### File Structure

#### components

#### connections

#### hooks

#### routes

#### utils

## Vite

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

If you are developing a production application, we recommend updating the ESLint configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
