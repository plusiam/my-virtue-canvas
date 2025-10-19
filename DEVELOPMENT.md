# 나만의 미덕 카드 - 개발 메모

## 삭제된 컴포넌트 (백업)

### CardEditor.tsx
- 역할: 탭 기반 카드 생성 에디터
- 이유: Index.tsx에 통합됨
- 삭제일: 2025-10-19

### VirtueWall.tsx  
- 역할: 카드 갤러리 표시
- 이유: 데이터베이스 없이 개인 학습지 컨셉으로 변경됨
- 삭제일: 2025-10-19

## 현재 구조

```
Index.tsx - 카드 작성 + 실시간 미리보기 + 다운로드
VirtueCard.tsx - 카드 표시 + 뒤집기 + 다운로드 기능
```

## 복원 방법

Git 히스토리에서 복원 가능:
```bash
git log --all --full-history -- src/components/CardEditor.tsx
git checkout <commit-hash> -- src/components/CardEditor.tsx
```
