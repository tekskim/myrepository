# 배포 가이드 (Deployment Guide)

이 프로토타입을 웹에 배포하는 방법입니다.

## 방법 1: Netlify (가장 쉬움) ⭐ 추천

### 옵션 A: 드래그 앤 드롭
1. https://app.netlify.com 접속
2. 회원가입/로그인 (GitHub 계정으로 간편 로그인 가능)
3. "Sites" 페이지에서 프로젝트 폴더를 드래그 앤 드롭
4. 자동으로 배포되고 URL이 생성됩니다!

### 옵션 B: Netlify CLI
```bash
# Netlify CLI 설치
npm install -g netlify-cli

# 로그인
netlify login

# 배포
netlify deploy --prod
```

## 방법 2: Vercel

### 옵션 A: 웹 인터페이스
1. https://vercel.com 접속
2. GitHub 계정으로 로그인
3. "New Project" 클릭
4. GitHub 저장소 연결 또는 파일 업로드
5. 자동 배포!

### 옵션 B: Vercel CLI
```bash
# Vercel CLI 설치
npm install -g vercel

# 배포
vercel --prod
```

## 방법 3: GitHub Pages

1. GitHub에 저장소 생성
2. 파일들을 커밋하고 푸시
3. Settings > Pages에서 브랜치 선택
4. 자동으로 `https://[username].github.io/[repo-name]` URL 생성

## 방법 4: Surge.sh (간단한 CLI)

```bash
# Surge 설치
npm install -g surge

# 배포
surge
# 프로젝트 폴더 경로 입력
# 도메인 입력 (또는 자동 생성)
```

---

## 빠른 배포 (Netlify 추천)

가장 빠른 방법:
1. https://app.netlify.com/drop 접속
2. 이 폴더 전체를 드래그 앤 드롭
3. 완료! URL 받기

배포 후:
- 자동 HTTPS
- 전 세계 CDN
- 무료
- 커스텀 도메인 가능


