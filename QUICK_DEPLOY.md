# 빠른 배포 가이드

Keep 앱을 5분 안에 배포하는 가장 빠른 방법입니다.

---

## 🚀 Vercel로 배포하기 (가장 빠른 방법)

### 1단계: GitHub에 업로드 (2분)

```bash
cd keep-app

# Git 초기화
git init
git add .
git commit -m "Initial commit"

# GitHub에 새 저장소 생성 후
git remote add origin https://github.com/your-username/keep-notes-app.git
git branch -M main
git push -u origin main
```

### 2단계: Vercel 배포 (3분)

1. **Vercel 로그인**: https://vercel.com
2. **"Add New Project"** 클릭
3. **GitHub 저장소 연결**
4. **"Deploy"** 클릭 (설정 자동 감지)
5. ✅ **완료!** 배포 URL 생성됨

**배포 URL 예시**: `https://keep-notes-app.vercel.app`

---

## 📋 배포 전 체크리스트

### 필수 사항
- [ ] `npm install` 실행 완료
- [ ] `npm run build` 로컬 빌드 테스트 성공
- [ ] 모든 기능 테스트 완료

### 권장 사항
- [ ] README.md 업데이트
- [ ] 라이선스 추가
- [ ] 데모 URL 추가

---

## 🔧 배포 후 설정

### 커스텀 도메인 추가 (선택사항)

**Vercel에서:**
1. 프로젝트 → "Settings" → "Domains"
2. 도메인 입력 및 DNS 설정

### 자동 배포 확인

GitHub에 푸시할 때마다 자동으로 재배포됩니다:

```bash
git add .
git commit -m "Update features"
git push
```

---

## 💡 빠른 명령어

```bash
# 로컬 개발 서버 시작
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview

# Git 푸시 (자동 배포 트리거)
git add . && git commit -m "Update" && git push
```

---

## 🆘 문제 해결

### 빌드 실패 시

```bash
# node_modules 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 404 에러 (배포 후)

Vercel은 자동으로 SPA 라우팅을 처리하므로 추가 설정이 필요 없습니다.

---

## 📱 공유하기

배포가 완료되면 다음 정보를 README에 추가하세요:

```markdown
## 🌐 Live Demo

**배포 URL**: https://your-app.vercel.app

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/keep-notes-app)
```

---

## ⏱️ 소요 시간

| 단계 | 시간 |
|------|------|
| GitHub 업로드 | 2분 |
| Vercel 배포 | 3분 |
| **총 시간** | **5분** |

---

## 🎉 완료!

축하합니다! Keep 앱이 성공적으로 배포되었습니다.

**다음 단계:**
- 친구들과 공유하기
- 피드백 받기
- 기능 개선하기
- 포트폴리오에 추가하기
