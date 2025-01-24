# Hackaton 2025 Narvals Arctiques

## How to instal
Run this command to clone the repo

```bash
git clone https://github.com/DouglasQuashie/hackathon_2025.git
```

## How to run the project

### Dev mode
#### Back-end
In order to run the back-end in dev mode, run this command

```bash
cd backend
bun install
bun dev
```

The back-end will be served to [localhost:3000](localhost:3000)

#### Front-end
In order to run the front-end in dev mode, run this command

```bash
cd frontend
yarn install
yarn dev
```
The front-end will be served to [localhost:5173](localhost:5173)

### Production mode
For the production mode, we use Docker.

You need to build the images for the front and the back, and then run the docker compose

#### Back-end
```bash
cd backend
docker build -t "narvals_arctiques_back" .
```

#### Front-end
```bash
cd frontend
docker build -t "narvals_arctiques_front" .
```

#### Docker compose
```bash
docker compose up
```

OR

```bash
docker-compose up
```

The back-end will be served on [localhost:8000](localhost:8000) and the front end on [localhost:3000](localhost:3000)
