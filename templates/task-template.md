# Task Template (예시)

- **제목(Task Title)**:
- **상태(Status)**: Backlog / In Progress / Review / Done / On Hold / Cancelled
- **우선순위(Priority)**: 1~10 (1이 가장 높음)
- **긴급/중요(Eisenhower)**: 긴급(Y/N), 중요(Y/N)
- **참고 문서/기획서(Reference)**: [Notion 링크/섹션 등]
- **설명(Description)**:
- **생성일(Created At)**: YYYY-MM-DD HH:MM (KST)
- **마감일(Due Date)**: YYYY-MM-DD HH:MM (KST, 선택)
- **예상 복잡도(Complexity)**: 1~10
- **예상 소요 시간(Estimated Minutes)**:
- **담당자(Assignee)**:
- **태그/카테고리(Tags)**:
- **상위/하위 관계(Parent/Child)**:
- **의존성(Dependency)**:
- **관련 파일/코드/문서/커밋/PR/MCP**:

---

## 진행 로그(History)

- YYYY-MM-DD HH:MM (KST) | 변경자 | 변경 내용/사유

---

## 회고/피드백(Feedback)

- **실제 소요 시간(Actual Minutes)**:
- **실제 난이도(Actual Complexity)**: 1~10
- **느낀 점/회고(Review/Reflection)**:
- **예상 vs 실제 차이**: (자동 비교)
- **소요시간에 영향을 준 주요 원인(Delay/Boost Factors)**:
- **코드/작업 품질 평가(Quality Assessment)**: (예시: 주니어/시니어/아키텍처 수준, 또는 자체 기준)
- **AI 요약/개선점 추천**: (자동)

## ✅ 품질 체크리스트

- [ ] 클린코드 원칙 준수
- [ ] 린트/포맷팅 통과
- [ ] 테스트 작성 및 통과
- [ ] 코드 리뷰 완료
- [ ] 문서화(README/API 등) 최신화
- [ ] 주요 변경/회고 memory-bank 연동

## 개발 단계별 품질 점검 체크리스트

### 개발 시작

- [ ] 린트/포맷팅 규칙 확인
- [ ] 네이밍/파일 구조 규칙 확인
- [ ] 테스트/문서화 기준 확인

### 복잡도 높은 코드 구현 직후

- [ ] Cyclomatic Complexity 10 초과 시 함수 분리/리팩토링
- [ ] 린트 오류 0개
- [ ] 테스트 통과
- [ ] 기준 미달 시 즉시 보완/리팩토링

### 개발 종료/릴리즈 전

- [ ] 린트 오류 0개
- [ ] 테스트 커버리지 기준 충족(예: 80% 이상)
- [ ] 정적 분석 주요 이슈 0개
- [ ] 코드 복잡도/중복/문서화 등 선택 지표 기준 충족
- [ ] 품질 체크리스트/회고 기록 완료
- [ ] 기준 미달 시 즉시 수정/보완/리팩토링

---

> 코드/작업 품질 평가 항목을 통해 품질 수준의 일관성을 주기적으로 체크하세요.
