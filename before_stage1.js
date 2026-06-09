// ==========================================
// 1. 전역 상태 및 씬 관리 변수 (통합)
// ==========================================
if (typeof scene === "undefined") {
  var scene = "start"; 
}

// 스토리 대화 인덱스 및 데이터 변수
let dialogues;
let dialogueIndex = 0;

// ==========================================
// 2. 배경 및 캐릭터 이미지 변수
// ==========================================
let bgCastle;
let bgHall;
let bgMonastery;

let mainChar;
let maidIcon;

let bg1;
let bg2;
let mainIcon;

// ==========================================
// 3. p5.js 생명주기 함수
// ==========================================
function preload() {
  if (typeof preloadMinigame === "function") {
    preloadMinigame();
  }

  // 기본 UI용 이미지 로드
  bg1 = loadImage("street.png");
  bg2 = loadImage("street.png");

  // 새로운 스토리 배경 이미지 로드
  bgCastle = loadImage("kingdom.png");
  bgHall = loadImage("hallway.png");
  bgMonastery = loadImage("bgMonastery.png");

  // 새로운 스토리 캐릭터 이미지 로드
  mainChar = loadImage("mainChar.png");
  maidIcon = loadImage("maid.png");
  
  // 🌟 [stage1.js 연동] 보스전 전용 에셋 preloader 함수 호출 추가
  if (typeof stage1Preload === "function") {
    stage1Preload();
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  if (typeof setupMinigame === "function") {
    setupMinigame();
  }

  // 대사 데이터 초기화
  dialogues = [
    { speaker: "", text: "(성문이 열리고 왕국 내부로 진입한다.)", bg: "castle", icon: null },
    { speaker: "["+userName+"]", text: "생각보다 평화롭군…", bg: "castle", icon: mainChar },
    { speaker: "[카렌]", text: "겉보기에는 그렇습니다.", bg: "castle", icon: man },
    { speaker: "", text: "(왼쪽 복도에서 누군가가 다가온다.)", bg: "castle", icon: null },
    { speaker: "[시녀]", text: "여기까지 오시느라 고생 많으셨습니다.", bg: "castle", icon: maidIcon },
    { speaker: "[시녀]", text: "저는 이 왕궁의 시녀입니다.\n후보자님의 시중을 들라는 명을 받았습니다.", bg: "castle", icon: maidIcon },
    { speaker: "[시녀]", text: "다음 테스트를 위해 최선을 다하겠습니다.", bg: "castle", icon: maidIcon },
    { speaker: "["+userName+"]", text: "테스트?", bg: "castle", icon: mainChar },
    { speaker: "[카렌]", text: "이곳에서는 왕이 되기 위해\n자격을 증명해야 합니다.", bg: "castle", icon: man },
    { speaker: "[카렌]", text: "두 개의 테스트를 통과해야\n왕의 자격을 얻을 수 있습니다.", bg: "castle", icon: man },
    { speaker: "[시녀]", text: "피곤하실 테니\n방으로 안내하겠습니다.", bg: "castle", icon: maidIcon },
    { speaker: "[시녀]", text: "…곧 첫 번째 테스트가 시작됩니다.", bg: "castle", icon: maidIcon },
    { speaker: "", text: "(수행원을 따라 왕국 복도로 이동한다.)", bg: "hall", icon: null },
    { speaker: "["+userName+"]", text: "첫 번째 테스트 상대는 뭐지?", bg: "hall", icon: mainChar },
    { speaker: "[카렌]", text: "전쟁광 수도승입니다.", bg: "hall", icon: man },
    { speaker: "[카렌]", text: "원래는 이 수도원의 관리인이었으나\n10년 전 전쟁에서 가족을 잃고\n미쳐버려 전쟁광이 되었죠.", bg: "hall", icon: man },
    { speaker: "[카렌]", text: "현재 폐허가 된 수도원을\n점거하고 있습니다.", bg: "hall", icon: man },
    { speaker: "[카렌]", text: "수도승을 처치하고\n수도원을 되찾으십시오.", bg: "hall", icon: man },
    { speaker: "[카렌]", text: "이곳이 첫 번째 테스트 장소입니다.", bg: "monastery", icon: man },
    { speaker: "", text: "(멀리서 종소리가 들린다)", bg: "monastery", icon: null },
    { speaker: "["+userName+"]", text: "…종소리?", bg: "monastery", icon: mainChar },
    { speaker: "[카렌]", text: "조심하십시오.", bg: "monastery", icon: man },
    { speaker: "[수도승]", text: "새로운 후보인가.", bg: "monastery", icon: null },
    { speaker: "[수도승]", text: "다른 후보들처럼\n금방 죽고 말겠지만…", bg: "monastery", icon: null }
  ];

  // 🌟 [stage1.js 연동] 보스전 전용 컴포넌트(inputBox 등) 초기화 함수 호출
  if (typeof stage1Setup === "function") {
    stage1Setup();
  }
}

function draw() {
  background(0);

  // 미니게임 및 선택지 분기 렌더링 유지
  if (scene === "info") { if (typeof infoScene === "function") infoScene(); } 
  else if (scene === "game") { if (typeof miniScene === "function") miniScene(); } 
  else if (scene === "lose") { if (typeof loseScene === "function") loseScene(); } 
  else if (scene === "ending_0") { if (typeof ending0 === "function") ending0(); } 
  else if (scene === "storyWin") { if (typeof storyWinScene === "function") storyWinScene(); } 
  else if (scene === "nameInput") { if (typeof nameScene === "function") nameScene(); } 
  else if (scene === "afterName") { if (typeof afterNameScene === "function") afterNameScene(); } 
  else if (scene === "choice") { if (typeof choiceScene === "function") choiceScene(); } 
  else if (scene === "accept") { if (typeof acceptScene === "function") acceptScene(); } 
  else if (scene === "refuse") { if (typeof refuseScene === "function") refuseScene(); } 
  else if (scene === "ending_1") { if (typeof ending1Scene === "function") ending1Scene(); }
  
  // 메인 스토리 씬 구역
  else if (scene === "story") {
    if (typeof inputBox !== "undefined") inputBox.hide(); // 스토리 도중 타자창 숨김 고정
    drawStoryScene();
  } 
  
  // 🌟 [변경] 첫 번째 보스전 연동 구역 (정적 텍스트를 걷어내고 stage1.js의 핵심 엔진 실행)
  else if (scene === "stage1") {
    if (typeof stage1Draw === "function") {
      stage1Draw(); 
    }
  }
}

// ==========================================
// 4. 독립형 메인 스토리 렌더링 함수
// ==========================================
function drawStoryScene() {
  let d = dialogues[dialogueIndex];
  let currentSpeaker = d.speaker;
  if (currentSpeaker === "["+userName+"]" && typeof userName !== "undefined" && userName.trim() !== "") {
    currentSpeaker = "[" + userName + "]";
  }

  // 배경 출력
  if (d.bg === "castle") image(bgCastle, 0, 0, width, height);
  else if (d.bg === "hall") image(bgHall, 0, 0, width, height);
  else if (d.bg === "monastery") image(bgMonastery, 0, 0, width, height);

  // 대사창
  fill(255, 180);
  rectMode(CENTER);
  rect(windowWidth / 2, windowHeight / 1.3, windowWidth / 1.2, windowHeight / 3);

  // 화자 이름
  fill(0);
  textAlign(LEFT, CENTER);
  textSize(30);
  text(currentSpeaker, windowWidth / 6, windowHeight / 1.5);

  // 대사 본문
  textAlign(CENTER, CENTER);
  textSize(30);
  text(d.text, windowWidth / 2, windowHeight / 1.3);

  // 캐릭터 아이콘
  if (d.icon != null) {
    image(d.icon, windowWidth / 7, windowHeight /5.8, 330, 330);
  }

  // 안내 문구
  fill(255);
  textSize(22);
  text(">> ENTER 키를 눌러 진행", windowWidth / 1.4, windowHeight - 52);
}

// ==========================================
// 5. 키보드 및 마우스 입력 가로채기(인터랙션) 분기점
// ==========================================
function keyPressed() {
  // 🌟 [stage1.js 연동] 현재 스테이지1 배틀 플레이 상태라면 키 입력을 stage1의 전용 인터랙션 함수로 패스합니다.
  if (scene === "stage1") {
    if (typeof stage1KeyPressed === "function") {
      stage1KeyPressed();
    }
    return;
  }

  // 스페이스바 연타 인터랙션 처리 (미니게임 플레이 중)
  if (scene === "game" && keyCode === 32) {
    if (typeof power !== "undefined") power += 3.5;
    return;
  }

  // 메인 스토리 씬에서의 엔터 넘기기 처리
  if (scene === "story") {
    if (keyCode === ENTER) {
      dialogueIndex++;
      if (dialogueIndex >= dialogues.length) {
        scene = "stage1"; // 🌟 모든 대사가 끝나면 스테이지 1 게임으로 체인지!
      }
    }
    return;
  }

  // 기존 미니게임/대화창 씬 전환용 범용 엔터 입력 가이딩
  if (keyCode === ENTER) {
    if (scene === "storyWin" && typeof winIndex !== "undefined") {
      winIndex++;
    } else if (scene === "accept" && typeof acceptIndex !== "undefined") {
      acceptIndex++;
    } else if (scene === "refuse" && typeof refuseIndex !== "undefined") {
      refuseIndex++;
    } else if (scene === "nameInput") {
      if (typeof nameInput !== "undefined") {
        userName = nameInput.value();
        if (userName.trim() !== "") {
          nameInput.hide();
          afterNameDialogues = [
            { speaker: "[카렌]", text: userName + "입니다." },
            { speaker: "[카렌]", text: "그럼 " + userName + ", 왕국으로 가시겠습니까?" }
          ];
          afterNameIndex = 0;
          scene = "afterName";
        }
      }
    } else if (scene === "afterName" && typeof afterNameIndex !== "undefined") {
      afterNameIndex++;
    }
  }
}

function mousePressed() {
  if (scene === "start") { scene = "info"; } 
  else if (scene === "choice") {
    if (mouseX >= windowWidth / 1.5 - 125 && mouseX <= windowWidth / 1.5 + 125 && mouseY >= windowHeight / 3 - 40 && mouseY <= windowHeight / 3 + 40) {
      scene = "accept";
      if (typeof acceptIndex !== "undefined") acceptIndex = 0;
    } else if (mouseX >= windowWidth / 1.5 - 125 && mouseX <= windowWidth / 1.5 + 125 && mouseY >= windowHeight / 2 - 40 && mouseY <= windowHeight / 2 + 40) {
      scene = "refuse";
      if (typeof refuseIndex !== "undefined") refuseIndex = 0;
    }
  } 
  else if (scene === "ending_0") {
    if (mouseX >= windowWidth / 2 - 250 && mouseX <= windowWidth / 2 + 250 && mouseY >= windowHeight / 1.13 - 25 && mouseY <= windowHeight / 1.13 + 25) {
      if (typeof power !== "undefined") power = 15;
      if (typeof winTimer !== "undefined") winTimer = 0;
      if (typeof loseTimer !== "undefined") loseTimer = 0;
      scene = "info"; 
    } else if (mouseX >= windowWidth / 2 - 250 && mouseX <= windowWidth / 2 + 250 && mouseY >= windowHeight / 1.05 - 25 && mouseY <= windowHeight / 1.05 + 25) {
      scene = "start"; 
    }
  } 
  else if (scene === "ending_1") {
    if (mouseX >= windowWidth / 1.5 - 125 && mouseX <= windowWidth / 1.5 + 125 && mouseY >= windowHeight / 3 - 40 && mouseY <= windowHeight / 3 + 40) {
      scene = "choice";
    } else if (mouseX >= windowWidth / 1.5 - 125 && mouseX <= windowWidth / 1.5 + 125 && mouseY >= windowHeight / 2 - 40 && mouseY <= windowHeight / 2 + 40) {
      scene = "start";
    }
  } 
  else if (scene === "info") { scene = "game"; } 
  else if (scene === "lose") { scene = "ending_0"; }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}