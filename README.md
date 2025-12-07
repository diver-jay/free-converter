# WebM to MP4 Converter

무료 파일 변환 웹 서비스. WebM, MOV, AVI 등 다양한 동영상 파일을 MP4로 변환하거나, PDF와 Word 문서를 상호 변환할 수 있습니다.

## ✨ 주요 기능

- **다양한 포맷 지원**: WebM, MP4, MOV, AVI, MKV, FLV 비디오 포맷 및 PDF, DOCX 문서 포맷 지원
- **간단한 UI**: 직관적인 UI로 누구나 쉽게 사용 가능
- **고품질 변환**: FFmpeg 및 LibreOffice 기반의 고품질 변환
- **보안**: 1시간 후 업로드 및 변환 파일 자동 삭제
- **100% 무료**: 회원가입이나 별도 설치 과정 없이 무제한 사용 가능

## 🛠 기술 스택

### Backend
- Node.js + Express
- FFmpeg (비디오 변환)
- LibreOffice (문서 변환)
- Multer (파일 업로드)

### Frontend
- React + **Vite**
- Material-UI (MUI)
- i18next (다국어 지원)
- Axios

### Infrastructure
- Docker & Docker Compose
- Nginx (리버스 프록시 및 HTTPS 적용)
- AWS EC2 (배포)
- Let's Encrypt (SSL 인증서 자동 발급 및 갱신)

## 💻 로컬 개발 (Vite)

### 사전 요구사항
- Node.js 18+
- npm 또는 yarn

### Backend 실행

```bash
cd backend
npm install
cp .env.example .env
npm start
```
> Backend는 http://localhost:3001 에서 실행됩니다.

### Frontend 실행

```bash
cd frontend

# 의존성 설치
npm install

# 개발 서버 실행
npm start
```
> Frontend는 http://localhost:3000 (또는 다른 포트)에서 실행됩니다.

---

## 🐳 AWS EC2 배포 (Docker + Nginx + HTTPS)

이 가이드는 Docker Compose를 사용하여 EC2 인스턴스에 전체 서비스를 배포하고, Nginx 리버스 프록시를 통해 HTTPS(SSL)를 자동으로 적용하는 방법을 안내합니다.

### 1단계: EC2 인스턴스 및 기본 환경 설정
1.  **EC2 인스턴스 생성**
    - AMI: `Ubuntu Server 22.04 LTS`
    - Instance Type: `t3.small` 이상 권장
    - Security Group (인바운드 규칙):
        - `SSH (22)`: My IP
        - `HTTP (80)`: Anywhere (0.0.0.0/0)
        - `HTTPS (443)`: Anywhere (0.0.0.0/0)
    - Elastic IP를 할당하여 고정 IP를 준비합니다.

2.  **도메인 설정**
    - Route53 등을 이용하여 준비된 도메인이 EC2 인스턴스의 고정 IP를 가리키도록 A 레코드를 설정합니다. (`example.com`, `www.example.com` 모두)

3.  **EC2 접속 및 Docker 설치**
    ```bash
    # EC2 인스턴스에 SSH로 접속
    ssh -i your-key.pem ubuntu@YOUR_EC2_IP

    # 시스템 업데이트 및 Git 설치
    sudo apt-get update && sudo apt-get upgrade -y
    sudo apt-get install -y git

    # Docker 및 Docker Compose 설치
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker ${USER}

    # Docker 권한 적용을 위해 로그아웃 후 다시 접속
    exit
    ```
    > **중요**: `exit` 후 다시 SSH로 접속해야 `sudo` 없이 Docker 명령어를 사용할 수 있습니다.

### 2단계: 프로젝트 클론 및 설정
1.  **EC2에 프로젝트 클론**
    ```bash
    git clone https://github.com/your-username/your-repo.git
    cd your-repo
    ```

2.  **설정 파일 확인**
    - 로컬에서 수정한 모든 파일(`frontend/vite.config.js`, `frontend/Dockerfile`, `docker-compose.yml` 등)이 `git pull`을 통해 최신 상태인지 확인합니다.
    - `nginx-proxy/conf.d/` 내부에 `default.conf.pre-ssl`과 `default.conf.post-ssl` 파일이 있는지 확인합니다.
    - `default.conf.post-ssl` 파일의 `server_name`과 `ssl_certificate` 경로에 있는 도메인이 실제 도메인과 일치하는지 다시 한번 확인합니다.

### 3단계: 컨테이너 실행 및 SSL 인증서 발급
Nginx 재시작 문제를 피하기 위해, 임시 HTTP 설정을 먼저 적용하여 컨테이너를 실행한 후 SSL 인증서를 발급받습니다.

1.  **임시 설정 적용 및 컨테이너 실행**
    ```bash
    # 이전에 실행중인 컨테이너가 있다면 모두 중지
    docker compose down

    # pre-ssl 설정을 default.conf로 복사하여 적용
    cp nginx-proxy/conf.d/default.conf.pre-ssl nginx-proxy/conf.d/default.conf

    # 모든 컨테이너를 빌드하고 백그라운드에서 실행
    docker compose up --build -d
    ```

2.  **SSL 인증서 발급**
    > 아래 명령어의 도메인과 이메일 주소를 실제 정보로 변경해주세요.
    ```bash
    docker compose run --rm certbot certonly --webroot --webroot-path /var/www/certbot -d example.com -d www.example.com --email your-email@example.com --agree-tos --no-eff-email
    ```
    `Successfully received certificate` 메시지가 나오면 성공입니다.

### 4단계: 최종 설정 적용 및 서비스 재시작
인증서가 발급되었으므로 최종 HTTPS 설정을 적용하고 Nginx 컨테이너를 다시 시작합니다.

1.  **최종 설정 적용**
    ```bash
    # post-ssl 설정을 default.conf로 덮어쓰기하여 적용
    cp nginx-proxy/conf.d/default.conf.post-ssl nginx-proxy/conf.d/default.conf
    ```

2.  **Nginx 컨테이너 재시작**
    ```bash
    # 변경된 Nginx 설정을 적용하기 위해 nginx-proxy 컨테이너만 강제로 재생성
    docker compose up -d --force-recreate nginx-proxy
    ```
    이제 `https://YOUR_DOMAIN.COM` 으로 접속하여 HTTPS가 적용된 사이트를 확인하실 수 있습니다.

## 프로젝트 구조 (Vite 마이그레이션 후)
```
webm-to-mp4-converter/
├── backend/
│   ├── server.js
│   ├── Dockerfile
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── index.jsx       # .js -> .jsx로 변경
│   ├── public/             # 정적 파일 (폰트, 로고 등)
│   ├── index.html          # public -> frontend 루트로 이동
│   ├── vite.config.js      # Vite 설정 파일 (신규)
│   ├── Dockerfile
│   ├── nginx.conf
│   └── ...
├── nginx-proxy/
│   └── conf.d/
│       ├── default.conf.pre-ssl
│       └── default.conf.post-ssl
├── docker-compose.yml
└── README.md
```

## 환경 변수 (Vite)
### Frontend (`frontend/.env`)
```
# Vite는 'VITE_' 접두사를 사용합니다.
VITE_API_URL=
```