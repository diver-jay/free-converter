# WebM to MP4 Converter

무료 WebM to MP4 변환 웹 서비스

## 기능

- WebM 파일을 MP4로 변환
- 간단하고 직관적인 UI
- FFmpeg 기반 고품질 변환
- 1시간 후 자동 파일 삭제
- 무료, 회원가입 불필요

## 기술 스택

### Backend
- Node.js + Express
- FFmpeg (비디오 변환)
- Multer (파일 업로드)

### Frontend
- React
- Axios
- CSS3

### Infrastructure
- Docker & Docker Compose
- Nginx (리버스 프록시)
- AWS EC2/ECS (배포)

## 로컬 개발

### 사전 요구사항
- Node.js 18+
- FFmpeg 설치
- npm 또는 yarn

### Backend 실행

```bash
cd backend
npm install
cp .env.example .env
npm start
```

Backend는 http://localhost:3001 에서 실행됩니다.

### Frontend 실행

```bash
cd frontend
npm install
cp .env.example .env
npm start
```

Frontend는 http://localhost:3000 에서 실행됩니다.

## Docker로 실행

### Docker 및 Docker Compose 설치

Docker가 설치되어 있지 않다면 먼저 설치하세요:

**Ubuntu/Debian:**
```bash
# Docker 설치
sudo apt update
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io

# Docker Compose 설치
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# 현재 사용자를 docker 그룹에 추가 (sudo 없이 사용)
sudo usermod -aG docker $USER
newgrp docker

# 설치 확인
docker --version
docker-compose --version
```

**macOS:**
```bash
# Homebrew를 통한 설치
brew install --cask docker

# 또는 Docker Desktop 다운로드
# https://www.docker.com/products/docker-desktop
```

**Windows:**
```bash
# Docker Desktop 다운로드 및 설치
# https://www.docker.com/products/docker-desktop

# WSL2 사용 권장
```

### Docker Compose 사용 (권장)

```bash
# 빌드 및 실행
docker-compose up --build

# 백그라운드 실행
docker-compose up -d

# 중지
docker-compose down
```

서비스는 http://localhost 에서 접속 가능합니다.

### 개별 Docker 이미지 빌드

```bash
# Backend
cd backend
docker build -t webm-converter-backend .

# Frontend
cd frontend
docker build -t webm-converter-frontend .
```

## AWS 배포

자세한 배포 가이드는 [AWS_DEPLOYMENT.md](./AWS_DEPLOYMENT.md)를 참조하세요.

### 간단 요약

1. **EC2 방식**
   - EC2 인스턴스 생성 (t3.medium 이상 권장)
   - Docker 및 Docker Compose 설치
   - 코드 클론 및 실행

2. **ECS 방식**
   - ECR에 이미지 푸시
   - ECS 클러스터 및 서비스 생성
   - Application Load Balancer 설정

## 프로젝트 구조

```
webm-to-mp4-converter/
├── backend/
│   ├── server.js           # Express 서버
│   ├── package.json
│   ├── Dockerfile
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── App.js         # React 메인 컴포넌트
│   │   ├── App.css
│   │   └── index.js
│   ├── public/
│   ├── package.json
│   ├── Dockerfile
│   └── nginx.conf
├── docker-compose.yml
├── AWS_DEPLOYMENT.md
└── README.md
```

## API 엔드포인트

### POST /api/upload
WebM 파일을 업로드하고 MP4로 변환

**요청:**
- Content-Type: multipart/form-data
- Body: video (file)

**응답:**
```json
{
  "success": true,
  "message": "Conversion successful",
  "downloadUrl": "/api/download/filename.mp4",
  "filename": "filename.mp4"
}
```

### GET /api/download/:filename
변환된 MP4 파일 다운로드

### GET /api/health
헬스체크 엔드포인트

## 환경 변수

### Backend (.env)
```
PORT=3001
NODE_ENV=production
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:3001
```

## 보안 고려사항

- 파일 크기 제한: 500MB
- 허용 파일 타입: .webm만
- 자동 파일 정리: 1시간 후 삭제
- CORS 설정 필요
- Production 환경에서 HTTPS 사용 권장

## 라이선스

MIT

## 기여

Pull requests는 환영합니다!
