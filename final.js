let dialogues_final;
let dialogueIndex_final = 0;
 
let becomeKing0;
let endingCastle;
 
let dialogues_end1;
let dialogues_end2;
 
// =========================
// 엔딩 상태 변수
// =========================
// 
 
let fadeAlpha2 = 0;
let creditsY; //크래딧 y길이 
let bg4;

let finalBGM;
 
// =========================
// preload
// =========================
function preloadFinal() {
  finalBGM = loadSound("finalBGM.mp3");
  
  becomeKing0 = loadImage("becomeKing0.png");
  endingCastle = loadImage("lastEnding.png");
 
  bg4 = loadImage("bg2.png");
 
  mainChar = loadImage("mainChar.png");
  man = loadImage("man.png");
  plagueDoctorIcon = loadImage("doctor.png");
}
 
// =========================
// setup
// =========================
function setupFinalEnding() {
  // 혹시 브금 남아있으면 강제 종료
  if (gameBGM2 && gameBGM2.isPlaying()) {
    gameBGM2.stop();
  }
  if (!finalBGM.isPlaying()) {
    finalBGM.setVolume(0.5);
    finalBGM.loop();
  }
//크레딧 길이는 높이로 초기화 
  creditsY = height;
 
  dialogues_end1 = [
    { speaker: "", text: "(흑사병 의사가 비틀거리며 무릎을 꿇는다.)", icon: plagueDoctorIcon },
    { speaker: "[흑사병 의사]", text: "…왜…", icon: plagueDoctorIcon },
    { speaker: "[흑사병 의사]", text: "나는… 사람들을…\n구하려고 했을 뿐인데…", icon: plagueDoctorIcon },
    { speaker: "", text: "(흑사병 의사의 가면이\n바닥으로 떨어진다.)", icon: null },
    { speaker: "[나]", text: "…….", icon: mainChar },
    { speaker: "[카렌]", text: "끝났군요.", icon: man },
    { speaker: "[카렌]", text: "그리고 이제…", icon: man },
    { speaker: "[카렌]", text: "후보자님께서는\n두 개의 시험을 모두 통과하셨습니다.", icon: man },
    { speaker: "[카렌]", text: "왕궁으로 돌아가시죠.", icon: man }
  ];
 
  dialogues_end2 = [
    { speaker: "", text: "(거대한 문이 천천히 열린다.)", icon: null },
    { speaker: "", text: "(양옆에는 병사들과 귀족들이\n끝없이 늘어서 있다.)", icon: null },
    { speaker: "", text: "(수많은 시민들의 시선이\n당신에게 향한다.)", icon: null },
    { speaker: "[시민들]", text: "“…저 사람이?”\n“새로운 왕이라고?”\n“술주정뱅이 용병이었다던데…”", icon: null },
    { speaker: "[나]", text: "…….", icon: mainChar },
    { speaker: "", text: "(카렌이 천천히 왕좌 앞으로 걸어나간다.)", icon: null },
    { speaker: "[카렌]", text: "전 왕국민에게 고합니다.", icon: man },
    { speaker: "[카렌]", text: "두 개의 시험을 통과한 자.", icon: man },
    { speaker: "[카렌]", text: "왕국의 혼란을 잠재운 자.", icon: man },
    { speaker: "[카렌]", text: "새로운 국왕의 탄생을 선언합니다.", icon: man },
    { speaker: "", text: "(왕관이 천천히 모습을 드러낸다.)", icon: null },
    { speaker: "[카렌]", text: "앞으로 왕국 아르덴을 이끌 자의 이름은...", icon: man },
    { speaker: "[카렌]", text: userName + " 폐하이십니다.", icon: man },
    { speaker: "", text: "(시민들이 하나둘 \n무릎을 꿇기 시작한다.)", icon: null },
    { speaker: "[시민들]", text: "폐하를 위하여…!", icon: null },
    { speaker: "[나]", text: "며칠 전까지만 해도\n술값도 못 내던 인간이었는데.", icon: mainChar },
    { speaker: "[카렌]", text: "하지만 지금은 아닙니다.", icon: man },
    { speaker: "[카렌]", text: "이제 이 왕국은 당신의 것입니다.", icon: man },
    { speaker: "", text: "(당신이 천천히 왕좌에 앉는다.)", icon: mainChar }
  ];
 
  dialogues_final = dialogues_end1;
  startDialogue();
}
 
// =========================
// draw
// =========================
function drawFinalEnding() {
 
  // =========================
  // 대사 씬
  // =========================
  if (scene === "finalScene") {
    let currentBg = (dialogues_final === dialogues_end1) ? bg4 : becomeKing0;
    background(0);
    image(currentBg, 0, 0, width, height);
 
    // 현재 대사 데이터 바로 가져오기
    let d = dialogues_final[dialogueIndex_final];
 
    // 대사창 및 텍스트 그리기
    fill(255, 180);
    rectMode(CENTER);
    rect(width / 2, height / 1.3, width / 1.2, height / 3);
 
    fill(0);
    textAlign(LEFT, CENTER);
    textSize(30);
    text(d.speaker, width / 6, height / 1.5);
    
    textAlign(CENTER, CENTER);
    // 타이핑 효과 없이 바로 d.text 출력
    text(d.text, width / 2, height / 1.3);
 
    // 아이콘
    if (d.icon != null) {
      image(d.icon, width / 7, height / 5.8, 330, 330);
    }
 
    fill(255);
    textSize(22);
    text(">> ENTER 키를 눌러 진행", width / 1.4, height - 60);
  }
 
  // =========================
  // 페이드 아웃
  // =========================
  else if (scene === "fadeout") {
 
    let currentBg =
      (dialogues_final === dialogues_end1) ? bg4 : becomeKing0;
 
    image(currentBg, 0, 0, width, height);
 
    rectMode(CORNER);
 
  fill(0, fadeAlpha2);
  rect(0, 0, width, height);
 
    fadeAlpha2 += 2;
 
    if (fadeAlpha2 >= 255) {
      scene = "ending";
    }
  }
 
  // =========================
  // 엔딩 화면
  // =========================
  else if (scene === "ending") {
    lastEnding();
  }
 
  // =========================
  // 엔딩 크레딧
  // =========================
  else if (scene === "credits") {
    drawCredits();
  }
}
 
// =========================
// 엔딩 화면
// =========================
function lastEnding() {
 
  image(endingCastle, 0, 0, width, height);
 
  push();
 
  rectMode(CENTER);
 
  fill(200, 30, 30, 150);
  rect(width / 2, height / 2, width / 1.3 + 12, height / 2 + 12, 15);
 
  fill(15, 15, 20, 230);
  rect(width / 2, height / 2, width / 1.3, height / 2, 12);
 
  textAlign(CENTER, CENTER);
 
  // 제목
  textSize(55);
  textStyle(BOLD);
 
  fill(0);
  text("#엔딩5 - 왕관을 쓴 거지", width / 2, height / 6);
 
  // 내용
  fill(245);
 
  textSize(27);
 
  let storyText =
    "당신은 두 번의 시험을 통과하여\n마침내 국왕이 되었습니다.\n" +
    "당신은 뛰어난 통솔력으로 왕국을 일으켰고\n많은 백성들의 지지를 받았습니다.\n" +
    "왕국은 평화를 유지하여\n강대한 국가로 성장했습니다.\n" +
    "당신은 역사상 가장 뛰어난 왕으로\n기억될 것입니다.";
 
  text(storyText, width / 2, height / 2);
 
  // 안내
  fill(255);
 
  rectMode(CENTER);
  fill(220, 40, 40, 180);
  rect(width / 2, height / 1.15, 430, 50, 8);
 
  fill(255);
  textSize(24);
 
  text(
    "▶ ENTER 키를 눌러 엔딩 크레딧 보기",
    width / 2,
    height / 1.15
  );
 
  pop();
}
 
// =========================
// 엔딩 크레딧
// =========================
function drawCredits() {
 
  background(0);
 
  fill(255);
 
  textAlign(CENTER, CENTER);
 
  // 제목
  textSize(50);
  textStyle(BOLD);
 
  text("ENDING CREDITS", width / 2, creditsY);
 
  // 본문
  textStyle(NORMAL);
  textSize(30);
 
  let creditText =
    "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"+
    "제작\n방윤정\n\n" +
 
    "게임 기획 / 프로그래밍\n방윤정\n\n" +
 
    "사용한 AI \Claude, Geminai\n\n" +
 
    "배경 음악 출처\nPixabay, OpenGameArt.ORG\n" +
      
    "소속\n숭실대 글로벌미디어\n" +
    
    "소감: 게임 제작 과정 중에 에러가\n"+
    "많이 발생해서 힘든 점이 많았지만\n"+
    "막상 완성하니 뿌듯했습니다\n"+
    "새롭게 알게 된 점으로 코드를 작성할 때는\n"+
    "항상 사용할 변수나 함수명을 먼저 정리하고\n"+
    "작성해야 함을 깨닫게 되었습니다.\n"+ 
    "이 게임을 만들며 씬 관리가 가장.\n"+ 
    "어려웠기 때문에 위와 같은 스토리 게임은\n"+ 
    "씬의 구조를 명확히 하는 것이 중요할 것 같습니다.\n"+
    "다음 번에는 선택지와 엔딩 루트를 더 다양하게\n"+
    "만들어보고 싶습니다!\n\n\n"+
 
    "Thank you for playing !! ^__^ V";
 
  text(creditText, width / 2, creditsY + 250);
 
  // 위로 스크롤
  creditsY -= 3;
  // =========================
  // 크레딧 종료 후 스타트 화면
  // =========================
 
  if (creditsY < -1200) {
    scene = "creditsEnd";
    creditsEndTimer = millis();
  }
}
 
// =========================
// 크레딧 종료 대기 씬 (3초 후 start)
// =========================
let creditsEndTimer = 0;
function drawCreditsEnd() {
  background(0);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(28);
  text("잠시 후 스타트 화면으로 돌아갑니다...", width / 2, height / 2);
 
  if (millis() - creditsEndTimer >= 3000) {
    finalBGM.stop();
    
    if (!introBgm.isPlaying()) {
        introBgm.setVolume(0.5);
        introBgm.loop();
    }
    scene = "start";
    creditsY = height;
    fadeAlpha2 = 0;
    dialogueIndex_final = 0;
    dialogues_final = null;
  }
}
 
//
 
// =========================
// keyPressed
// =========================
 
// final.js
function finalKeyPressed() {
  if (keyCode !== ENTER) return;
 
  if (scene === "finalScene") {
    // 현재 대사셋의 마지막 인덱스 계산
    let currentLength = dialogues_final.length;
 
    if (dialogueIndex_final < currentLength - 1) {
      // 다음 대사로
      dialogueIndex_final++;
    } else {
      // 현재 대사셋이 끝난 경우
      if (dialogues_final === dialogues_end1) {
        // end1 → end2로 전환
        dialogues_final = dialogues_end2;
        dialogueIndex_final = 0;
        startDialogue();
      } else {
        // end2 → fadeout 전환
        fadeAlpha2 = 0;
        scene = "fadeout";
      }
    }
  } else if (scene === "ending") {
    // 엔딩 화면에서 엔터 → 크레딧
    scene = "credits";
    creditsY = height;
  }
}
 
 
// =========================
// 새로운 대사 시작
// =========================
function startDialogue() {
 
  displayedText = "";
  charIndex = 0;
}
 
// =========================
// 창 크기 변경
// =========================
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}