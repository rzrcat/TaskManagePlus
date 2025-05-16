/**
 * 태스크 생성 자동화 예시 스크립트
 * (실제 프로젝트에서는 API/DB 연동 등으로 확장)
 *
 * 온보딩(최초 클론/설치) 시 자동 실행 예시:
 *   package.json의 scripts/onboard 또는 postinstall에 등록하거나,
 *   README.md에 'node scripts/task-create-example.js' 실행 안내 추가
 */

const fs = require("fs");
const path = require("path");

// 태스크 데이터 예시
const task = {
  title: "로그인 오류 수정",
  status: "Backlog",
  priority: 2,
  eisenhower: { urgent: true, important: true },
  reference: "https://notion.so/기획서-로그인-섹션",
  description: "로그인 시 발생하는 500 오류 수정",
  createdAt: "2025-05-17 10:00",
  dueDate: "2025-05-18 18:00",
  complexity: 4,
  estimatedMinutes: 90,
  assignee: "rzrcat",
  tags: ["bug", "auth"],
  parent: null,
  dependency: null,
  files: ["app/features/auth/screens/login.tsx"],
};

// 상대경로만 사용 (현재 파일 기준)
const output = `# Task: ${task.title}
- 상태: ${task.status}
- 우선순위: ${task.priority}
- 긴급/중요: 긴급(${task.eisenhower.urgent}), 중요(${task.eisenhower.important})
- 참고 문서: ${task.reference}
- 설명: ${task.description}
- 생성일: ${task.createdAt}
- 마감일: ${task.dueDate}
- 예상 복잡도: ${task.complexity}
- 예상 소요 시간: ${task.estimatedMinutes}분
- 담당자: ${task.assignee}
- 태그: ${task.tags.join(", ")}
- 상위/하위: ${task.parent}
- 의존성: ${task.dependency}
- 관련 파일: ${task.files.join(", ")}
`;

// templates/ 폴더에 상대경로로 저장
fs.writeFileSync(path.join(__dirname, "../templates/task-sample.md"), output);

console.log("태스크 예시 파일이 templates/task-sample.md로 생성되었습니다.");
