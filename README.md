# Open Converter

Open-source file converter for video and document formats. No signup required.
Live at [open-convert.com](https://open-convert.com).

## Features

- 100% free — no account, no hidden limits
- Uploaded files and converted outputs deleted after 1 hour

## Tech Stack

- Backend: Node.js, Express, FFmpeg, LibreOffice, Multer
- Frontend: React, Vite, Material-UI, i18next, Axios
- Infrastructure: Docker, Nginx, AWS EC2, Let's Encrypt

## Local Development

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs at `http://localhost:3000`.

### Backend

**Prerequisites:** Node.js 18+, npm

```bash
cd backend
npm install
cp .env.example .env
npm start
```

Runs at `http://localhost:3001`.

## Deployment

```bash
git pull origin main
docker compose up --build -d frontend backend
```
