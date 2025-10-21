#!/bin/bash

# Keep 앱 GitHub 업로드 및 Vercel 배포 스크립트
# 사용법: bash deploy.sh

echo "🚀 Keep 앱 배포 시작..."
echo ""

# 1. Git 저장소 확인
if [ ! -d ".git" ]; then
    echo "📦 Git 저장소 초기화 중..."
    git init
    echo "✅ Git 저장소 초기화 완료"
else
    echo "✅ Git 저장소 이미 존재"
fi

# 2. 의존성 설치 확인
if [ ! -d "node_modules" ]; then
    echo "📦 의존성 설치 중..."
    npm install
    echo "✅ 의존성 설치 완료"
else
    echo "✅ 의존성 이미 설치됨"
fi

# 3. 빌드 테스트
echo ""
echo "🔨 빌드 테스트 중..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ 빌드 성공"
else
    echo "❌ 빌드 실패. 오류를 확인하세요."
    exit 1
fi

# 4. Git 스테이징
echo ""
echo "📝 변경사항 스테이징 중..."
git add .

# 5. 커밋 메시지 입력
echo ""
read -p "커밋 메시지를 입력하세요 (기본값: 'Deploy Keep app'): " commit_message
commit_message=${commit_message:-"Deploy Keep app"}

git commit -m "$commit_message"
echo "✅ 커밋 완료: $commit_message"

# 6. 원격 저장소 확인
echo ""
if git remote | grep -q "origin"; then
    echo "✅ 원격 저장소 이미 설정됨"

    # 푸시 확인
    read -p "GitHub에 푸시하시겠습니까? (y/n): " push_confirm
    if [ "$push_confirm" = "y" ]; then
        git push
        echo "✅ GitHub 푸시 완료"
    fi
else
    echo "⚠️  원격 저장소가 설정되지 않았습니다."
    echo "GitHub에서 새 저장소를 생성한 후 다음 명령어를 실행하세요:"
    echo ""
    echo "  git remote add origin https://github.com/your-username/keep-notes-app.git"
    echo "  git branch -M main"
    echo "  git push -u origin main"
fi

# 7. Vercel 배포 (선택사항)
echo ""
read -p "Vercel CLI로 배포하시겠습니까? (y/n): " deploy_vercel
if [ "$deploy_vercel" = "y" ]; then
    if command -v vercel &> /dev/null; then
        echo "🚀 Vercel 배포 중..."
        vercel --prod
        echo "✅ Vercel 배포 완료"
    else
        echo "⚠️  Vercel CLI가 설치되어 있지 않습니다."
        echo "설치: npm install -g vercel"
        echo ""
        echo "또는 Vercel 웹사이트에서 배포하세요:"
        echo "https://vercel.com/new"
    fi
fi

echo ""
echo "🎉 배포 프로세스 완료!"
echo ""
echo "다음 단계:"
echo "  1. GitHub에서 저장소 확인"
echo "  2. Vercel에서 배포 확인"
echo "  3. 배포 URL 테스트"
echo ""
