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

There is 2 ways to run the project in production mode, either running each docker images apart (backend and frontend)

#### Back-end
```bash
cd backend
docker build -t "backend" .
docker run -p 8000:3000 backend
```

The back-end will be served to [localhost:8000](localhost:8000)

#### Front-end
```bash
cd frontend
docker build -t "frontend" .
docker run -p 3000:3000 frontend
```