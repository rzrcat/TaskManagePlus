# Task Manager + Memory Bank 템플릿

이 저장소는 AI/자동화 기반 프로젝트 관리에 최적화된 Task Manager와 Memory Bank 구조의 실전 템플릿입니다.

## 온보딩(시작) 안내

프로젝트의 기획서(요구사항 문서) 위치를 아래 방법 중 하나로 입력하면, 자동으로 태스크를 추천해드립니다.

1. **이 채팅창에 기획서 파일을 드래그&드롭(첨부)하세요.**

   - PDF, Word, txt, md 등 다양한 포맷 지원
   - 파일 첨부 후 자동 분석

2. 파일 경로 입력: 내 컴퓨터에 저장된 파일 경로를 입력

   - 예시: ./docs/spec.md
   - 실패 시: 경로/이름 확인

3. 링크(URL) 입력: 웹에서 접근 가능한 문서 주소 입력

   - 예시: https://notion.so/xxx
   - 실패 시: 공개/권한 확인

4. MCP(외부 문서 시스템): 시스템 종류와 문서 위치(주소) 입력

   - 예시: Notion, https://notion.so/xxx
   - 실패 시: 인증/토큰 준비

5. API(외부 시스템 연동): 엔드포인트(URL)와 인증 정보 입력
   - 예시: https://api.example.com/spec, API 토큰: xxxxx
   - 실패 시: 인증/네트워크 확인

※ 첨부/입력 오류, 권한 문제, 인증 필요 등 발생 시 안내에 따라 재시도하세요.
※ 외부 시스템 연결 시, 인증 정보는 안전하게 관리하세요.

## 주요 목적

- 반복 오류/맥락 단절 없는 효율적 프로젝트 관리
- 태스크 자동 분할, 우선순위 추천, 회고/진행 로그 자동화
- 1인 개발/AI 협업/비개발자도 쉽게 적용 가능

## 주요 기능 요약

- Eisenhower 매트릭스 + AI 추천 기반 우선순위 관리
- 태스크 자동 분할(복잡도/오류 감지)
- 태스크 상태/진행/관계(상위/하위/의존성) 관리
- 회고/피드백/난이도 평가 및 Memory Bank 자동 기록
- 진행 상황 시각화(칸반, 리스트, 간트, 버블 등)
- 알림/리마인더(우선순위, 집중 태스크, 회고 요청 등)
- 태스크-기획서/코드/문서/MCP(외부 리소스) 연결
- 변경 이력/사유 자동 기록, AI 요약 제공
- 통계/분석/리포트 자동화

## 폴더/파일 구조 예시

```
Task-template/
├── README.md                # 메인 설명서(이 파일)
├── docs/                    # 상세 가이드/운영 팁
├── templates/               # 태스크/메모리뱅크 예시 템플릿
├── scripts/                 # 자동화/운영 예시 스크립트
└── .gitignore
```

## 참고 문서/링크

- [Eisenhower Matrix](https://en.wikipedia.org/wiki/Time_management#The_Eisenhower_Method)
- [MoSCoW Method](https://en.wikipedia.org/wiki/MoSCoW_method)
- [RICE Scoring](https://www.intercom.com/blog/rice-scoring-model/)
- [Notion 공식 가이드](https://www.notion.so/)
- [GitHub Docs](https://docs.github.com/)

---

> 최신 모범사례와 실제 코드베이스 경험을 모두 반영한 구조입니다.
> 실제 사용하며 개선점을 자유롭게 추가하세요.
