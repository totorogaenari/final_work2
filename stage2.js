//stage2.js

//브금 모음 
let gameBGM2;
let playerBgm2; //플레이어가 공격할때
let monsterBgm2; //몬스터가 공격할때
let defendBgm2; //방어할때

let gameState2 = "play2"; // 씬 이름 
let spawnInterval2 = 3000; // 처음 3초
let lastSpawnTime2 = 0;
//플레이어 어택 변수 
let attackAnim2 = false;
let attackFrame2 = 0;
let attackTimer2 = 0;
//몬스터 어택 변수 
let monsterAttackAnim2 = false;
let monsterAttackFrame2 = 0;
let monsterAttackTimer2 = 0;

let effectIndex2 = 0; //전투 효과 인덱스 
let showEffect2 = false;
let effectTimer2 = 0;
//hp
let bossHP2 = 100;
let playerHP2 = 100;

let pendingDamage2 = 0;
let damageTimer2 = 0;
//깜빡이는 효과에 쓰이는 변수 
let isInvincible2 = false;   
let lastBossAttackTime2 = 0;

let messageText2 = "";
let messageTimer2 = 0;
let isDefense2 = false;
//방어 변수 
let shieldActive2 = false;
let shieldTimer2 = 0;
let guardSuccess2 = false;

let bossDialogueTimer2 = 0;
let triggeredDialogues2 = [];

let playerHitBlinkTimer2 = 0;
let monsterHitBlinkTimer2 = 0;
//작은 몬스터 터지는 효과 
let bloodEffects2 = [];
let screenShake2 = 0;
//쿨타임
let attackCooldown2 = 7000; // 7초
let lastAttackTime2 = -7000;


// 연출 스케줄 관리를 위한 제어 변수
let gameOverTriggered2 = false; // 사망 시퀀스 시작 여부
let gameOverTimer2 = 0;         // 사망 시점이 기록될 변수
let fadeAmount2 = 0;            // 페이드 불투명도 (0 ~ 255)

let resultState2 = ""; // "win" 또는 "lose"

const wordList2 = [
   "사과",
  "조용한",
  "커다랗다",
  "공격",
  "역사",
  "곱하다",
  "컴퓨터",
  "하늘",
  "고양이",
  "자동차",
  "토마토",
  "비행기",
  "카메라",
  "초콜릿",
  "지켜보다",
  "오래오래",
  "냉수마찰",
  "아리랑",
  "얼마나",
  "나날이",
  "방학",
  "개강",
  "숭실대",
  "글로벌미디어",
  "아트앤태크놀로지",
  "으슥하다",
  "주사위",
  "잠그다",
  "말솜씨",
  "어버이",
  "고리",
  "프로그래밍",
  "피카츄",
  "도서관",
  "시대에",
  "기다리다",
  "대학교",
  "나뭇잎",
  "냉장고",
  "다리미",
  "조용한",
  "복잡한",
  "의자",
  "체육",
  "공사",
  "민들레"
];

//let inputBox; //입력창
//let words = []; //단어 목록

let monster2Icon;
let monster_2;

let smallMonster2;

let currentBossDialogue2 = "";
let layer;


let bg3;


let frontLineX;
let gameOver = false;

const DEAD_LINE = 120; // 전선 패배선

let bossDead = false;
let bossDeathTimer = 0;
let fadeAlpha = 0;



//말풍선 대사
let bossDialogues2 = [
  { hp: 85, text: "맥박이 빠르군. 공포인가?" },
  { hp: 60, text: "면역 개체인가? \n실험 결과를 수정해야겠어." },
  { hp: 30, text: "왜 감염되지 않는 거지…?" },
  { hp: 10,  text: "예상보다 오래 버티는군." },
  { hp: 1,  text: "격리 실패. 전원 처분한다…" }
];

//몬스터 피격시 대사
let playerHitLines2 = [
  "흥미로운 저항이군…"
];
function stage2Setup() {
  rectMode(CENTER);
  
   if (gameBGM2 && !gameBGM2.isPlaying()) {
    gameBGM2.setVolume(0.5); // 볼륨
    gameBGM2.loop();         // 반복 재생
  }

  inputBox = createInput();
  inputBox.position(windowWidth / 2 - 100, windowHeight - 60);
  inputBox.size(200, 40);
  inputBox.elt.addEventListener("keydown", checkEnter2); // 함수명 일치 확인
  inputBox.hide(); // 초기엔 숨김
  frontLineX = windowWidth/2;
}

function stage2Preload() {
  gameBGM2 = loadSound("game.mp3");
  playerBgm2 = loadSound("playerattack.mp3");
  monsterBgm2 = loadSound("monsterAttack.mp3");
  defendBgm2 = loadSound("defendSound.mp3");
  
  bg3 = loadImage("bg2.png");
  monster2Icon = loadImage("monster2Icon.png");
  monster_2 = loadImage("monster2.png");
  smallMonster2 = loadImage("smallMonster2.png");
  layer = loadImage("layer.gif");
}

function stage2Draw() {
  // 1. 입력창 제어 (상태에 따라 show/hide)
  if (gameState2 === "play2") {
    if (inputBox) inputBox.show();
  } else {
    if (inputBox) inputBox.hide();
  }

  // 2. 게임 플레이 중일 때
  if (gameState2 === "play2") {
    // 단어 생성 로직
    if (millis() - lastSpawnTime2 > spawnInterval2) {
      makeWord2();
      lastSpawnTime2 = millis();
    }

    // 배경 및 게임 로직 호출
    let shakeX = 0;
    let shakeY = 0;
    if (screenShake2 > 0) {
      shakeX = random(-screenShake2, screenShake2);
      shakeY = random(-screenShake2, screenShake2);
      screenShake2 *= 0.9;
    }

    push();
    translate(shakeX, shakeY);
      
    // 여기서 배경, 캐릭터, 몬스터 등 그림 
   stage2();
  monster2();
  player2(); 
  handlePendingDamage2(); 

  updateBossDialogue2();
  bossAttackSystem2();
  updateMonsterAttackAnimation2();

  updateFrontLine();
  drawFrontLine();
  checkGameOver();
  updateBossDeathScene();

  updateAttackAnimation2();
    
  drawShield2();
  drawBlood2();

    pop(); // 게임 요소 그리기 끝

    drawMessage2();
    drawAttackCooldownUI2(); //쿨타임 ui는 맨앞에 배치 
    
    // 게임 오버 체크
    if (playerHP2 <= 0) {
      gameState2 = "lose";
      
    }
  } 
  // 3. 승리/패배 상태일 때는 UI가 포함되지 않음
  else if (gameState2 === "lose") {
     if (gameBGM2.isPlaying()) {
    gameBGM2.stop();
  }
    ending4();
  } else if (gameState2 === "win") {
     if (gameBGM2.isPlaying()) {
    gameBGM2.stop();
  }
    winScene2();
  }
}

//라인이 데드라인에 가까워지면 게임 오버 
function checkGameOver() {

  if (frontLineX <= DEAD_LINE) {

    gameOver = true;

    playerHP2 = 0;
  }
}
//게임 재시작 함수 
function resetGame2() {
  bossHP2 = 100;
  playerHP2 = 100;
  words = [];
  bloodEffects2 = [];
  score = 0;
  pendingDamage2 = 0;
  damageTimer2 = 0;
  triggeredDialogues = [];
  bossDialogueTimer2 = 0;
  currentBossDialogue2 = "";
  screenShake2 = 0;
  gameState2 = "play2"; // 상태 복구
  //브금 다시 시작
  if (gameBGM2 && !gameBGM2.isPlaying()) {
    gameBGM2.setVolume(0.5);
    gameBGM2.loop();
  }
  
  // 다시 시작 시 3000ms(3초) 초기화 보존
  spawnInterval2 = 3000; 
  lastSpawnTime2 = millis(); 

  inputBox.show(); 
  inputBox.value(""); 
}

function updateFadeOutScene2() {

  if (!gameOverTriggered2) return;

  let elapsed = millis() - gameOverTimer2;

  // 2초 후부터 페이드 시작
  if (elapsed > 2000) {

    fadeAmount2 += 3;
    fadeAmount2 = constrain(fadeAmount2, 0, 255);

    push();
    fill(0, fadeAmount2);
    noStroke();
    rectMode(CORNER);
    rect(0, 0, width, height);
    pop();
  }

  // 총 5초 후 결과 화면 전환
  if (elapsed > 5000) {

    gameState = resultState2;

    gameOverTriggered2 = false;
    fadeAmount2 = 0;
  }
  else if (gameState2 === "lose") {
    if (keyCode === UP_ARROW || keyCode === DOWN_ARROW) {
      select = 1 - select; 
    }

    if (keyCode === ENTER) {
      if (select === 0) {
        resetGame2(); 
      } else {
        location.reload(); 
      }
    }
  }
}


//전선 시스템
function updateFrontLine() {

  // 자동으로 계속 왼쪽 압박
  frontLineX -= 0.15;

  // 화면 제한
  frontLineX = constrain(
    frontLineX,
    0,
    width
  );
}

function updateBossDeathScene() {

  if (!bossDead) return;

  let elapsed = millis() - bossDeathTimer;


  if (elapsed > 2000) {

    fadeAlpha += 2;

    fill(0, fadeAlpha);
    rectMode(CORNER);
    rect(0, 0, width, height);
  }

  // 총 5초 뒤 승리씬
  if (elapsed > 5000) {
    // 입력창 숨기기
    if (typeof inputBox !== "undefined" && inputBox) {
      inputBox.hide();
    }
    if (gameBGM2 && gameBGM2.isPlaying()) {
      gameBGM2.stop();
    }
    gameState2 = "win";
  }
}

 function drawMessage2() { 
   if (messageTimer2 <= 0) 
     return; fill(0, 180); 
   rect( windowWidth / 2, windowHeight * 0.08, 400, 60, 10 );     fill(255); 
   textAlign(CENTER, CENTER); 
   textSize(28); 
   text( messageText2, windowWidth / 2, windowHeight * 0.08 );
   messageTimer2--; 
 }
//전선 그리기 함수 
function drawFrontLine() {

  push();

  imageMode(CORNER);

  tint(255, 180);

  // 오른쪽 영역 전체를 레이어로 덮음
 image(
    layer,
    frontLineX+90,
    0,
    width - frontLineX,
    height
);

  pop();

}
function handlePendingDamage2() {

  if (damageTimer2 > 0) {
    damageTimer2--;
  }

  if (damageTimer2 === 0 && pendingDamage2 > 0) {

    if (guardSuccess2) {
      showMessage2("완벽히 방어했다!");
    } else {
      playerHP2 -= pendingDamage2;
      showMessage2("으악 공격 당했다!");

      // 여기 수정
      playerHitBlinkTimer2 = 30;
    }

    pendingDamage2 = 0;
  }
}

function updateAttackAnimation2() { 
  if (!attackAnim2) 
    return; 
    attackTimer2++; 
  // 프레임 속도 조절 
  if (attackTimer2 % 8 === 0) 
  { attackFrame2++; 
  } 
  // 이펙트 출력 
  imageMode(CENTER); 
  if (attackFrame2 === 0) { 
    image(player_effect1, windowWidth/2.5, windowHeight/1.5, 200, 200); 
  } else if (attackFrame2 === 1) { 
    image(player_effect3, windowWidth/1.8, windowHeight/1.5, 200, 200); 
  } else if (attackFrame2 === 2) { 
    image(player_effect2, windowWidth/1.5, windowHeight/1.4, 200, 200); 
  } 
  // 종료 
  else if (attackFrame2 > 2) { attackAnim2 = false;
  } 
}

function drawAttackCooldownUI2() {

  let barWidth = 300;
  let barHeight = 25;

  let x = windowWidth / 2 - barWidth / 2;
  let y = windowHeight - 110;

  // 경과 시간
  let elapsed = millis() - lastAttackTime2;

  // 0~1 비율
  let ratio =
    constrain(elapsed / attackCooldown2, 0, 1);

  push();

  rectMode(CORNER);

  // 배경
  fill(40, 40, 40, 220);
  rect(x, y, barWidth, barHeight, 10);

  // 게이지
  fill(255, 120, 0);
  rect(
    x,
    y,
    barWidth * ratio,
    barHeight,
    10
  );

  // 테두리
  noFill();
  stroke(255);
  strokeWeight(2);
  rect(x, y, barWidth, barHeight, 10);

  // 텍스트
  noStroke();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(18);

  if (ratio >= 1) {

    text(
      "공격 가능",
      x + barWidth / 2,
      y + barHeight / 2
    );

  } else {

    let remain =
      ((attackCooldown2 - elapsed) / 1000)
      .toFixed(1);

    text(
      `쿨타임 ${remain}초`,
      x + barWidth / 2,
      y + barHeight / 2
    );
  }

  pop();
}

function monster2() {

  // 피격 타이머 감소
  if (monsterHitBlinkTimer2 > 0) {
    monsterHitBlinkTimer2--;
  }

  imageMode(CENTER);

  // 깜빡임 효과
  if (monsterHitBlinkTimer2 > 0 && frameCount % 6 < 3) {
    tint(255, 100);
  } else {
    noTint();
  }

  image(
    monster_2,
    windowWidth * 0.85,
    windowHeight * 0.65,
    220,
    230
  );

  noTint();

  // 보스 말풍선만 출력
  if (bossDialogueTimer2 > 0) {

  drawSpeechBubble(
    windowWidth * 0.7,
    windowHeight * 0.65 - 160,
    currentBossDialogue2
  );
}
}

function attak_message() {
  image(message, windowWidth/2, windowHeight * 0.27,
      270, 80)
  textSize(30)
  fill(255,255,0)
  text("앗!        당했다!",windowWidth / 2.8, windowHeight * 0.27)
  fill("255")
  text("공격",windowWidth / 2.35, windowHeight * 0.27)
}

function player2() {

  if (playerHitBlinkTimer2 > 0 && frameCount % 6 < 3) {
    return;
  }

  imageMode(CENTER);

  let img;

  // HP 상태에 따라 이미지 변경
  if (playerHP2 <= 0) {
    img = mainPixel3; // 쓰러짐
  } 
  else if (playerHP2 <= 40) {
    img = mainPixel2; // 부상
  } 
  else {
    img = mainPixel;  // 기본
  }

  image(
    img,
    windowWidth / 7,
    windowHeight / 1.5,
    180, 180
  );

  if (playerHitBlinkTimer2 > 0) {
    playerHitBlinkTimer2--;
  }
}
function stage2() {
  background(0);
  image(bg3, 0, 0, width, height);

  // -------------------------
  // 전체 체력바 UI
  // -------------------------
  fill(255);
  rect(windowWidth / 2,
       windowHeight * 0.15,
       windowWidth - windowWidth * 0.3,
       windowHeight * 0.1);

  push();
  rectMode(CORNER);

  let bossBarX = windowWidth * 0.5;
  let bossBarY = windowHeight / 7.5;

  let playerBarX = windowWidth * 0.2;
  let playerBarY = windowHeight / 7.5;

  bossHP2 = constrain(bossHP2, 0, 100);
  playerHP2 = constrain(playerHP2, 0, 100);

  // 보스 HP
  fill(255, 0, 0);
  rect(
    bossBarX,
    bossBarY,
    map(bossHP2, 0, 100, 0, windowWidth * 0.3),
    windowHeight * 0.05
  );

  // 플레이어 HP
  fill(0, 0, 255);
  rect(
    playerBarX,
    playerBarY,
    map(playerHP2, 0, 100, 0, windowWidth * 0.3),
    windowHeight * 0.05
  );

  pop();

  // -------------------------
  // 이름 UI
  // -------------------------
  fill(255);
  rect(windowWidth / 3.5, windowHeight * 0.09,
       windowWidth / 6, windowHeight * 0.05);

  fill(0);
  textAlign(CENTER, CENTER);
  textSize(30);
  text("나", windowWidth / 3.5, windowHeight * 0.09);

  fill(255);
  rect(windowWidth - windowWidth / 3.5,
       windowHeight * 0.09,
       windowWidth / 3.6,
       windowHeight * 0.05);

  fill(0);
  textSize(22);
  text("흑사병 ",
       windowWidth - windowWidth / 3.2,
       windowHeight * 0.09);

  // -------------------------
  // 캐릭터 + VS
  // -------------------------
// 캐릭터 아이콘 
  fill(255); 
  ellipse(windowWidth * 0.13, windowHeight * 0.15, 140, 140);   imageMode(CENTER) 
  image(mainCharIcon, windowWidth * 0.13, windowHeight * 0.15, 140, 140) 
  ellipse(windowWidth * 0.87, windowHeight * 0.15, 140, 140); // VS 
  fill(255); 
  ellipse(windowWidth / 2, windowHeight * 0.15, 80, 80);
  image(monster2Icon, windowWidth * 0.87, windowHeight * 0.15, 150, 161) 
  textAlign(CENTER, CENTER); 
  fill(0); 
  textSize(45); 
  text("VS", windowWidth / 2, windowHeight * 0.16);

 
  //  작은 몬스터 (타자 RPG 핵심)
  for (let i = words.length - 1; i >= 0; i--) {

    let w = words[i];

    let floatY = w.y + sin(frameCount * w.floatSpeed) * 10;

    imageMode(CENTER);

    // -------------------------
    // 작은 몬스터 이미지
    // -------------------------
    image(smallMonster2,
          w.x,
          floatY + w.offsetY - 20,
          100, 100);

    // -------------------------
    // HP BAR (몬스터 위)  -> 나중에 
    // -------------------------
    let barW = 50;
    let barH = 6;

    let hpRatio = w.hp / w.maxHp;

    fill(0);
    rect(w.x - barW / 2,
         floatY + w.offsetY - 60,
         barW,
         barH);

    fill(255, 0, 0);
    rect(
      w.x - barW / 2,
      floatY + w.offsetY - 60,
      barW * hpRatio,
      barH
    );

    // -------------------------
    // 단어 박스
    // -------------------------
    let boxWidth = textWidth(w.text) + 30;
    let boxHeight = 50;

    fill(50);
    rect(w.x, w.y, boxWidth, boxHeight, 10);

    fill(255);
    textAlign(CENTER, CENTER);
    textSize(32);
    text(w.text, w.x, w.y);

    // -------------------------
    // 이동
    // -------------------------
    if (!bossDead) {
      w.x -= w.speed;
    }

    // -------------------------
    // 플레이어 도달 데미지
    // -------------------------
    if (!bossDead &&!w.hitPlayer &&w.x < windowWidth * 0.25) {
      playerHP2 -= 10;
      showMessage2("실험쥐에게 물렸다!");
      playerHitBlinkTimer2 = 30;
      w.hitPlayer = true;
    }

    // -------------------------
    // 몬스터 사망 처리
    // -------------------------
    if (w.hp <= 0) {

      bloodEffects2.push({
        x: w.x,
        y: w.y,
        life: 25
      });

      showMessage2("처치!");

      words.splice(i, 1);
      score++;

      continue;
    }

    // -------------------------
    // 화면 밖 제거
    // -------------------------
    if (w.x < -200) {
      words.splice(i, 1);
    }
  }
}
//보스 공격
function attackBoss2() {

  if (bossDead) return;
  
  if (playerBgm2) {
    playerBgm2.setVolume(0.7);
    playerBgm2.play();
  }

  bossHP2 -= 15;

  monsterHitBlinkTimer2 = 20;

  frontLineX += 25;

  frontLineX = constrain(
    frontLineX,
    0,
    width * 0.8
  );

  currentBossDialogue2 = random(playerHitLines2);

  bossDialogueTimer2 = 120;

  //  보스 사망 처리
  if (bossHP2 <= 0) {

    bossHP2 = 0;

    bossDead = true;
    bossDeathTimer = millis();

    currentBossDialogue2 =
      "격리 실패. 전원 처분한다…";

    bossDialogueTimer2 = 180;

    // 입력 비활성화
    inputBox.attribute("disabled", true);

    // 남은 공격 제거
    pendingDamage2 = 0;

    // 공격 애니메이션 중단
    monsterAttackAnim2 = false;

    // 작은 몬스터 정지
    for (let w of words) {
      w.speed = 0;
    }
  }
}
//방어
function defend2() {
  
  if (defendBgm2) {
    defendBgm2.setVolume(0.7);
    defendBgm2.play();
  }

  shieldActive2 = true;
  shieldTimer2 = 40;

  guardSuccess2 = true; // 핵심: 방어 성공 저장

  showMessage2("방어했다!");

  setTimeout(() => {
    guardSuccess2 = false; // 일정 시간 후 해제
  }, 1000); // 1초 유지 (데미지 타이밍 커버)
}
//말풍선
function drawSpeechBubble2(x, y, textStr) {

  noTint();

  imageMode(CENTER);

  image(
    speechBubble,
    x - 20,
    y - 70,
    380,
    220
  );

  fill(0);

  textAlign(CENTER, CENTER);

  textSize(20);

  text(textStr, x-17, y - 57);
}
function drawShield2() {

  if (!shieldActive2) return;

  push();

  imageMode(CENTER);

  // 펄스 효과
  let pulse = 1 + sin(frameCount * 0.2) * 0.1;

  // 반투명 
  tint(255, 180);

  image(
    shield,
    windowWidth/7,
    windowHeight/1.5,
    220 * pulse,
    220 * pulse
  );

  pop();

  shieldTimer2--;

  if (shieldTimer2 <= 0) {
    shieldActive2 = false;
  }
}
//적 공격 시스템 
function bossAttackSystem2() {

  if (millis() - lastBossAttackTime2 > 4000) {
    
    if (monsterBgm2) {
      monsterBgm2.setVolume(0.8);
      monsterBgm2.play();
    }

    lastBossAttackTime2 = millis();

    screenShake2 = 20;

    monsterAttackAnim2 = true;
    monsterAttackFrame2 = 0;
    monsterAttackTimer2 = 0;

    // 여기서 HP 안 깎음 
    pendingDamage2 = 25;
    damageTimer2 = 60;

    showMessage2("공격이 들어온다!");
  }
}

//몬스터 공격 애니메이션
function updateMonsterAttackAnimation2() {
  if (bossDead) return;
  if (!monsterAttackAnim2) return;

  monsterAttackTimer2++;

  // 프레임 속도 조절
  if (monsterAttackTimer2 % 18 === 0) {
    monsterAttackFrame2++;
  }

  imageMode(CENTER);

  let img;

  // 왼쪽으로 점점 이동 (프레임이 올라갈수록 -값 증가)
  let offsetX = monsterAttackFrame2 * 350; 
  // 0 → 30 → 60 이런 식으로 왼쪽으로 이동

  if (monsterAttackFrame2 === 0) {
    img = monster_attack3;
  } 
  else if (monsterAttackFrame2 === 1) {
    img = monster_attack2;
  } 
  else if (monsterAttackFrame2 === 2) {
    img = monster_attack1;
  } 
  else {
    monsterAttackAnim2 = false;
    return;
  }

  image(img,
    windowWidth * 0.75 - offsetX,  // 여기 핵심
    windowHeight * 0.65,
    300, 300
  );
}
//메시지 출력
function showMessage2(msg) {
  messageText2 = msg;
  messageTimer2 = 60; // 약 1초
}

// 단어 생성
function makeWord2() {
  if (bossDead) return;
  let randomWord = random(wordList2);

  words.push({
    text: randomWord,
    x: width + 100,
    y: random(250, height - 100),
    speed: random(1, 2),
    hp: 3,
    maxHp: 3,
    offsetY: random(-30, 30),
    floatSpeed: random(0.01, 0.03),
    hitPlayer: false
  });
}
function updateBossDialogue2() {

  // 타이머 감소
  if (bossDialogueTimer2 > 0) {
    bossDialogueTimer2--;
  } 
  else {
    currentBossDialogue2 = "";
  }

  // 새로운 대사 체크
  for (let i = 0; i < bossDialogues2.length; i++) {

    let d = bossDialogues2[i];

    // 아직 안 나온 대사 + HP 조건 만족
    if (
      bossHP2 <= d.hp &&
      !triggeredDialogues2.includes(i)
    ) {

      currentBossDialogue2 = d.text;

      bossDialogueTimer2 = 180; // 3초 정도

      triggeredDialogues2.push(i);

      break;
    }
  }
}
// 엔터 입력
function checkEnter2(event) {
  if (bossDead) return;
  
  if (event.key !== "Enter") return;

  let typed = inputBox.value();

  let success = false;

  // 단어 검사
  for (let i = words.length - 1; i >= 0; i--) {

    if (words[i].text === typed) {

      success = true;

      let w = words[i];

      // 피 효과
      bloodEffects2.push({
        x: w.x,
        y: w.y,
        life: 20
      });

      // 몬스터 제거
      words.splice(i, 1);

      // 전선 넉백
      frontLineX += 120;

      // 최대 위치 제한
      frontLineX = constrain(
        frontLineX,
        0,
        width * 0.8
      );

      screenShake2 = 10;

      showMessage2("몬스터 제거 완료!");

      score++;

      break;
    }
  }

  
  if (!success) {

    frontLineX -= 60;

    screenShake2 = 20;

    showMessage2("입력 성공!");
  }

  inputBox.value("");
}

//피 그리는 함수
function drawBlood2() {

  for (let i = bloodEffects2.length - 1; i >= 0; i--) {

    let b = bloodEffects2[i];

    fill(255, 0, 0);
    noStroke();

    ellipse(b.x, b.y, random(10, 20), random(10, 20));

    b.life--;

    if (b.life <= 0) {
      bloodEffects2.splice(i, 1);
    }
  }
}

function keyPressedInWinScene2() {
  if (scene === "winScene2" && keyCode === ENTER) {
    // 최종 엔딩 씬으로 진입
    scene = "finalScene";
    // 필요한 경우 final.js의 초기화 함수 호출
    if (typeof setupFinalEnding === "function") {
      setupFinalEnding();
    }
  }
}

function stage2KeyPressed() {


  // 승리 상태에서 엔터 → finalScene 전환
  if (gameState2 === "win") {
    if (keyCode === ENTER) {

      // stage2 브금 정지
      if (gameBGM2 && gameBGM2.isPlaying()) {
        gameBGM2.stop();
      }

      if (typeof inputBox !== "undefined" && inputBox) {
        inputBox.hide();
        inputBox.remove();
      }

      scene = "finalScene";
      setupFinalEnding();
    }
    return;
  }

  if (bossDead) return;
  
    if (keyCode === RIGHT_ARROW) {

      let now = millis();

      // 쿨타임 체크
      if (now - lastAttackTime2 >= attackCooldown2) {
    
        lastAttackTime2 = now;

        attackBoss2();

        attackAnim2 = true;
        attackFrame2 = 0;
        attackTimer2 = 0;

  } else {

    showMessage2("아직 공격할 수 없다!");
  }
}

  if (keyCode === LEFT_ARROW) {
    defend2();
  }
}
//플레이어의 체력이 0이 되면 엔딩씬 불러오기
function ending4() {
  image(bg3, 0, 0, width, height);

  push();
  rectMode(CENTER);
  
  fill(200, 30, 30, 150); 
  rect(windowWidth / 2, windowHeight / 2, windowWidth / 1.3 + 12, windowHeight / 2 + 12, 15);
  
  fill(15, 15, 20, 230); 
  rect(windowWidth / 2, windowHeight / 2, windowWidth / 1.3, windowHeight / 2, 12);
  
  textAlign(CENTER, CENTER);
  textSize(75);
  textStyle(BOLD);
  
  fill(0, 0, 0, 200);
  text("엔딩4-애매한 영웅", width / 2 + 4, height / 6);
  
  fill(220, 40, 40); 
  text("엔딩4-애매한 영웅", width / 2, height / 6.4);

  textSize(26);
  fill(245, 245, 245);
  textAlign(CENTER, CENTER);
  
  let storyText = 
      "당신은 흑사병 의사에게 패배하였습니다.\n" +
      "당신은 첫번째 테스트에서는 승리하여 \n" +
            "많은 이들에게 감동을 주었으나\n" +
            "금새 사람들에게 잊혀지고 말았습니다.";
  text(storyText, width / 2, height / 2);

  textSize(24);
  textStyle(NORMAL);

  if (select === 0) {
    fill(220, 40, 40, 180); 
    rect(windowWidth / 2, windowHeight / 1.18, 250, 45, 5);
    fill(255);
    text("▶ 네 (재도전)", windowWidth / 2, windowHeight / 1.18);
  } else {
    fill(255, 120);
    text("네 (재도전)", windowWidth / 2, windowHeight / 1.18);
  }

  if (select === 1) {
    fill(220, 40, 40, 180);
    rect(windowWidth / 2, windowHeight / 1.10, 380, 45, 5);
    fill(255);
    text("▶ 아니오 (처음으로 돌아가기)", windowWidth / 2, windowHeight / 1.10);
  } else {
    fill(255, 120);
    text("아니오 (처음으로 돌아가기)", windowWidth / 2, windowHeight / 1.10);
  }
  
  pop();
}

//이긴 씬
function winScene2() {
  push();
  image(bg3, 0, 0, width, height);
  rectMode(CENTER);
  
  fill(255, 215, 0, 150); 
  rect(windowWidth / 2, windowHeight / 2, windowWidth / 1.3 + 12, windowHeight / 2 + 12, 15);
  
  fill(15, 15, 25, 230); 
  rect(windowWidth / 2, windowHeight / 2, windowWidth / 1.3, windowHeight / 2, 12);
  
  textAlign(CENTER, CENTER);
  textSize(75);
  textStyle(BOLD);
  
  fill(0, 0, 0, 200);
  text("VICTORY", width / 2 + 4, height / 6);
  
  fill(255, 223, 0);
  text("VICTORY", width / 2, height / 6.4);

  textSize(28);
  fill(245, 245, 245);
  
  let storyText = "흑사병 의사를 완벽히 쓰러뜨렸습니다.\n\n" +
                  "마침내 폐쇄된 검역소에는\n" +
                  "더 이상 역병에 잠식된 \n비명 소리가 들리지 않습니다...";
  text(storyText, width / 2, height / 2);

  textSize(20);
  if (frameCount % 60 < 40) {
    fill(255, 215, 0, 180); 
  } else {
    fill(255, 215, 0, 60);  
  }
  text("- 종료하려면 엔터키를 누르세요. -", width / 2, height / 1.15);
  
  pop();
}
// 창 크기 변경 대응
function windowResized() {

  resizeCanvas(windowWidth, windowHeight);

  inputBox.position(windowWidth / 2 - 100,
                    windowHeight - 60);
}