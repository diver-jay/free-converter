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

### 1. EC2 Setup

- AMI: Ubuntu Server 22.04 LTS, Instance Type: `t3.small`+
- Inbound rules: SSH (22), HTTP (80), HTTPS (443)
- Assign an Elastic IP and point your domain's A record to it

```bash
sudo apt-get update && sudo apt-get upgrade -y
sudo apt-get install -y git
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker ${USER}
exit  # re-login to apply Docker permissions
```

### 2. Clone and Configure

```bash
git clone https://github.com/your-username/open-converter.git
cd open-converter
```

Verify `nginx-proxy/conf.d/default.conf.post-ssl` has the correct `server_name` and `ssl_certificate` paths.

### 3. Start Containers and Issue SSL Certificate

```bash
docker compose down
cp nginx-proxy/conf.d/default.conf.pre-ssl nginx-proxy/conf.d/default.conf
docker compose up --build -d
```

```bash
docker compose run --rm certbot certonly --webroot \
  --webroot-path /var/www/certbot \
  -d example.com -d www.example.com \
  --email your-email@example.com \
  --agree-tos --no-eff-email
```

### 4. Apply HTTPS Config

```bash
cp nginx-proxy/conf.d/default.conf.post-ssl nginx-proxy/conf.d/default.conf
docker compose up -d --force-recreate nginx-proxy
```
