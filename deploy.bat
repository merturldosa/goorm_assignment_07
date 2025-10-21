@echo off
REM Keep 앱 GitHub 업로드 및 Vercel 배포 스크립트 (Windows)
REM 사용법: deploy.bat

echo.
echo 🚀 Keep 앱 배포 시작...
echo.

REM 1. Git 저장소 확인
if not exist ".git" (
    echo 📦 Git 저장소 초기화 중...
    git init
    echo ✅ Git 저장소 초기화 완료
) else (
    echo ✅ Git 저장소 이미 존재
)

REM 2. 의존성 설치 확인
if not exist "node_modules" (
    echo 📦 의존성 설치 중...
    call npm install
    echo ✅ 의존성 설치 완료
) else (
    echo ✅ 의존성 이미 설치됨
)

REM 3. 빌드 테스트
echo.
echo 🔨 빌드 테스트 중...
call npm run build

if %errorlevel% equ 0 (
    echo ✅ 빌드 성공
) else (
    echo ❌ 빌드 실패. 오류를 확인하세요.
    pause
    exit /b 1
)

REM 4. Git 스테이징
echo.
echo 📝 변경사항 스테이징 중...
git add .

REM 5. 커밋 메시지 입력
echo.
set /p commit_message="커밋 메시지를 입력하세요 (기본값: Deploy Keep app): "
if "%commit_message%"=="" set commit_message=Deploy Keep app

git commit -m "%commit_message%"
echo ✅ 커밋 완료: %commit_message%

REM 6. 원격 저장소 확인
echo.
git remote | findstr "origin" >nul
if %errorlevel% equ 0 (
    echo ✅ 원격 저장소 이미 설정됨

    REM 푸시 확인
    set /p push_confirm="GitHub에 푸시하시겠습니까? (y/n): "
    if /i "%push_confirm%"=="y" (
        git push
        echo ✅ GitHub 푸시 완료
    )
) else (
    echo ⚠️ 원격 저장소가 설정되지 않았습니다.
    echo GitHub에서 새 저장소를 생성한 후 다음 명령어를 실행하세요:
    echo.
    echo   git remote add origin https://github.com/your-username/keep-notes-app.git
    echo   git branch -M main
    echo   git push -u origin main
)

REM 7. Vercel 배포 (선택사항)
echo.
set /p deploy_vercel="Vercel CLI로 배포하시겠습니까? (y/n): "
if /i "%deploy_vercel%"=="y" (
    where vercel >nul 2>nul
    if %errorlevel% equ 0 (
        echo 🚀 Vercel 배포 중...
        call vercel --prod
        echo ✅ Vercel 배포 완료
    ) else (
        echo ⚠️ Vercel CLI가 설치되어 있지 않습니다.
        echo 설치: npm install -g vercel
        echo.
        echo 또는 Vercel 웹사이트에서 배포하세요:
        echo https://vercel.com/new
    )
)

echo.
echo 🎉 배포 프로세스 완료!
echo.
echo 다음 단계:
echo   1. GitHub에서 저장소 확인
echo   2. Vercel에서 배포 확인
echo   3. 배포 URL 테스트
echo.

pause
