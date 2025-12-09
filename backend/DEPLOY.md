# 재배포 가이드

## 📦 재배포 순서

### 1️⃣ 변경 사항 확인
```bash
# backend 디렉토리로 이동
cd /home/junhonglee/projects/webm-to-mp4-converter/backend

# 변경된 파일 확인
git status

# 변경 내용 확인
git diff
```

### 2️⃣ 기존 컨테이너 중지 및 제거
```bash
# 실행 중인 컨테이너 확인
docker ps

# 백엔드 컨테이너 중지 (컨테이너 이름 또는 ID 사용)
docker stop <container_name_or_id>

# 컨테이너 제거
docker rm <container_name_or_id>

# 또는 한 번에:
docker stop <container_name> && docker rm <container_name>

# 예시:
# docker stop webm-backend && docker rm webm-backend
```

### 3️⃣ 기존 Docker 이미지 제거 (선택사항)
```bash
# 이미지 목록 확인
docker images

# 기존 이미지 제거 (디스크 공간 확보)
docker rmi <image_name_or_id>

# 사용하지 않는 이미지 모두 제거
docker image prune -a
```

### 4️⃣ 새 Docker 이미지 빌드
```bash
# backend 디렉토리에서 실행
cd /home/junhonglee/projects/webm-to-mp4-converter/backend

# 이미지 빌드 (5-10분 소요 가능)
docker build -t converter-backend:latest .

# 진행 상황 확인
# Python, pdf2docx, 폰트 설치 등이 표시됩니다
```

### 5️⃣ 새 컨테이너 실행
```bash
# 기본 실행
docker run -d \
  --name webm-backend \
  -p 3001:3001 \
  -v $(pwd)/uploads:/app/uploads \
  -v $(pwd)/converted:/app/converted \
  converter-backend:latest

# 또는 환경 변수와 함께:
docker run -d \
  --name webm-backend \
  -p 3001:3001 \
  -e NODE_ENV=production \
  -v $(pwd)/uploads:/app/uploads \
  -v $(pwd)/converted:/app/converted \
  --restart unless-stopped \
  converter-backend:latest
```

### 6️⃣ 컨테이너 상태 확인
```bash
# 실행 중인 컨테이너 확인
docker ps

# 로그 확인
docker logs webm-backend

# 실시간 로그 모니터링
docker logs -f webm-backend

# 컨테이너 내부 접속 (디버깅)
docker exec -it webm-backend bash
```

### 7️⃣ 테스트
```bash
# 헬스 체크
curl http://localhost:3001/api/health

# PDF → DOCX 변환 테스트
curl -X POST http://localhost:3001/api/upload/document \
  -F "document=@6_high_availability.pdf" \
  -o test_output.docx

# DOCX → PDF 변환 테스트 (DOCX 파일이 있는 경우)
curl -X POST http://localhost:3001/api/upload/document \
  -F "document=@sample.docx" \
  -o test_output.pdf
```

---

## 🚀 빠른 재배포 (원라이너)

```bash
# 현재 디렉토리: backend
docker stop webm-backend && \
docker rm webm-backend && \
docker build -t converter-backend:latest . && \
docker run -d \
  --name webm-backend \
  -p 3001:3001 \
  -v $(pwd)/uploads:/app/uploads \
  -v $(pwd)/converted:/app/converted \
  --restart unless-stopped \
  converter-backend:latest && \
docker logs -f webm-backend
```

---

## 🐛 트러블슈팅

### 포트가 이미 사용 중인 경우
```bash
# 포트 사용 중인 프로세스 확인
sudo lsof -i :3001

# 프로세스 종료
sudo kill -9 <PID>
```

### 디스크 공간 부족
```bash
# Docker 정리
docker system prune -a --volumes

# 사용하지 않는 이미지 제거
docker image prune -a

# 중지된 컨테이너 제거
docker container prune
```

### 한글 폰트 확인 (컨테이너 내부)
```bash
docker exec -it webm-backend bash
fc-list :lang=ko
```

### Python 패키지 확인
```bash
docker exec -it webm-backend bash
pip3 list | grep pdf2docx
python3 -c "import pdf2docx; print('OK')"
```

---

## 📝 Git Commit (선택사항)

변경 사항을 저장하고 싶다면:

```bash
cd /home/junhonglee/projects/webm-to-mp4-converter

git add .
git commit -m "Add PDF to DOCX conversion with Python pdf2docx

- Add convert_pdf.py script
- Update Dockerfile with Python and Korean fonts
- Modify server.js for hybrid conversion approach
- DOCX → PDF: LibreOffice (existing)
- PDF → DOCX: Python pdf2docx (new)"

git push origin main
```

---

## 🌐 프로덕션 배포 (EC2/서버)

SSH로 서버 접속 후:

```bash
# 1. 서버 접속
ssh user@your-server-ip

# 2. 프로젝트 디렉토리로 이동
cd /path/to/webm-to-mp4-converter/backend

# 3. 최신 코드 가져오기 (Git 사용 시)
git pull origin main

# 4. 재배포 실행
docker stop webm-backend && \
docker rm webm-backend && \
docker build -t converter-backend:latest . && \
docker run -d \
  --name webm-backend \
  -p 3001:3001 \
  -v $(pwd)/uploads:/app/uploads \
  -v $(pwd)/converted:/app/converted \
  --restart unless-stopped \
  converter-backend:latest

# 5. 로그 확인
docker logs -f webm-backend
```

---

## ✅ 체크리스트

배포 전:
- [ ] 변경 사항 확인 완료
- [ ] 로컬에서 테스트 완료
- [ ] 백업 필요 시 기존 데이터 백업

배포 후:
- [ ] 컨테이너 정상 실행 확인
- [ ] 로그 에러 없음 확인
- [ ] API 엔드포인트 테스트
- [ ] PDF → DOCX 변환 테스트
- [ ] DOCX → PDF 변환 테스트
- [ ] 한글 폰트 정상 작동 확인
