# 나만의 미덕 카드 (My Virtue Canvas)

나와 친구의 좋은 점을 발견하고 아름다운 카드로 만드는 웹 애플리케이션입니다.

## ✨ 주요 기능

- **카드 만들기**: 자신의 미덕을 발견하고 실천한 행동을 기록
- **친구의 칭찬**: 친구가 발견해준 미덕을 기록하고 감사 표현
- **미덕벽 보기**: 생성된 모든 카드를 갤러리 형태로 확인
- **카드 꾸미기**: 다양한 배경색과 패턴으로 나만의 카드 디자인
- **PDF 내보내기**: 카드를 PDF로 저장하여 인쇄 가능

## 🛠️ 기술 스택

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Library**: shadcn/ui (Radix UI 기반)
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query
- **Routing**: React Router v6
- **Form Management**: React Hook Form + Zod
- **PDF Generation**: jsPDF + html2canvas

## 🚀 시작하기

### 필수 요구사항

- Node.js 18 이상
- npm 또는 yarn

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/plusiam/my-virtue-canvas.git
cd my-virtue-canvas

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

개발 서버가 시작되면 브라우저에서 `http://localhost:8080`으로 접속할 수 있습니다.

## 📦 빌드

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

빌드된 파일은 `dist` 폴더에 생성됩니다.

## 🎨 프로젝트 구조

```
my-virtue-canvas/
├── src/
│   ├── components/         # React 컴포넌트
│   │   ├── CardEditor.tsx  # 카드 생성 에디터
│   │   ├── VirtueCard.tsx  # 미덕 카드 컴포넌트
│   │   ├── VirtueWall.tsx  # 카드 갤러리
│   │   └── ui/            # shadcn UI 컴포넌트들
│   ├── pages/             # 페이지 컴포넌트
│   ├── hooks/             # 커스텀 훅
│   ├── lib/               # 유틸리티 함수
│   └── assets/            # 정적 리소스
├── public/                # 공개 정적 파일
└── ...
```

## 📝 스크립트

- `npm run dev` - 개발 서버 실행
- `npm run build` - 프로덕션 빌드
- `npm run build:dev` - 개발 모드 빌드
- `npm run lint` - ESLint 실행
- `npm run preview` - 빌드 결과 미리보기

## 🎓 교육 활용

이 프로젝트는 교육 현장에서 다음과 같이 활용할 수 있습니다:

- **인성 교육**: 학생들이 자신과 친구의 긍정적인 면을 발견하고 표현
- **시각화 도구**: 미덕을 아름다운 카드로 시각화하여 동기부여
- **포트폴리오**: 학생들의 성장 과정을 기록하고 공유

## 🤝 기여

프로젝트 개선을 위한 제안이나 버그 리포트는 언제나 환영합니다!

## 📄 라이선스

MIT License

## 💝 감사의 말

서로의 미덕을 발견하고 칭찬하며 함께 성장해요!
