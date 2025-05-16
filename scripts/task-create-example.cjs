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
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(
  `\n[온보딩 안내]\n프로젝트의 기획서(요구사항 문서) 위치를 알려주세요.\n아래 중 한 가지 방법을 선택해 입력하시면, 자동으로 태스크를 추천해드립니다.\n\n1) 이 채팅창에 기획서 파일을 드래그&드롭(첨부)하세요.\n   - PDF, Word, txt, md 등 다양한 포맷 지원\n   - 파일 첨부 후 자동으로 분석이 시작됩니다.\n\n2) 파일 경로 입력: 내 컴퓨터에 저장된 파일 경로를 입력하세요.\n   예시: ./docs/spec.md\n   실패 시: 경로/이름 확인\n\n3) 링크(URL) 입력: 웹에서 접근 가능한 문서 주소를 입력하세요.\n   예시: https://notion.so/xxx\n   실패 시: 공개/권한 확인\n\n4) MCP(외부 문서 시스템): 시스템 종류와 문서 위치(주소)를 입력하세요.\n   예시: Notion, https://notion.so/xxx\n   실패 시: 인증/토큰 준비\n\n5) API(외부 시스템 연동): 엔드포인트(URL)와 인증 정보를 입력하세요.\n   예시: https://api.example.com/spec, API 토큰: xxxxx\n   실패 시: 인증/네트워크 확인\n\n※ 첨부/입력 오류, 권한 문제, 인증 필요 등 발생 시 안내에 따라 재시도하세요.\n※ 외부 시스템 연결 시, 인증 정보는 안전하게 관리하세요.\n\n입력 예시를 참고해 기획서 파일을 첨부하거나 위치를 입력해 주세요!\n`,
);

rl.question("예시 샘플 태스크 파일을 생성할까요? (Y/N): ", (answer) => {
  if (answer.trim().toLowerCase() === "y") {
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
    const output = `# Task: ${task.title}\n- 상태: ${task.status}\n- 우선순위: ${task.priority}\n- 긴급/중요: 긴급(${task.eisenhower.urgent}), 중요(${task.eisenhower.important})\n- 참고 문서: ${task.reference}\n- 설명: ${task.description}\n- 생성일: ${task.createdAt}\n- 마감일: ${task.dueDate}\n- 예상 복잡도: ${task.complexity}\n- 예상 소요 시간: ${task.estimatedMinutes}분\n- 담당자: ${task.assignee}\n- 태그: ${task.tags.join(", ")}\n- 상위/하위: ${task.parent}\n- 의존성: ${task.dependency}\n- 관련 파일: ${task.files.join(", ")}\n`;
    // templates/ 폴더에 상대경로로 저장
    fs.writeFileSync(
      path.join(__dirname, "../templates/task-sample.md"),
      output,
    );
    console.log(
      "태스크 예시 파일이 templates/task-sample.md로 생성되었습니다.",
    );
  } else {
    console.log("예시 샘플 태스크 파일 생성 없이 온보딩 안내만 출력했습니다.");
  }
  rl.close();
});
