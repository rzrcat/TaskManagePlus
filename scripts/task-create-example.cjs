/**
 * 태스크 생성 자동화 예시 스크립트 (대화문+맥락 안내 강화)
 * (실제 프로젝트에서는 API/DB 연동 등으로 확장)
 *
 * 온보딩(최초 클론/설치) 시 자동 실행 예시:
 *   package.json의 scripts/onboard 또는 postinstall에 등록하거나,
 *   README.md에 'node scripts/task-create-example.js' 실행 안내 추가
 */

const fs = require("fs");
const path = require("path");
const readline = require("readline");

// 스크립트가 어디서 실행되든 자신의 실제 위치(Task-template/scripts/)를 기준으로 프로젝트 루트(Task-template/)를 자동 인식
const projectRoot = path.resolve(__dirname, "..");
const templatesDir = path.join(projectRoot, "templates");
const featureListPath = path.join(templatesDir, "task-feature-list.md");

// package.json에서 프로젝트명 동적 추출
let projectName = "프로젝트";
try {
  const pkg = JSON.parse(
    fs.readFileSync(path.join(projectRoot, "package.json"), "utf-8"),
  );
  projectName = pkg.name || pkg.description || "프로젝트";
} catch (e) {
  // package.json이 없거나 파싱 실패 시 기본값 유지
}

// templates 폴더가 없으면 자동 생성
if (!fs.existsSync(templatesDir)) {
  fs.mkdirSync(templatesDir, { recursive: true });
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 0단계: 온보딩 방식 선택
function onboardingStart() {
  console.log(
    `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n안녕하세요! 👋 ${projectName} 온보딩을 시작합니다.\n\n이 온보딩은 프로젝트 관리 자동화, 협업 효율화, 태스크 추천을 위해 준비됐어요.\n\n1) 단계별 안내(추천)\n   - 각 단계마다 설명과 예시, 선택지가 나와요.\n   - 초보자/팀원 모두에게 권장!\n\n2) 빠른 자동 온보딩\n   - 분석 기준만 고르면 나머지는 자동 진행!\n   - 빠르게 태스크 추천까지 한 번에!\n\n(언제든 'q'를 입력하면 온보딩을 중단할 수 있어요)\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\uD83D\uDC49 원하는 번호를 입력해 주세요! (1/2, 기본 1):\n`,
  );
  rl.question("", (mode) => {
    if (mode.trim().toLowerCase() === "2") {
      quickMode();
    } else if (mode.trim().toLowerCase() === "q") {
      quit();
    } else {
      onboardingStep1();
    }
  });
}

// 빠른 자동 온보딩
function quickMode() {
  console.log(
    "\n빠른 자동 온보딩을 선택하셨군요!\n분석 기준만 골라주시면,\n분석→기능명세→태스크 추천까지 모두 자동으로 진행됩니다.",
  );
  rl.question(
    "\n[빠른 온보딩] 어떤 기준으로 프로젝트를 분석할까요?\n1) 프로젝트(코드/구조)\n2) 기획서(문서/Notion 등)\n3) 둘 다(종합 분석)\n(h: 도움말, q: 그만두기)\n\uD83D\uDC49 입력: ",
    (ans) => {
      if (ans.trim().toLowerCase() === "q") return quit();
      if (["h", "?"].includes(ans.trim().toLowerCase())) {
        console.log(
          "1: 실제 코드/폴더/구현 현황 분석, 2: 기획서/요구사항 문서 분석, 3: 둘 다 종합 분석입니다.",
        );
        return quickMode();
      }
      if (!["1", "2", "3"].includes(ans.trim())) {
        console.log(
          "앗, 입력이 잘못된 것 같아요. 1,2,3,h,q 중에서 골라주세요!",
        );
        return quickMode();
      }
      console.log(
        "\n좋아요! 분석을 시작할게요. (기능 명세/태스크 추천까지 자동 진행)",
      );
      featureListStep();
    },
  );
}

function onboardingStep1() {
  console.log(
    `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n[1단계] 프로젝트의 기획서 위치를 입력하는 단계입니다.\n\n이 정보는 자동 분석 및 태스크 추천에 활용돼요!\n\n- 파일 경로, URL, 드래그&드롭 모두 가능해요.\n- 예시: ./docs/spec.md, https://notion.so/xxx, mcp (Cursor MCP Server)\n- 'mcp'는 Cursor에서 지원하는 MCP Server를 의미해요.\n\n(h: 도움말, q: 그만두기)\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\uD83D\uDC49 기획서 위치를 입력해 주세요:\n`,
  );
  rl.question("", (ans) => {
    if (ans.trim().toLowerCase() === "q") return quit();
    if (["h", "?"].includes(ans.trim().toLowerCase())) {
      console.log(
        `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n[도움말]\n- 예시: ./docs/spec.md, https://notion.so/xxx, mcp (Cursor MCP Server)\n- PDF, Word, txt, md 등 지원\n- 외부 시스템(Notion, API 등)도 OK!\n- 'mcp'는 Cursor에서 지원하는 MCP Server를 의미해요.\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`,
      );
      return onboardingStep1();
    }
    // 실제 입력값 검증/분석 생략(샘플)
    checkMcpEnvironmentAndProceed(onboardingStep2);
  });
}

function onboardingStep2() {
  console.log(
    "\n[2단계] 예시 태스크 파일 생성 여부를 선택하는 단계입니다.\n실제 태스크 관리가 어떻게 되는지 미리 체험해볼 수 있어요!\nY: 네, 만들어주세요!  N: 아니요, 건너뛸게요.\n(h: 도움말, q: 그만두기)\n\uD83D\uDC49 입력:",
  );
  rl.question("", (ans) => {
    if (ans.trim().toLowerCase() === "q") return quit();
    if (["h", "?"].includes(ans.trim().toLowerCase())) {
      console.log(
        "Y: 예시 태스크 생성, N: 건너뜀. 생성 시 templates/task-sample.md에 저장돼요.\n- 예시 태스크: 로그인 오류 수정, MCP 구조 설계 등\n",
      );
      return onboardingStep2();
    }
    if (ans.trim().toLowerCase() === "y") {
      const tasks = [
        {
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
        },
        {
          title: "MCP 구조 설계",
          status: "Backlog",
          priority: 1,
          eisenhower: { urgent: false, important: true },
          reference: "./docs/mcp.md",
          description:
            "마비노기 커뮤니티 플랫폼(MCP) 전체 구조 및 핵심 기능 설계 문서 작성",
          createdAt: "2025-05-17 10:00",
          dueDate: "2025-05-20 18:00",
          complexity: 5,
          estimatedMinutes: 180,
          assignee: "rzrcat",
          tags: ["mcp", "architecture"],
          parent: null,
          dependency: null,
          files: ["docs/mcp.md"],
        },
      ];
      let output = "";
      for (const task of tasks) {
        output += `# Task: ${task.title}\n- 상태: ${task.status}\n- 우선순위: ${task.priority}\n- 긴급/중요: 긴급(${task.eisenhower.urgent}), 중요(${task.eisenhower.important})\n- 참고 문서: ${task.reference}\n- 설명: ${task.description}\n- 생성일: ${task.createdAt}\n- 마감일: ${task.dueDate}\n- 예상 복잡도: ${task.complexity}\n- 예상 소요 시간: ${task.estimatedMinutes}분\n- 담당자: ${task.assignee}\n- 태그: ${task.tags.join(", ")}\n- 상위/하위: ${task.parent}\n- 의존성: ${task.dependency}\n- 관련 파일: ${task.files.join(", ")}\n\n`;
      }
      fs.writeFileSync(path.join(templatesDir, "task-sample.md"), output);
      console.log(
        "좋아요! 예시 태스크 파일(로그인 오류 수정, MCP 구조 설계)을 만들어뒀어요. (templates/task-sample.md)",
      );
    } else {
      console.log("알겠습니다, 예시 파일은 건너뛸게요!");
    }
    onboardingStep3();
  });
}

function onboardingStep3() {
  console.log(
    "\n[3단계] 분석 기준을 선택하는 단계입니다.\n이 기준에 따라 어떤 방식으로 태스크를 추천할지 결정돼요!\n1) 프로젝트(코드/구조)\n2) 기획서(문서/Notion 등)\n3) 둘 다(종합 분석)\n(h: 도움말, q: 그만두기)\n\uD83D\uDC49 입력:",
  );
  rl.question("", (ans) => {
    if (ans.trim().toLowerCase() === "q") return quit();
    if (["h", "?"].includes(ans.trim().toLowerCase())) {
      console.log(
        "1: 실제 코드/폴더/구현 현황 분석, 2: 기획서/요구사항 문서 분석, 3: 둘 다 종합 분석입니다.",
      );
      return onboardingStep3();
    }
    if (!["1", "2", "3"].includes(ans.trim())) {
      console.log("앗, 입력이 잘못된 것 같아요. 1,2,3,h,q 중에서 골라주세요!");
      return onboardingStep3();
    }
    console.log(
      "좋아요! 분석을 시작할게요. (기능 명세/태스크 추천까지 자동 진행)",
    );
    featureListStep();
  });
}

function featureListStep() {
  if (!fs.existsSync(featureListPath)) {
    rl.question(
      "\n[4단계] 기능 명세(Feature List) 자동화 단계입니다.\n아직 기능 명세가 없어요. 자동으로 만들어드릴까요? (Y/N, h: 도움말, q: 그만두기)\n\uD83D\uDC49 입력: ",
      (ans) => {
        if (ans.trim().toLowerCase() === "q") return quit();
        if (["h", "?"].includes(ans.trim().toLowerCase())) {
          console.log(
            "Y: 자동 생성, N: 건너뜀. 생성 시 templates/task-feature-list.md에 저장돼요.\n- 예시: 회원가입, 로그인/로그아웃, 블로그, MCP 구조 설계 등\n",
          );
          return featureListStep();
        }
        if (ans.trim().toLowerCase() === "y") {
          const featureList = `# 기능 명세 목록(Task Feature List)\n\n| 기능명          | 설명                                | 상태 | 담당자 | 일정       | 관련 이슈/PR |\n| --------------- | ----------------------------------- | ---- | ------ | ---------- | ------------ |\n| 회원가입        | 이메일/소셜 회원가입 지원           | 미정 | 미정   | (미정)     |              |\n| 로그인/로그아웃 | JWT 인증, 세션 관리                 | 미정 | 미정   | (미정)     |              |\n| 블로그         | 블로그 기능(작성/조회 등)           | 미정 | 미정   | (미정)     |              |\n| MCP 구조 설계   | 마비노기 커뮤니티 플랫폼(MCP) 설계  | 미정 | 미정   | (미정)     |              |\n`;
          fs.writeFileSync(featureListPath, featureList);
          console.log(
            "기능 명세를 자동으로 만들어뒀어요! (templates/task-feature-list.md)",
          );
        } else {
          console.log("알겠습니다, 기능 명세 자동 생성은 건너뛸게요!");
        }
        finish();
      },
    );
  } else {
    rl.question(
      "\n[4단계] 기능 명세(Feature List) 자동화 단계입니다.\n이미 기능 명세가 있어요. 최신화/보완할까요? (Y/N, h: 도움말, q: 그만두기)\n\uD83D\uDC49 입력: ",
      (ans) => {
        if (ans.trim().toLowerCase() === "q") return quit();
        if (["h", "?"].includes(ans.trim().toLowerCase())) {
          console.log(
            "Y: 자동 보완, N: 건너뜀. 필요시 직접 수정도 가능해요!\n- 예시: MCP 구조 설계 등 주요 기능이 누락됐다면 자동 추가됩니다.\n",
          );
          return featureListStep();
        }
        if (ans.trim().toLowerCase() === "y") {
          let featureList = fs.readFileSync(featureListPath, "utf-8");
          if (!featureList.includes("블로그")) {
            featureList +=
              "| 블로그         | 블로그 기능(작성/조회 등)           | 미정 | 미정   | (미정)     |              |\n";
          }
          if (!featureList.includes("MCP 구조 설계")) {
            featureList +=
              "| MCP 구조 설계   | 마비노기 커뮤니티 플랫폼(MCP) 설계  | 미정 | 미정   | (미정)     |              |\n";
          }
          fs.writeFileSync(featureListPath, featureList);
          console.log("기능 명세를 자동으로 보완했어요!");
        } else {
          console.log("알겠습니다, 기능 명세 보완은 건너뛸게요!");
        }
        finish();
      },
    );
  }
}

function finish() {
  console.log(
    "\n온보딩이 모두 끝났어요! 🎉 프로젝트 관리의 첫걸음을 함께해주셔서 감사합니다. 언제든 다시 실행해도 좋아요!",
  );
  rl.close();
}

function quit() {
  console.log("온보딩을 중단했어요. 언제든 다시 시작할 수 있습니다!");
  rl.close();
}

// MCP Server 지원 에디터 최신 정보 조회 (웹 검색 기반, 예시)
async function getLatestMcpSupportedEditors() {
  // 실제 구현에서는 공식 API/웹 크롤링 등으로 대체
  // 예시: 2025년 5월 기준 공식 지원 에디터 목록
  return [
    { name: "Cursor", official: true },
    // { name: "VSCode", official: false }, // 비공식/실험적 지원 예시
    // 기타 공식/비공식 에디터 추가 가능
  ];
}

// 현재 실행 중인 에디터 감지 (보강)
function detectCurrentEditor() {
  // 1. 환경변수 기반
  if (process.env.CURSOR_AGENT) return "Cursor";
  // 2. 프로세스명/타이틀 기반
  if (
    (process.title && process.title.toLowerCase().includes("cursor")) ||
    (process.argv && process.argv.join(" ").toLowerCase().includes("cursor"))
  ) {
    return "Cursor";
  }
  // 3. 기타 환경 신호 (예시)
  if (
    process.env.TERM_PROGRAM &&
    process.env.TERM_PROGRAM.toLowerCase().includes("cursor")
  )
    return "Cursor";
  if (process.env.PWD && process.env.PWD.toLowerCase().includes("cursor"))
    return "Cursor";
  // VSCode
  if (process.env.VSCODE_PID) return "VSCode";
  // JetBrains 등 추가 가능
  return "Unknown";
}

// MCP 연결 여부 환경변수 기반 감지
function isMcpConnected() {
  // 공식적으로 알려진 환경변수 기반 (확장 가능)
  if (process.env.CURSOR_AGENT) return true;
  // 추가 환경변수(예: MCP_SERVER, CURSOR_CONTEXT 등)도 필요시 체크
  // if (process.env.MCP_SERVER) return true;
  // if (process.env.CURSOR_CONTEXT) return true;
  return false;
}

// MCP 선택 시 환경 체크 및 안내 (환경변수 기반 우선)
async function checkMcpEnvironmentAndProceed(nextStep) {
  if (isMcpConnected()) {
    console.log(
      "\n[MCP 연결: 활성화됨] Cursor MCP Server가 정상적으로 감지되었습니다.\n",
    );
    nextStep();
    return;
  }
  const editors = await getLatestMcpSupportedEditors();
  const current = detectCurrentEditor();
  const supported = editors.map((e) => e.name);
  if (!supported.includes(current)) {
    console.log(
      `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n⚠️ 현재 사용 중인 에디터(${current})에서는 MCP Server를 공식 지원하지 않습니다.\n\n[MCP Server 공식 지원 에디터 목록]`,
    );
    for (const e of editors) {
      console.log(
        `- ${e.name}${e.official ? " (공식 지원)" : " (비공식/실험적)"}`,
      );
    }
    console.log(
      "\nMCP Server를 사용하려면 위 에디터 중 하나에서 실행해 주세요.\n(최신 정보는 공식 문서/사이트 참고)\n",
    );
    // 디버깅용 환경 정보 출력
    console.log("[디버깅] 주요 환경변수/정보:");
    console.log("process.title:", process.title);
    console.log("process.argv:", process.argv.join(" "));
    console.log("process.env.CURSOR_AGENT:", process.env.CURSOR_AGENT);
    console.log("process.env.TERM_PROGRAM:", process.env.TERM_PROGRAM);
    console.log("process.env.PWD:", process.env.PWD);
    rl.question(
      "MCP 대신 기획서 파일/URL을 직접 입력하거나 온보딩을 종료할 수 있습니다.\n1) 기획서 파일/URL 직접 입력\n2) 온보딩 종료\n(※ Cursor 환경이 감지되지 않을 경우, 환경변수/실행 방식/버전을 확인해 주세요)\n\uD83D\uDC49 원하는 번호를 입력해 주세요! (1/2): ",
      (ans) => {
        if (ans.trim() === "2") return quit();
        onboardingStep1();
      },
    );
    return;
  }
  // 지원 환경이면 다음 단계로 진행
  nextStep();
}

onboardingStart();
