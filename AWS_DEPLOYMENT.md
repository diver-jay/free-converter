# AWS 배포 가이드

WebM to MP4 Converter를 AWS에 배포하는 방법입니다.

## 배포 방법 선택

### 1. EC2 직접 배포 (권장 - 간단함)
- 비용: 저렴 (~$20-40/월)
- 난이도: 쉬움
- 확장성: 수동
- 적합한 경우: 트래픽이 적거나 중간 정도

### 2. ECS (Elastic Container Service)
- 비용: 중간 (~$50-100/월)
- 난이도: 중간
- 확장성: 자동
- 적합한 경우: 높은 트래픽, 자동 확장 필요

### 3. Lightsail
- 비용: 매우 저렴 (~$10-20/월)
- 난이도: 매우 쉬움
- 확장성: 제한적
- 적합한 경우: 개인 프로젝트, 테스트

---

## 방법 1: EC2로 배포 (권장)

### 1.1 EC2 인스턴스 생성

1. AWS Console에서 EC2 서비스로 이동
2. "Launch Instance" 클릭
3. 설정:
   - **AMI**: Ubuntu Server 22.04 LTS
   - **Instance Type**: t3.medium (최소 t3.small)
   - **Storage**: 30GB gp3
   - **Security Group**:
     - HTTP (80): 0.0.0.0/0
     - HTTPS (443): 0.0.0.0/0
     - SSH (22): Your IP
   - **Key Pair**: 생성 또는 기존 사용

### 1.2 인스턴스 접속 및 초기 설정

```bash
# SSH 접속
ssh -i your-key.pem ubuntu@your-ec2-public-ip

# 시스템 업데이트
sudo apt update && sudo apt upgrade -y

# Docker 설치
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io

# Docker Compose 설치
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# 현재 사용자를 docker 그룹에 추가
sudo usermod -aG docker $USER
newgrp docker

# Git 설치
sudo apt install -y git
```

### 1.3 애플리케이션 배포

```bash
# 코드 클론
git clone https://github.com/your-username/webm-to-mp4-converter.git
cd webm-to-mp4-converter

# 환경 변수 설정
cd backend
cp .env.example .env
# .env 파일 수정 (필요시)
cd ..

# Docker Compose로 실행
docker-compose up -d

# 로그 확인
docker-compose logs -f
```

### 1.4 Nginx 리버스 프록시 설정 (선택사항 - 도메인 사용시)

```bash
# Nginx 설치
sudo apt install -y nginx

# Nginx 설정
sudo nano /etc/nginx/sites-available/webm-converter
```

다음 내용 입력:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    client_max_body_size 500M;

    location / {
        proxy_pass http://localhost:80;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_connect_timeout 600;
        proxy_send_timeout 600;
        proxy_read_timeout 600;
    }
}
```

```bash
# 설정 활성화
sudo ln -s /etc/nginx/sites-available/webm-converter /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 1.5 SSL 인증서 설정 (Let's Encrypt)

```bash
# Certbot 설치
sudo apt install -y certbot python3-certbot-nginx

# SSL 인증서 발급
sudo certbot --nginx -d your-domain.com

# 자동 갱신 테스트
sudo certbot renew --dry-run
```

### 1.6 자동 재시작 설정

```bash
# systemd 서비스 파일 생성
sudo nano /etc/systemd/system/webm-converter.service
```

다음 내용 입력:

```ini
[Unit]
Description=WebM to MP4 Converter
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/home/ubuntu/webm-to-mp4-converter
ExecStart=/usr/local/bin/docker-compose up -d
ExecStop=/usr/local/bin/docker-compose down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
```

```bash
# 서비스 활성화
sudo systemctl enable webm-converter
sudo systemctl start webm-converter
```

---

## 방법 2: ECS (Elastic Container Service) 배포

### 2.1 ECR (Elastic Container Registry) 설정

```bash
# AWS CLI 설치 (로컬 환경)
# https://aws.amazon.com/cli/

# AWS 자격 증명 설정
aws configure

# ECR 리포지토리 생성
aws ecr create-repository --repository-name webm-converter-backend
aws ecr create-repository --repository-name webm-converter-frontend

# ECR 로그인
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com

# 이미지 빌드 및 푸시 - Backend
cd backend
docker build -t webm-converter-backend .
docker tag webm-converter-backend:latest YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/webm-converter-backend:latest
docker push YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/webm-converter-backend:latest

# 이미지 빌드 및 푸시 - Frontend
cd ../frontend
docker build -t webm-converter-frontend .
docker tag webm-converter-frontend:latest YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/webm-converter-frontend:latest
docker push YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/webm-converter-frontend:latest
```

### 2.2 ECS 클러스터 생성

1. AWS Console에서 ECS로 이동
2. "Create Cluster" 클릭
3. "Networking only" (Fargate) 선택
4. 클러스터 이름 입력 후 생성

### 2.3 Task Definition 생성

`ecs-task-definition.json` 파일 사용 (아래 참조)

```bash
aws ecs register-task-definition --cli-input-json file://ecs-task-definition.json
```

### 2.4 Application Load Balancer 생성

1. EC2 > Load Balancers > Create Load Balancer
2. Application Load Balancer 선택
3. 설정:
   - Scheme: internet-facing
   - Listeners: HTTP (80), HTTPS (443)
   - Availability Zones: 최소 2개 선택
   - Security Group: HTTP/HTTPS 허용
   - Target Group: 새로 생성

### 2.5 ECS 서비스 생성

1. ECS 클러스터에서 "Create Service"
2. 설정:
   - Launch type: Fargate
   - Task Definition: 위에서 생성한 것 선택
   - Service name: webm-converter-service
   - Number of tasks: 2
   - Load balancer: 위에서 생성한 ALB 선택

---

## 방법 3: AWS Lightsail (가장 간단)

### 3.1 Lightsail 인스턴스 생성

1. AWS Console에서 Lightsail로 이동
2. "Create Instance" 클릭
3. 설정:
   - Platform: Linux/Unix
   - Blueprint: OS Only > Ubuntu 22.04
   - Instance plan: $20/month (2GB RAM, 2 vCPUs)
   - 인스턴스 이름 입력

### 3.2 배포 (EC2와 동일)

위의 EC2 배포 가이드 1.2~1.3 단계 동일하게 진행

### 3.3 정적 IP 할당

1. Lightsail 콘솔에서 "Networking" 탭
2. "Create static IP" 클릭
3. 인스턴스에 연결

---

## 비용 예상

### EC2 (t3.medium)
- EC2: ~$30/월
- EBS 30GB: ~$3/월
- 데이터 전송: ~$5-10/월
- **총: ~$40-45/월**

### ECS Fargate
- Fargate 태스크 (0.5 vCPU, 1GB): ~$40/월
- ALB: ~$20/월
- 데이터 전송: ~$10/월
- **총: ~$70-80/월**

### Lightsail
- 인스턴스 ($20 플랜): $20/월
- 데이터 전송: 포함
- **총: ~$20/월**

---

## 모니터링 및 유지보수

### CloudWatch 로그 설정

```bash
# CloudWatch 에이전트 설치
sudo wget https://s3.amazonaws.com/amazoncloudwatch-agent/ubuntu/amd64/latest/amazon-cloudwatch-agent.deb
sudo dpkg -i amazon-cloudwatch-agent.deb
```

### 디스크 공간 모니터링

```bash
# Cron job으로 오래된 파일 삭제 (추가 보호)
crontab -e

# 매일 새벽 3시에 2시간 이상 된 파일 삭제
0 3 * * * find /home/ubuntu/webm-to-mp4-converter/backend/uploads -type f -mmin +120 -delete
0 3 * * * find /home/ubuntu/webm-to-mp4-converter/backend/converted -type f -mmin +120 -delete
```

### 로그 확인

```bash
# Docker 로그
docker-compose logs -f backend
docker-compose logs -f frontend

# 시스템 리소스 확인
docker stats

# 디스크 사용량
df -h
```

### 업데이트 배포

```bash
cd ~/webm-to-mp4-converter
git pull
docker-compose down
docker-compose up -d --build
```

---

## 트러블슈팅

### 파일 업로드 실패
- Nginx의 `client_max_body_size` 확인
- Docker 볼륨 공간 확인

### 변환 속도 느림
- 인스턴스 타입 업그레이드 (더 많은 CPU)
- FFmpeg 설정 최적화

### 메모리 부족
- 인스턴스 메모리 늘리기
- Swap 메모리 추가

```bash
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

---

## 보안 체크리스트

- [ ] Security Group에서 불필요한 포트 차단
- [ ] SSH 키 안전하게 보관
- [ ] HTTPS 설정 (Let's Encrypt)
- [ ] 정기적인 시스템 업데이트
- [ ] CloudWatch 알람 설정
- [ ] 백업 전략 수립
- [ ] IAM 역할 최소 권한 원칙
- [ ] 환경 변수에 민감 정보 저장

---

## 추가 개선 사항

### CDN (CloudFront) 설정
- 정적 파일 캐싱
- 글로벌 배포

### Auto Scaling
- CPU/메모리 기반 자동 확장
- 비용 최적화

### Database 추가
- 변환 히스토리 저장
- 사용자 통계

### 큐 시스템 (SQS)
- 변환 작업 큐잉
- 백그라운드 프로세싱
