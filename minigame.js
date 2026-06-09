let street;
let ending_0_img; 

let power = 15;
let winTimer = 0;
let loseTimer = 0;
let menuSelect = 0;

let acceptSelect = 0;
let nameInput;

function preloadMinigame() {
  street = loadImage("street.png");
  ending_0_img = loadImage("ending0.png");
}
//미니 게임 함수 
function setupMinigame() {
  nameInput = createInput(); //플레이어 이름 입력 
  nameInput.position(width / 2 - 150, height / 2);
  nameInput.size(300, 40);
  nameInput.hide(); //처음은 숨기기

  winDialogues = [
    { speaker: "", text: "(도둑이 큰 소리를 내며 바닥으로 넘어졌다.)", icon: null },
    { speaker: "", text: "(빗자루 끝으로 치명타를 입은 모양이다.)", icon: null },
    { speaker: "", text: "(주변으로 시민들이 모여들고 \n하나둘 환호성을 지른다.)", icon: null },
    { speaker: "[시민]", text: "이제 저 도둑 걱정은 없겠구나!", icon: null },
    { speaker: "[시민]", text: "저 사람 행색은 거지같은데 힘이 장난 아니네", icon: null },
    { speaker: "", text: "(그러자 한 중년이 당신에게 다가온다.)", icon: null },
    { speaker: "[???]", text: "...실례하겠습니다.", icon: man },
    { speaker: "", text: "(중년의 남자는 낡았지만 \n정교한 문양이 새겨진 망토를 걸치고 있었다.)", icon: null },
    { speaker: "[???]", text: "저는 왕궁 소속 수행원, 카렌입니다.", icon: man },
    { speaker: "[카렌]", text: "현재 왕국은 새로운 왕을 필요로 하고 있습니다.", icon: man },
    { speaker: "[카렌]", text: "국왕 폐하께서 후계자를 남기지 못한 채 \n돌아가신 이후, 귀족들은 서로 \n권력을 차지하려 싸우고 있습니다.", icon: man },
    { speaker: "[카렌]", text: "게다가 동쪽의 베르하임은\n이미 국경에 군대를 집결시키고 있지요.", icon: man },
    { speaker: "[카렌]", text: "지금의 왕국엔 사람들을 \n이끌 수 있는 강한 인물이 필요합니다.", icon: man },
    { speaker: "[카렌]", text: "당신에게 왕이 될 수 있는 기회를 드리겠습니다.", icon: man },
    { speaker: "[나]", text: "왕이라고…?", icon: mainIcon },
    { speaker: "[카렌]", text: "방금 전 싸움을 보았습니다.\n 맨 손이나 다름 없는 상태로 \n저 괴물을 제압하다니…", icon: man },
    { speaker: "[카렌]", text: "그 정도의 실력이면 우리 왕국을 \n지키는데에 손색없을겁니다.", icon: man },
    { speaker: "[나]", text: "그렇지만 이름도 모르는 사람에게 \n어떻게 왕을 제안할 수 있지?", icon: mainIcon },
    { speaker: "[카렌]", text: "당신은 ‘검은 사자 용병단’의 \n대장이었던 인물이지요…\n 10년 전 전투에서 뵌적이 있습니다.", icon: man },
    { speaker: "[카렌]", text: "그러니까… 당신의 이름은…", icon: man }
  ];
//거절 했을 시 대사 
  refuseDialogues = [
    { speaker: "[카렌]", text: "거부한단 말입니까…?\n그렇지만 거지인 당신이 \n왕이 될 수 있는 기회입니다.", icon: man },
    { speaker: "[나]", text: "난 역시 거지 생활이 맞아.\n처형 당하는건 더더욱 싫고.", icon: mainIcon },
    { speaker: "[카렌]", text: "…어쩔 수 없군요.\n다른 인물을 찾는 수 밖에…", icon: man },
    { speaker: "", text: "(수행원은 이해가 안된다는 듯이\n고개를 돌리며 사람들 틈으로 사라졌다.)", icon: null }
  ];
//받아들였을 시 대사 
  acceptDialogues = [
    { speaker: "[카렌]", text: "좋습니다. 저를 따라오십시오.", icon: man },
    { speaker: "", text: "(카렌은 왕국 쪽으로 발걸음을 돌린다.)", icon: null },
    { speaker: "", text: "(당신도 잠시 망설이다 그의 뒤를 따라간다.)", icon: null },
    { speaker: "", text: "(멀리서 왕궁의 거대한 실루엣이 \n어둠 속에 모습을 드러낸다.)", icon: null }
  ];
}
//사용법 씬 
function infoScene() {
  image(street, 0, 0, width, height);

  push();
  fill(0, 150); 
  rectMode(CORNER);
  rect(0, 0, width, height);
  pop();

  rectMode(CENTER);
  fill(255, 230);
  rect(windowWidth / 2, windowHeight / 2.3, windowWidth / 1.3, windowHeight / 2.2);

  fill(0);
  textAlign(CENTER, CENTER);
  
  fill(255);
  textSize(40);
  text("[스페이스바 연타!]\n도둑을 밀어내라!", windowWidth / 2, windowHeight / 7);
  fill(0);
  textSize(27);
  text(
    "도둑을 밀어내는 미니게임 입니다." +
    "\n스페이스바를 최대한 빠르게 연타하여" +
    "\n도둑을 무찌르세요!",
    windowWidth / 2, windowHeight / 2.3
  );

  textSize(20);
  fill(180, 50, 50);
  text("*주의: 플레이어의 승패에 따라 엔딩이 달라질 수 있습니다.", windowWidth / 2, windowHeight / 1.7);

  push();
  fill(50);
  textSize(24);
  text("시작하려면 아무곳이나 클릭하세요.", windowWidth / 2, windowHeight / 1.35);

  if (frameCount % 60 < 30) {
    textSize(30);
    text(">>", windowWidth / 2 + 200, windowHeight / 1.35);
  }
  pop();
}
//미니 게임 씬 
function miniScene() {
  image(street, 0, 0, width, height);

  push();
  fill(0, 100);
  rectMode(CORNER);
  rect(0, 0, width, height);
  pop();
  
  
  if (winTimer == 0 && loseTimer == 0) {
    power -= 0.35;
  }

  power = constrain(power, 0, 100);

  fill(255);
  textAlign(CENTER);
  textSize(50);
  text("스페이스바를 연타하세요!", width / 2, 100);

  fill(80);
  rect(width / 2, height / 1.2, width / 1.3, 50);

  fill(200, 50, 50);
  //power로 게이지의 길이 조절 
  rect(width / 2, height / 1.2, power * 10.8, 50);

  fill(255);
 //게이지 길이 마다 나오는 메시지 다르게 
  if (power < 10) {
    push();
    fill(255, 0, 0);
    textSize(55 + sin(frameCount * 0.2) * 5);
    text("이러다 지겠어!", width / 2, 200);
    pop();
  } else if (power < 30) {
    push();
    textSize(50 + sin(frameCount * 0.2) * 5);
    text("크윽... 힘이 너무 세잖아!", width / 2, 200);
    pop();
  } else if (power < 70) {
    text("버티는 중!", width / 2, 200);
  } else if (power < 100) {
    push();
    textSize(50 + sin(frameCount * 0.2) * 5);
    text("조금만 더!", width / 2, 200);
    pop();
  }

  if (power >= 100) {
    power = 100;
    textSize(60);
    fill(255);
    text("나의 승리다!!", width / 2, 200);

    if (winTimer == 0) {
      winTimer = millis();
    }
    if (millis() - winTimer > 2000) {
      scene = "storyWin";
    }
  }

  if (power <= 0) {
    power = 0;
    textSize(60);
    fill(255, 0, 0);
    text("젠장... 패배했다...", width / 2, 280);

    if (loseTimer == 0) {
      loseTimer = millis();
    }
    if (millis() - loseTimer > 2000) {
      scene = "lose";
    }
  }
}
//win 씬 
function storyWinScene() {
  image(street, 0, 0, width, height);

  if (winIndex >= winDialogues.length) {
    scene = "nameInput";
    return;
  }

  let d = winDialogues[winIndex];
  
  fill(255, 150);
  rectMode(CENTER);
  rect(windowWidth / 2, windowHeight / 1.3, windowWidth / 1.2, windowHeight / 3);

  fill(0);
  textSize(28);
  textAlign(LEFT, CENTER);
  text(d.speaker, windowWidth / 6, windowHeight / 1.5);

  textAlign(CENTER, CENTER);
  text(d.text, windowWidth / 2, windowHeight / 1.3);
  
  textSize(18);
  fill(100);
  text("ENTER", windowWidth / 2, windowHeight / 1.18);

  if (d.icon != null) {
    image(d.icon, windowWidth / 6, windowHeight / 5.8, 330, 330);
  }
}

function acceptScene() {
  image(street, 0, 0, width, height);

  // 기존 "nextStage"에서 새로운 대화 씬 "story"로 목적지 변경
  if (acceptIndex >= acceptDialogues.length) {
    scene = "story"; 
    dialogueIndex = 0; // 신(Scene)이 바뀔 때 인덱스 첫 화면 초기화 보장
    return;
  }

  let d = acceptDialogues[acceptIndex];
  
  fill(255, 150);
  rectMode(CENTER);
  rect(windowWidth / 2, windowHeight / 1.3, windowWidth / 1.2, windowHeight / 3);

  fill(0);
  textSize(28);
  textAlign(LEFT, CENTER);
  text(d.speaker, windowWidth / 6, windowHeight / 1.5);

  textAlign(CENTER, CENTER);
  text(d.text, windowWidth / 2, windowHeight / 1.3);
  
  textSize(18);
  fill(100);
  text("ENTER", windowWidth / 2, windowHeight / 1.18);

  if (d.icon != null) {
    image(d.icon, windowWidth / 6, windowHeight / 5.8, 330, 330);
  }
}
//이름 입력 씬 
function nameScene() {
  image(street, 0, 0, width, height);
  
  push();
  fill(0, 150);
  rectMode(CORNER);
  rect(0, 0, width, height);
  pop();

  fill(255);
  textAlign(CENTER);
  textSize(40);
  text("이름을 입력하세요.", width / 2, height / 3);

  nameInput.show(); //이름 입력칸 보이게 
  nameInput.position(width / 2 - 150, height / 2);

  fill(255);
  textSize(20);
  text("ENTER : 확인", width / 2, height / 1.5);
}
//이름 입력 이후 씬 
function afterNameScene() {
  image(street, 0, 0, width, height);

  if (afterNameIndex >= afterNameDialogues.length) {
    scene = "choice";
    return;
  }

  let d = afterNameDialogues[afterNameIndex];
  
  fill(255, 150);
  rectMode(CENTER);
  rect(windowWidth / 2, windowHeight / 1.3, windowWidth / 1.2, windowHeight / 3);

  fill(0);
  textSize(28);
  textAlign(LEFT, CENTER);
  text(d.speaker, windowWidth / 6, windowHeight / 1.5);

  textAlign(CENTER, CENTER);
  text(d.text, windowWidth / 2, windowHeight / 1.3);

  let currentIcon = null;
  if (d.speaker === "[카렌]") {
    currentIcon = man;
  } else if (d.speaker === "[나]") {
    currentIcon = mainIcon;
  }

  if (currentIcon != null) {
    image(currentIcon, windowWidth / 6, windowHeight / 5.8, 330, 330);
  }
}

function choiceScene() {
  image(street, 0, 0, width, height);
  
  // weaponSelectScene 디자인 규격 적용: 하단 안내 대화 상자
  fill(255, 150);
  rectMode(CENTER);
  rect(windowWidth / 2, windowHeight / 1.3, windowWidth / 1.2, windowHeight / 3);

  fill(0);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("제안을 받아들이시겠습니까?", windowWidth / 2, windowHeight / 1.3);

  // 버튼 1: 받아들인다 (우측 상단 빗자루 버튼 위치 규격 적용)
  if (mouseX >= windowWidth / 1.5 - 125 && mouseX <= windowWidth / 1.5 + 125 && mouseY >= windowHeight / 3 - 40 && mouseY <= windowHeight / 3 + 40) {
    fill(180, 200); // 마우스 오버 시 어두운 회색 피드백
  } else {
    fill(255, 200); // 평소 디자인 색상
  }
  rect(windowWidth / 1.5, windowHeight / 3, 250, 80);
  fill(0);
  text("받아들인다", windowWidth / 1.5, windowHeight / 3);

  // 버튼 2: 거절한다 (우측 중앙 유리병 버튼 위치 규격 적용)
  if (mouseX >= windowWidth / 1.5 - 125 && mouseX <= windowWidth / 1.5 + 125 && mouseY >= windowHeight / 2 - 40 && mouseY <= windowHeight / 2 + 40) {
    fill(180, 200);
  } else {
    fill(255, 200);
  }
  rect(windowWidth / 1.5, windowHeight / 2, 250, 80);
  fill(0);
  text("거절한다", windowWidth / 1.5, windowHeight / 2);
}
//lose 씬 
function loseScene() {
  image(street, 0, 0, width, height);
  
  push();
  fill(0, 180);
  rectMode(CORNER);
  rect(0, 0, width, height);
  pop();

  fill(255, 0, 0);
  textAlign(CENTER, CENTER);
  textSize(70);
  text("패배...", width / 2, height / 2.3);

  textSize(40);
  fill(255);
  text("도둑에게 패배했다.", width / 2, height / 1.7);

  textSize(22);
  fill(200);
  text("엔딩을 보려면 화면을 클릭하세요.", width / 2, height / 1.3);
}
//거절 씬 
function refuseScene() {
  image(street, 0, 0, width, height);

  if (refuseIndex >= refuseDialogues.length) {
    scene = "ending_1"; //엔딩으로 이동 
    return;
  }

  let d = refuseDialogues[refuseIndex];
  
  fill(255, 150);
  rectMode(CENTER);
  rect(windowWidth / 2, windowHeight / 1.3, windowWidth / 1.2, windowHeight / 3);

  fill(0);
  textSize(28);
  textAlign(LEFT, CENTER);
  text(d.speaker, windowWidth / 6, windowHeight / 1.5);

  textAlign(CENTER, CENTER);
  text(d.text, windowWidth / 2, windowHeight / 1.3);
  
  textSize(18);
  fill(100);
  text("ENTER >>", windowWidth / 1.4, windowHeight / 0.9);

  if (d.icon != null) {
    image(d.icon, windowWidth / 6, windowHeight / 5.8, 330, 330);
  }
}

//미니게임 실패 시 씬 
function ending0() {

  image(ending_0_img, 0, 0, width, height);
  fill(255, 180);
  rect(windowWidth / 2, windowHeight / 1.8, windowWidth / 1.3, windowHeight / 2);

  textAlign(LEFT);
  textSize(50);
  fill(255);
  text("#엔딩0 - 시작도 못한 이야기", windowWidth / 13, windowHeight / 8);
  
  textAlign(CENTER);
  textSize(30);
  fill(0);
  text("당신은 도둑과의 싸움에서 패배했습니다.\n\n"+
       "거지였던 당신은 용기있게 나섰으나...\n\n"+
       "왕국 근처에도 가지 못하고 사망했습니다.\n\n",
       windowWidth / 2, windowHeight / 1.8);

  textAlign(CENTER);
  fill(255);
  text("다시 시도하겠습니까?", windowWidth / 2, windowHeight / 1.18);

  textSize(30);
  fill(255);
  //다시 시도 할지 버튼 
  if (menuSelect == 0) {

    text(">> 네", windowWidth / 2.3, windowHeight / 1.1);

  } else {

    text("네", windowWidth / 2.2, windowHeight / 1.1);

  }
  if (menuSelect == 1) {
    text(">> 아니오 (처음으로 돌아가기)", windowWidth / 2.3, windowHeight / 1.03);
  } else {
    text("아니오 (처음으로 돌아가기)", windowWidth / 2.2, windowHeight / 1.03);
  }
}


//엔딩1 씬 
function ending1Scene() {

  image(ending_0_img, 0, 0, width, height);

  push();

  // =========================
  // 메인 UI 박스
  // =========================

  rectMode(CENTER);

  // 바깥 붉은 테두리
  fill(200, 30, 30, 150);

  rect(
    width / 2,
    height / 2,
    width / 1.3 + 12,
    height / 2 + 12,
    15
  );

  // 안쪽 검은 박스
  fill(15, 15, 20, 230);

  rect(
    width / 2,
    height / 2,
    width / 1.3,
    height / 2,
    12
  );

  // =========================
  // 제목
  // =========================

  textAlign(CENTER, CENTER);

  textStyle(BOLD);

  textSize(55);

  fill(220, 40, 40);

  text(
    "#엔딩1 - 끝까지 거지",
    width / 2,
    height / 6
  );

  // =========================
  // 엔딩 내용
  // =========================

  fill(245);

  textStyle(NORMAL);

  textSize(27);

  let storyText =
    "당신은 수행원의 제안을 거부하고\n" +
    "다시 거지 신분으로 길거리를 떠돌게 됩니다.\n\n" +
    "그러나 곧 이웃국가와의 전쟁이 벌어지게 되고\n" +
    "왕이 없던 왕국은 처절하게 패배하고 맙니다.\n\n" +
    "당신 또한 전쟁 속에서 두려움에 떨며\n" +
    "목숨을 잃게 됩니다.";

  text(
    storyText,
    width / 2,
    height / 2
  );

  // =========================
// 버튼 1
// =========================

let button1Hover =
  mouseX >= width / 2 - 175 &&
  mouseX <= width / 2 + 175 &&
  mouseY >= height / 1.12 - 55 &&
  mouseY <= height / 1.12 - 5;

rectMode(CENTER);

if (button1Hover) {

  fill(220, 40, 40, 220);
}

else {

  fill(120, 20, 20, 180);
}

// 버튼 1
rect(
  width / 2,
  height / 1.12 - 30,
  350,
  50,
  8
);
fill(255);
textSize(23);
text(
  "이전 선택지로 돌아가기",
  width / 2,
  height / 1.12 - 30
);


// =========================
// 버튼 2
// =========================
let button2Hover =
  mouseX >= width / 2 - 175 &&
  mouseX <= width / 2 + 175 &&
  mouseY >= height / 1.02 - 55 &&
  mouseY <= height / 1.02 - 5;

if (button2Hover) {

  fill(220, 40, 40, 220);
}

else {

  fill(120, 20, 20, 180);
}

// 버튼 2
rect(
  width / 2,
  height / 1.02 - 30,
  350,
  50,
  8
);
fill(255);
textSize(23);
text(
  "처음 화면으로 돌아가기",
  width / 2,
  height / 1.02 - 30
);
  
  pop();
}

function mousePressed() {
  // 현재 화면이 ending1Scene일 때만 버튼 클릭이 작동하도록 조건 추가
  if (scene === "ending_1") {
    
    // 버튼 1 영역 계산 (ending1Scene 코드와 동일)
    let button1Hover =
      mouseX >= width / 2 - 175 &&
      mouseX <= width / 2 + 175 &&
      mouseY >= height / 1.12 - 55 &&
      mouseY <= height / 1.12 - 5;

    // 버튼 2 영역 계산 (ending1Scene 코드와 동일)
    let button2Hover =
      mouseX >= width / 2 - 175 &&
      mouseX <= width / 2 + 175 &&
      mouseY >= height / 1.02 - 55 &&
      mouseY <= height / 1.02 - 5;

    if (button1Hover) {
      scene = "choice"; // 이전 선택지로 이동
    } else if (button2Hover) {
      scene = "start"; // 처음 화면으로 이동 (start씬의 이름이 'start'라고 가정)
    }
  }
}