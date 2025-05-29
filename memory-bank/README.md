# Memory Bank 운영 가이드

## Memory Bank 구조

- memory-bank/persistent/: 장기 보존 프로젝트 지식, 아키텍처, 규칙, 주요 결정 등
- memory-bank/session/: 단기 작업 맥락, 임시 기록, 현재 세션에서만 필요한 정보 등

## 운영 규칙

- 장기적으로 보존해야 할 정보(프로젝트 개요, 아키텍처, 규칙, 주요 결정 등)는 반드시 persistent/ 하위에 기록
- 단기 작업 맥락, 임시 회의록, 세션별 작업 내역 등은 session/ 하위에 기록(필요시 persistent로 승격)
- 세션 종료/주요 결정 시 session → persistent로 정보 이동/정리
- AI/개발자는 세션 시작 시 persistent/ 전체를 우선 읽고, session/은 현재 맥락 파악용으로 활용

## 예시

- persistent/00-project-overview.md: 프로젝트 개요, 목표, 범위 등
- persistent/01-architecture.md: 시스템 아키텍처, 설계 패턴 등
- session/2024-06-10-dev-log.md: 오늘 작업 내역, 임시 회의록 등

# Memory Bank 사용 가이드

이 디렉토리는 프로젝트의 지속적인 지식 관리를 위한 Memory Bank 입니다.

> ⚠️ 이 디렉토리는 반드시 TaskManagerPlus 하위에만 위치해야 하며, 루트(memory-bank/)에는 별도 폴더를 두지 않습니다.
> 실제 프로젝트 특화 정보/회고/진행 로그 등은 반드시 persistent/ 하위에서만 관리해야 합니다.

## 주요 목적/기능/참고

- 반복 오류/맥락 단절 없는 효율적 프로젝트 관리
- 태스크 자동 분할, 우선순위 추천, 회고/진행 로그 자동화
- 1인 개발/AI 협업/비개발자도 쉽게 적용 가능
- Eisenhower 매트릭스 + AI 추천 기반 우선순위 관리
- 태스크 자동 분할(복잡도/오류 감지)
- 태스크 상태/진행/관계(상위/하위/의존성) 관리
- 회고/피드백/난이도 평가 및 Memory Bank 자동 기록
- 진행 상황 시각화(칸반, 리스트, 간트, 버블 등)
- 알림/리마인더(우선순위, 집중 태스크, 회고 요청 등)
- 태스크-기획서/코드/문서/MCP(외부 리소스) 연결
- 변경 이력/사유 자동 기록, AI 요약 제공
- 통계/분석/리포트 자동화

## 참고 문서/링크

- [Eisenhower Matrix](https://en.wikipedia.org/wiki/Time_management#The_Eisenhower_Method)
- [MoSCoW Method](https://en.wikipedia.org/wiki/MoSCoW_method)
- [RICE Scoring](https://www.intercom.com/blog/rice-scoring-model/)
- [Notion 공식 가이드](https://www.notion.so/)
- [GitHub Docs](https://docs.github.com/)

---

> 최신 모범사례와 실제 코드베이스 경험을 모두 반영한 구조입니다.
> 실제 사용하며 개선점을 자유롭게 추가하세요.

## 사용 방법

1. **항상 최신 상태 유지**: 주요 변경, 아키텍처 결정, 릴리즈 등 발생 시 즉시 업데이트
2. **정기 리뷰**: 주기적으로 내용을 검토하고 불필요한 정보는 정리
3. **구체적으로 작성**: 예시, 코드 스니펫, 명확한 설명 포함
4. **진행 로그 기록**: `05-progress-log.md`에 타임라인 형태로 주요 변경 사항 기록

## 확장 예시

- 대규모 프로젝트의 경우 도메인별로 하위 디렉토리 분리 가능

---

> 자세한 구현 가이드는 [Apidog Cline Memory Bank 가이드](https://apidog.com/kr/blog/cline-memory-cursor-kr/) 참고
