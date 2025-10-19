# 나만의 미덕 카드 (My Virtue Canvas)

나와 친구의 좋은 점을 발견하고 아름다운 카드로 만드는 웹 애플리케이션입니다.

## ✨ 주요 기능

- **실시간 미리보기**: 카드를 작성하면서 바로 결과 확인
- **앞면/뒷면 구성**: 나의 미덕과 친구의 칭찬을 각각 기록
- **카드 꾸미기**: 다양한 배경색과 패턴으로 나만의 카드 디자인
- **다양한 다운로드 옵션**: 
  - 앞면/뒷면 개별 이미지 저장
  - PDF (앞뒷면 한 장에) - 인쇄하기 좋음!
  - PDF (앞뒷면 별도 페이지)

## 🎯 사용 방법

1. 왼쪽에서 카드 정보 입력 (학년, 반, 이름, 미덕, 행동)
2. 오른쪽에서 실시간으로 카드 확인
3. 뒤집기 버튼으로 앞면/뒷면 전환
4. 다운로드 버튼으로 저장
5. 클래스팅이나 패들렛에 업로드! 📤

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
│   │   ├── VirtueCard.tsx  # 미덕 카드 (미리보기 + 다운로드)
│   │   └── ui/             # shadcn UI 컴포넌트들
│   ├── pages/
│   │   └── Index.tsx       # 메인 페이지 (작성 + 미리보기 통합)
│   ├── hooks/              # 커스텀 훅
│   ├── lib/                # 유틸리티 함수
│   └── assets/             # 정적 리소스
├── public/                 # 공개 정적 파일
└── ...
```

## 📝 스크립트

- `npm run dev` - 개발 서버 실행
- `npm run build` - 프로덕션 빌드
- `npm run build:dev` - 개발 모드 빌드
- `npm run lint` - ESLint 실행
- `npm run preview` - 빌드 결과 미리보기

## 🎓 교육 활용

이 프로젝트는 **데이터베이스 없이** 개인 학습지처럼 사용할 수 있도록 설계되었습니다:

### 수업 시나리오
1. **선생님**: 학생들에게 URL 공유
2. **학생**: 각자 미덕 카드 작성 및 다운로드
3. **클래스팅/패들렛**: 학생들이 완성한 카드 업로드
4. **함께 보기**: 온라인 플랫폼에서 모든 학생의 카드 감상 및 댓글

### 교육적 가치
- **인성 교육**: 자신과 친구의 긍정적인 면 발견
- **자기성찰**: 미덕 실천 행동 구체화
- **상호 칭찬**: 친구의 미덕을 발견하고 표현
- **디지털 리터러시**: 웹 도구 활용 및 파일 관리

## 🤝 기여

프로젝트 개선을 위한 제안이나 버그 리포트는 언제나 환영합니다!

이슈: https://github.com/plusiam/my-virtue-canvas/issues

## 📄 라이선스

MIT License

## 💝 감사의 말

서로의 미덕을 발견하고 칭찬하며 함께 성장해요!
