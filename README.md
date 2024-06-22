# SlipBox

SlipBox is a web based note taking app inspired by the 'zettelkasten' note taking method.

## Getting Started

### 1. Install recommended extensions (VS Code)

Install all the recommended extensions for this repo to make sure you have as close as the same development environment as everyone else (strongly recommend the Sort Imports and Tailwind extensions at least).

The recommended extensions can be found under `.vscode/extensions.json` but VS Code should prompt you to install them when first opening the repo as well.

### 2. Create .env file

Run the following command at the root of the repo's directory to create your `.env` file:

```
cp .env.example .env
```

_Make sure you don't commit this file with git_

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

The React app isn't dockerised, so you can just run it on your local machine.

To start the Vite server, run this npm command:

```
npm run start:dev
```

## Development Guide

### Using VS Code

**VS Code is the preferred IDE to use when working on this repo because of its recommended extensions and pre-configured workspace settings.**

Ensure the ESlint and Prettier extensions are installed and enabled in your vscode.

Ensure you are using the workspace settings instead of your personal settings (workspace setting should override personal settings by default) to allow our pre-configured settings to be in use, including ESlint's auto-fixing on save and auto format using Prettier on save and paste.

### File Structure and Naming Conventions

Use the following folder tree as a source of truth for how to organise your files in the `src` directory and what naming convention to use for certain files/folders depending on the context:

```
src
├── moduleName
│   ├── components
│   │   └── ComponentName
│   │       ├── subComponents
│   │       │   └── SubComponentName.tsx
│   │       ├── utils
│   │       │   └── utilName.ts
│   │       └── ComponentName.tsx
│   │       └── ComponentName.module.css
│   ├── hooks
│   │   └── useHookName.ts
│   ├── types
│   │   └── TypeName.type.ts
│   ├── pages
│   │   └── PageName
│   │       └── PageName.tsx
│   └── utils
│       └── utilName.ts
```

#### General Rules

- You don't need to have all of these folders for each module, but will most likely end up having most if not all of them
- If a particular file is getting too big, split out its logic using whatever organisation structure seems the simplest or most appropriate. Look for examples of existing structures in the code
- If a piece of code or logic is truly generic, feel free to move it somewhere in the `common` module
- Try to keep each file exporting only one thing, so you know exactly whats coming out of that file just based on the name
- Should use tailwind for all normal styling needs, but in the case where you must use vanilla css, use `.module.css` files

#### The Common Module

The `common` module is a bit different to the other modules, it may have folders that the other modules wouldn't have like `constants` for example.

### Commenting

Ideally the code itself should be used as the source of truth as much as possible, so if you decide to leave a comment somewhere make sure it says something the code doesn't. Something that can make your comments richer as well is to use the prefixes that come with the Better Comments extension, which can make your comments stand out more with highlighting. Consider using the following:

<img width="389" alt="better_comments_demo" src="https://github.com/wilgru/slipbox-react-app/assets/40753609/2595ddfe-bd86-4a07-bbbf-ed9a837efc6a"><br>

TODOs and FIXMEs in particular can also be tracked using the TODO tree extension if you have that installed.

## Vite Information

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

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
