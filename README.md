# Keep - 노트 관리 애플리케이션

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)
![License](https://img.shields.io/badge/License-MIT-green)

## 🌐 배포

### 빠른 배포
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/keep-notes-app)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/your-username/keep-notes-app)

### 배포 가이드 문서
- 📖 [상세 배포 가이드](./DEPLOYMENT.md) - 완전한 배포 가이드
- ⚡ [빠른 배포 가이드](./QUICK_DEPLOY.md) - 5분 안에 배포하기
- 🔧 자동 배포 스크립트:
  - Windows: `deploy.bat` 실행
  - Mac/Linux: `bash deploy.sh` 실행

## 프로젝트 소개

Keep은 사용자가 노트를 효율적으로 작성, 관리, 분류할 수 있는 웹 애플리케이션입니다.
Google Keep에서 영감을 받아 제작되었으며, 중후하고 전문적인 디자인을 특징으로 합니다.

### 주요 기능

- **노트 CRUD**: 노트 생성, 조회, 수정, 삭제 기능
- **카테고리 관리**: Notes, Coding, Exercise, Quotes 등으로 분류
- **태그 시스템**: 노트에 다중 태그 추가 및 관리
- **핀 고정**: 중요한 노트를 상단에 고정
- **배경색 선택**: 4가지 배경색 (White, Red, Green, Blue)
- **우선순위**: Low, High 우선순위 설정
- **아카이브**: 사용하지 않는 노트 보관
- **휴지통**: 삭제된 노트 임시 보관 및 복원
- **검색 기능**: 제목으로 노트 검색
- **반응형 디자인**: 데스크톱, 태블릿, 모바일 지원

## 기술 스택

- **React** 18.2.0
- **Vite** - 빌드 도구
- **React Context API** - 상태 관리
- **CSS Modules** - 스타일링
- **React Icons** - 아이콘
- **date-fns** - 날짜 포맷팅
- **UUID** - 고유 ID 생성
- **LocalStorage** - 데이터 영속성

## 설치 및 실행

### 사전 요구사항

- Node.js 16.0 이상
- npm 또는 yarn

### 설치

```bash
# 프로젝트 디렉토리로 이동
cd keep-app

# 의존성 설치
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:3000`으로 접속하세요.

### 프로덕션 빌드

```bash
npm run build
```

빌드된 파일은 `dist` 폴더에 생성됩니다.

### 빌드 미리보기

```bash
npm run preview
```

## 프로젝트 구조

```
keep-app/
├── public/
├── src/
│   ├── components/
│   │   ├── Sidebar/
│   │   │   ├── Sidebar.jsx
│   │   │   └── Sidebar.module.css
│   │   ├── MainContent/
│   │   │   ├── MainContent.jsx
│   │   │   └── MainContent.module.css
│   │   ├── NoteCard/
│   │   │   ├── NoteCard.jsx
│   │   │   └── NoteCard.module.css
│   │   └── NoteModal/
│   │       ├── NoteModal.jsx
│   │       └── NoteModal.module.css
│   ├── context/
│   │   └── NotesContext.jsx
│   ├── styles/
│   │   ├── global.css
│   │   └── theme.js
│   ├── App.jsx
│   ├── App.module.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 사용 방법

### 1. 노트 생성
- 우측 상단의 "+" 버튼 클릭
- 제목, 내용, 태그, 배경색, 우선순위 입력
- "생성하기" 버튼 클릭

### 2. 노트 수정
- 노트 카드의 연필 아이콘 클릭
- 내용 수정 후 저장

### 3. 노트 삭제
- 노트 카드의 휴지통 아이콘 클릭
- 휴지통 카테고리에서 영구 삭제 또는 복원 가능

### 4. 노트 고정
- 노트 카드의 핀 아이콘 클릭
- 고정된 노트는 상단의 "Pinned Notes" 섹션에 표시

### 5. 카테고리 이동
- 왼쪽 사이드바에서 원하는 카테고리 클릭
- Notes, Coding, Exercise, Quotes, Archive, Trash

### 6. 노트 검색
- 상단 검색창에 키워드 입력
- 제목으로 실시간 검색

## 데이터 저장

모든 노트와 태그는 브라우저의 LocalStorage에 저장됩니다.
- 새로고침 후에도 데이터 유지
- 브라우저별로 독립적인 데이터
- 브라우저 데이터 삭제 시 노트도 함께 삭제됨

## 반응형 디자인

- **데스크톱 (1200px+)**: 3컬럼 그리드
- **태블릿 (768px-1199px)**: 2컬럼 그리드
- **모바일 (767px 이하)**: 1컬럼 그리드

## 브라우저 지원

- Chrome (최신 버전)
- Firefox (최신 버전)
- Safari (최신 버전)
- Edge (최신 버전)

## 향후 개발 계획

### Phase 2
- [ ] 사용자 인증 및 계정 관리
- [ ] 클라우드 동기화
- [ ] 노트 공유 기능
- [ ] 마크다운 에디터 지원
- [ ] 이미지/파일 첨부

### Phase 3
- [ ] 협업 기능 (실시간 공동 편집)
- [ ] 모바일 앱 개발
- [ ] 음성 메모
- [ ] OCR 이미지 텍스트 추출
- [ ] AI 기반 노트 요약 및 자동 태그 추천

## 라이선스

이 프로젝트는 교육 목적으로 만들어졌습니다.

## 문의

프로젝트 관련 문의사항이 있으시면 이슈를 등록해주세요.
