# SlipStream

SlipStream is a stream of consciousness note taking web app where you can view your notes in different ways.

## Getting Started

1. Install recommended extensions (VS Code) to make sure you have as close as the same development environment as everyone else (strongly recommend the Sort Imports, Tailwind, ESlint and Prettier extensions at least). The recommended extensions can be found under `.vscode/extensions.json` but VS Code should prompt you to install them when first opening the repo as well. Ensure the ESlint and Prettier extensions are enabled, and that you are using the workspace settings instead of your personal settings (which should be overridden by workspace settings by default).

2. Run the following command at the root of the repo's directory to create an `.env` file

   ```
   cp .env.example .env
   ```

3. Install npm Packages

   ```
   npm install
   ```

4. Start the Pocketbase Docker Container

   > [!TIP]   
   > you can skip step 4 and 5 by running this one command
   >
   > ```
   > npm run dev
   > ```

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

   Alternatively, there is this command you can run from the root of the repo to start the Pocketbase Docker container:

   ```
   npm run start:pocketbase
   ```

5. Start the React App

   The React app isn't dockerised, so you can just run it locally on your machine.

   To start the Vite server, run this npm command:

   ```
   npm run start:vite
   ```

## Development

### Comments

Use the following prefixes with comments to make them stand out with highlighting (using the Better Comments extension):

<img width="389" alt="better_comments_demo" src="https://github.com/wilgru/slipstream-react-app/assets/40753609/2595ddfe-bd86-4a07-bbbf-ed9a837efc6a"><br>

## Deployment

SlipStream is configured to deploy to Fly.io.

### Deploy Frontend

1. Test Dockerfile works locally first
   ```sh
   docker build . -t "slipstream-react-app"
   docker run -p 3000:80 slipstream-react-app
   ```
2. Run flyctl launch on first deployment. when it asks, use the existing configuration, and dont edit it any further on the web
   ```sh
   flyctl launch
   ```
3. Run flyctl deploy on all subsequent deploys
   ```sh
   flyctl deploy
   ```

### Deploy Backend

More details on deploying Pocketbase to Fly.io [here](https://github.com/pocketbase/pocketbase/discussions/537).

1. navigate to `/pocketbase`
   ```sh
   cd pocketbase
   ```
2. run flyctl launch on first deployment. when it asks, use the existing configuration, and dont edit it any further on the web. for now only build it, will deploy it later
   ```sh
   flyctl launch --build-only
   ```
3. Create a volume and make sure to name it `pb_data`. Say yes when you get the warning message
   ```sh
   flyctl volumes create pb_data --size=1
   ```
4. run flyctl deploy to push deployment to Fly.io
   ```sh
   flyctl deploy
   ```
5. Create the first Pocketbase super user. You can find the URL in the logs after first deployment that will lead to the create super user screen
6. run flyctl deploy on all subsequent deploys
   ```sh
   flyctl deploy
   ```
