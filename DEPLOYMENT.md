# Keep 앱 배포 및 GitHub 저장 가이드

이 문서는 Keep 노트 관리 애플리케이션을 GitHub에 업로드하고 다양한 플랫폼에 배포하는 방법을 설명합니다.

---

## 목차
1. [GitHub에 프로젝트 저장하기](#github에-프로젝트-저장하기)
2. [Vercel로 배포하기](#vercel로-배포하기)
3. [Netlify로 배포하기](#netlify로-배포하기)
4. [GitHub Pages로 배포하기](#github-pages로-배포하기)

---

## GitHub에 프로젝트 저장하기

### 1단계: Git 저장소 초기화

프로젝트 디렉토리에서 다음 명령어를 실행합니다:

```bash
# keep-app 디렉토리로 이동
cd keep-app

# Git 저장소 초기화
git init

# 모든 파일 스테이징
git add .

# 첫 번째 커밋 생성
git commit -m "Initial commit: Keep 노트 관리 애플리케이션"
```

### 2단계: GitHub에 새 저장소 생성

1. [GitHub](https://github.com)에 로그인
2. 우측 상단 "+" 버튼 클릭 → "New repository" 선택
3. 저장소 정보 입력:
   - Repository name: `keep-notes-app` (원하는 이름)
   - Description: "중후하고 전문적인 노트 관리 애플리케이션"
   - Public 또는 Private 선택
   - **중요**: "Initialize this repository with a README" 체크 해제
4. "Create repository" 클릭

### 3단계: GitHub에 푸시

GitHub에서 제공하는 명령어를 사용합니다:

```bash
# GitHub 저장소를 원격 저장소로 추가
git remote add origin https://github.com/your-username/keep-notes-app.git

# main 브랜치로 푸시
git branch -M main
git push -u origin main
```

**참고**: `your-username`을 실제 GitHub 사용자명으로 변경하세요.

### 이후 변경사항 푸시

```bash
# 변경사항 스테이징
git add .

# 커밋 생성
git commit -m "변경사항 설명"

# GitHub에 푸시
git push
```

---

## Vercel로 배포하기

Vercel은 가장 쉽고 빠른 배포 방법입니다. (권장)

### 방법 1: GitHub 연동 (권장)

1. [Vercel](https://vercel.com) 회원가입/로그인
2. "Add New Project" 클릭
3. GitHub 계정 연동
4. `keep-notes-app` 저장소 선택
5. 프로젝트 설정:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (기본값)
   - **Build Command**: `npm run build` (자동 감지)
   - **Output Directory**: `dist` (자동 감지)
6. "Deploy" 클릭

배포가 완료되면 자동으로 URL이 생성됩니다 (예: `https://keep-notes-app.vercel.app`)

### 방법 2: Vercel CLI 사용

```bash
# Vercel CLI 설치
npm install -g vercel

# 프로젝트 디렉토리에서 배포
vercel

# 프로덕션 배포
vercel --prod
```

### 자동 배포 설정

GitHub와 연동한 경우, `main` 브랜치에 푸시할 때마다 자동으로 재배포됩니다.

---

## Netlify로 배포하기

### 방법 1: GitHub 연동

1. [Netlify](https://www.netlify.com) 회원가입/로그인
2. "Add new site" → "Import an existing project" 클릭
3. GitHub 선택 및 저장소 연결
4. 빌드 설정:
   - **Base directory**: (비워두기)
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. "Deploy site" 클릭

### 방법 2: 드래그 앤 드롭

```bash
# 프로젝트 빌드
npm run build

# dist 폴더를 Netlify 대시보드에 드래그 앤 드롭
```

### 커스텀 도메인 설정

1. Netlify 사이트 대시보드
2. "Domain settings" → "Add custom domain"
3. 도메인 입력 및 DNS 설정

---

## GitHub Pages로 배포하기

### 1단계: 프로젝트 설정 수정

`vite.config.js` 파일 수정:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/keep-notes-app/',  // GitHub 저장소 이름으로 변경
  server: {
    port: 3000,
    open: true
  }
})
```

### 2단계: 배포 스크립트 추가

`package.json`의 `scripts` 섹션에 추가:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### 3단계: gh-pages 패키지 설치

```bash
npm install --save-dev gh-pages
```

### 4단계: 배포 실행

```bash
npm run deploy
```

### 5단계: GitHub Pages 활성화

1. GitHub 저장소 페이지로 이동
2. "Settings" → "Pages"
3. Source: `gh-pages` 브랜치 선택
4. "Save" 클릭

배포 URL: `https://your-username.github.io/keep-notes-app/`

---

## 환경변수 설정 (필요시)

### Vercel

1. 프로젝트 설정 → "Environment Variables"
2. 변수 추가 (예: API 키 등)

### Netlify

1. 사이트 설정 → "Build & deploy" → "Environment"
2. "Edit variables" 클릭

### 로컬 개발 환경

프로젝트 루트에 `.env` 파일 생성:

```env
VITE_API_URL=https://api.example.com
VITE_APP_NAME=Keep
```

코드에서 사용:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## 배포 전 체크리스트

- [ ] `npm run build` 로컬 빌드 테스트
- [ ] 모든 기능 정상 작동 확인
- [ ] `.gitignore` 파일 확인 (node_modules, .env 등 제외)
- [ ] README.md 업데이트
- [ ] package.json 버전 업데이트
- [ ] 성능 최적화 확인
- [ ] 반응형 디자인 테스트
- [ ] 브라우저 호환성 테스트

---

## 배포 플랫폼 비교

| 플랫폼 | 무료 플랜 | 빌드 속도 | 커스텀 도메인 | 자동 배포 | 추천도 |
|--------|-----------|-----------|---------------|-----------|---------|
| **Vercel** | ✅ 풍부 | ⚡ 매우 빠름 | ✅ | ✅ | ⭐⭐⭐⭐⭐ |
| **Netlify** | ✅ 풍부 | ⚡ 빠름 | ✅ | ✅ | ⭐⭐⭐⭐⭐ |
| **GitHub Pages** | ✅ 기본 | 🐢 보통 | ✅ | ⚠️ 수동 | ⭐⭐⭐ |

### 권장 사항

- **개인 프로젝트**: Vercel (가장 쉽고 빠름)
- **팀 프로젝트**: Netlify (협업 기능 우수)
- **오픈소스**: GitHub Pages (무료, 안정적)

---

## 트러블슈팅

### 빌드 오류 발생 시

```bash
# 캐시 삭제
rm -rf node_modules package-lock.json

# 재설치
npm install

# 재빌드
npm run build
```

### 배포 후 404 오류

- **Vercel/Netlify**: SPA 라우팅 설정 필요
  - `public/_redirects` 파일 생성:
    ```
    /*    /index.html   200
    ```

### 환경변수가 작동하지 않음

- 변수명이 `VITE_`로 시작하는지 확인
- 배포 플랫폼에서 환경변수 설정 확인
- 재배포 필요

### LocalStorage 데이터 손실

- 브라우저 개발자 도구 → Application → Storage 확인
- 다른 도메인/프로토콜은 별도 저장소 사용

---

## 보안 고려사항

1. **API 키 보호**: 절대 GitHub에 업로드하지 마세요
2. **환경변수 사용**: 민감한 정보는 환경변수로 관리
3. **HTTPS 사용**: 배포 플랫폼은 자동으로 HTTPS 제공
4. **CORS 설정**: 백엔드 API 연동 시 CORS 정책 확인

---

## 성능 최적화

### 빌드 최적화

```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'icons': ['react-icons'],
        },
      },
    },
  },
})
```

### 이미지 최적화

- 이미지 압축 (TinyPNG, ImageOptim)
- WebP 포맷 사용
- Lazy loading 구현

---

## 모니터링 및 분석

### Google Analytics 추가

1. Google Analytics 계정 생성
2. `index.html`에 추적 코드 추가:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Vercel Analytics

Vercel 대시보드에서 Analytics 활성화

---

## 지속적인 배포 (CI/CD)

### GitHub Actions 설정

`.github/workflows/deploy.yml` 생성:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Deploy to Vercel
        run: vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

---

## 유용한 명령어 모음

```bash
# 로컬 빌드 테스트
npm run build && npm run preview

# 빌드 크기 분석
npm install -D rollup-plugin-visualizer
npm run build

# 성능 검사
lighthouse https://your-deployed-url.com

# Git 태그 생성 (버전 관리)
git tag -a v1.0.0 -m "Version 1.0.0"
git push origin v1.0.0
```

---

## 추가 리소스

- [Vite 배포 가이드](https://vitejs.dev/guide/static-deploy.html)
- [Vercel 문서](https://vercel.com/docs)
- [Netlify 문서](https://docs.netlify.com/)
- [GitHub Pages 가이드](https://pages.github.com/)

---

## 문의 및 지원

문제가 발생하면 GitHub Issues에 등록해주세요:
`https://github.com/your-username/keep-notes-app/issues`
