//stage2.js

//브금 모음 
let gameBGM2;  
let playerBgm2; //플레이어가 공격할때
let monsterBgm2;  //몬스터가 공격할때

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

let effectIndex2 = 0;
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
//방어 변수
let isDefense2 = false;
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
let attackCooldown2 = 7000;
let lastAttackTime2 = -7000;
// 연출 스케줄 관리를 위한 제어 변수
let gameOverTriggered2 = false; // 사망 시퀀스 시작 여부
let gameOverTimer2 = 0; // 사망 시점이 기록될 변수
let fadeAmount2 = 0;  //페이드 불투명도 (0 ~ 255)

let resultState2 = "";

const wordList2 = [
  "사과","조용한","커다랗다","공격","역사","곱하다","컴퓨터",
  "하늘","고양이","자동차","토마토","비행기","카메라","초콜릿",
  "지켜보다","오래오래","냉수마찰","아리랑","얼마나","나날이",
  "방학","개강","숭실대","글로벌미디어","아트앤태크놀로지",
  "으슥하다","주사위","잠그다","말솜씨","어버이","고리",
  "프로그래밍","피카츄","도서관","시대에","기다리다","대학교",
  "나뭇잎","냉장고","다리미","조용한","복잡한","의자","체육",
  "공사","민들레"
];

let monster2Icon;
let monster_2;
let smallMonster2;
let currentBossDialogue2 = "";
let layer;
let bg3;


let frontLineX = 0;
let gameOver = false;
const DEAD_LINE = 120;
let bossDead = false;
let bossDeathTimer = 0; //전선 패배선 
let fadeAlpha = 0;

let bossDialogues2 = [
  { hp: 85, text: "맥박이 빠르군. 공포인가?" },
  { hp: 60, text: "면역 개체인가? \n실험 결과를 수정해야겠어." },
  { hp: 30, text: "왜 감염되지 않는 거지...?" },
  { hp: 10, text: "예상보다 오래 버티는군." },
  { hp: 1,  text: "격리 실패. 전원 처분한다..." }
];
let playerHitLines2 = ["흥미로운 저항이군..."];

// ========================
// preload
// ========================
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

// ========================
// setup
// ========================
function stage2Setup() {
  rectMode(CENTER);

  if (gameBGM2 && !gameBGM2.isPlaying()) {
    gameBGM2.setVolume(0.5);
    gameBGM2.loop();
  }

  inputBox = createInput();
  inputBox.position(windowWidth / 2 - 100, windowHeight - 60);
  inputBox.size(200, 40);
  inputBox.elt.addEventListener("keydown", checkEnter2);
  inputBox.hide();

  //windowWidth가 확정된 시점에 초기화
  frontLineX = windowWidth / 2;
  bossDead = false;
  bossDeathTimer = 0;
  fadeAlpha = 0;
  bossHP2 = 100;
  playerHP2 = 100;
  gameState2 = "play2";
  gameOver = false;
  words = [];
  bloodEffects2 = [];
  triggeredDialogues2 = [];
  lastSpawnTime2 = millis();
  spawnInterval2 = 3000;
}

// ========================
// draw
// ========================
function stage2Draw() {
  if (gameState2 === "play2") {
    if (inputBox) inputBox.show();
  } else {
    if (inputBox) inputBox.hide();
  }

  if (gameState2 === "play2") {
    if (millis() - lastSpawnTime2 > spawnInterval2) {
      makeWord2();
      lastSpawnTime2 = millis();
    }

    let shakeX = 0, shakeY = 0;
    if (screenShake2 > 0) {
      shakeX = random(-screenShake2, screenShake2);
      shakeY = random(-screenShake2, screenShake2);
      screenShake2 *= 0.9;
    }

    push();
    translate(shakeX, shakeY);
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
    pop();

    drawMessage2();
    drawAttackCooldownUI2();

    if (playerHP2 <= 0) gameState2 = "lose";
  }
  else if (gameState2 === "lose") {
    if (gameBGM2 && gameBGM2.isPlaying()) gameBGM2.stop();
    ending4();
  }
  else if (gameState2 === "win") {
    if (gameBGM2 && gameBGM2.isPlaying()) gameBGM2.stop();
    winScene2();
  }
}

// ========================
// 라인 디펜스
// ========================
function updateFrontLine() {
  frontLineX -= 0.15; // 자동으로 계속 왼쪽 압박
  frontLineX = constrain(frontLineX, 0, width);
}

////전선 시스템
function drawFrontLine() {
  if (!layer) return;
  if (isNaN(frontLineX)) return;

  push();
  imageMode(CORNER);
  tint(255, 180);
  // layer 이미지를 화면 왼쪽(0)부터 frontLineX까지 타일로 덮음
  image(layer, frontLineX+90, 0, width - frontLineX, height);
  pop();
}
//라인이 데드라인에 가까워지면 게임 오버 
function checkGameOver() {
  if (frontLineX <= DEAD_LINE) {
    gameOver = true;
    playerHP2 = 0;
  }
}

// ========================
// 보스 사망 연출
// ========================
function updateBossDeathScene() {
  if (!bossDead) return;
  let elapsed = millis() - bossDeathTimer;
  if (elapsed > 2000) {
    fadeAlpha += 2;
    fill(0, fadeAlpha);
    rectMode(CORNER);
    rect(0, 0, width, height);
  }
  if (elapsed > 5000) { // 총 5초 뒤 승리씬
    // 입력창 숨기기
    if (inputBox) inputBox.hide();
    if (gameBGM2 && gameBGM2.isPlaying()) gameBGM2.stop();
    gameState2 = "win";
    scene = "winScene2"; // scene을 winScene2로 전환해야 키 입력 핸들러가 동작함
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
  triggeredDialogues2 = [];
  bossDialogueTimer2 = 0;
  currentBossDialogue2 = "";
  screenShake2 = 0;
  gameState2 = "play2"; //상태 복구 
  gameOver = false;
  bossDead = false;
  bossDeathTimer = 0;
  fadeAlpha = 0;
  frontLineX = windowWidth / 2; // 재초기화
 //브금 재시작 
  if (gameBGM2 && !gameBGM2.isPlaying()) {
    gameBGM2.setVolume(0.5);
    gameBGM2.loop();
  }
  // 다시 시작 시 3000ms(3초) 초기화 보존
  spawnInterval2 = 3000;
  lastSpawnTime2 = millis();
  if (inputBox) {
    inputBox.removeAttribute("disabled");
    inputBox.show();
    inputBox.value("");
  }
}

// ========================
// 전투 함수들
// ========================
function attackBoss2() {
  if (bossDead) return;
  if (playerBgm2) { playerBgm2.setVolume(0.7); playerBgm2.play(); }
  bossHP2 -= 18;
  monsterHitBlinkTimer2 = 20;
  frontLineX += 25;
  frontLineX = constrain(frontLineX, 0, width * 0.8);
  currentBossDialogue2 = random(playerHitLines2);
  bossDialogueTimer2 = 120;
  if (bossHP2 <= 0) {
    bossHP2 = 0;
    bossDead = true;
    bossDeathTimer = millis();
    currentBossDialogue2 = "격리 실패. 전원 처분한다...";
    bossDialogueTimer2 = 180;
    // 입력 비활성화
    if (inputBox) inputBox.attribute("disabled", true);
    // 남은 공격 제거
    pendingDamage2 = 0;
    // 공격 애니메이션 중단
    monsterAttackAnim2 = false;
    // 작은 몬스터 정지
    for (let w of words) w.speed = 0;
  }
}
//방어 
function defend2() {
  if (defendBgm2) { defendBgm2.setVolume(0.7); defendBgm2.play(); }
  shieldActive2 = true;
  shieldTimer2 = 40;
  guardSuccess2 = true;
  showMessage2("방어했다!");
  setTimeout(() => { guardSuccess2 = false; }, 1000); // 일정 시간 후 해제, 1초 유지 
}
//보스 공격 시스템 
function bossAttackSystem2() {
  if (millis() - lastBossAttackTime2 > 4000) {
    if (monsterBgm2) { monsterBgm2.setVolume(0.8); monsterBgm2.play(); }
    lastBossAttackTime2 = millis();
    screenShake2 = 20;
    monsterAttackAnim2 = true;
    monsterAttackFrame2 = 0;
    monsterAttackTimer2 = 0;
    pendingDamage2 = 18;
    damageTimer2 = 60;
    showMessage2("공격이 들어온다!");
  }
}
//방어 시스템 
function handlePendingDamage2() {
  if (damageTimer2 > 0) damageTimer2--;
  if (damageTimer2 === 0 && pendingDamage2 > 0) {
    if (guardSuccess2) {
      showMessage2("완벽히 방어했다!");
    } else {
      playerHP2 -= pendingDamage2;
      showMessage2("으악 공격 당했다!");
      playerHitBlinkTimer2 = 30;
    }
    pendingDamage2 = 0;
  }
}

function showMessage2(msg) {
  messageText2 = msg;
  messageTimer2 = 60;
}
//단어 생성 함수 
function makeWord2() {
  if (bossDead) return;
  let randomWord = random(wordList2); //랜덤하게 생성 
  words.push({
    text: randomWord,
    x: width + 100,
    y: random(250, height - 100),
    speed: random(1, 2),
    hp: 3, maxHp: 3,
    offsetY: random(-30, 30),
    floatSpeed: random(0.01, 0.03),
    hitPlayer: false
  });
}

function checkEnter2(event) {
  if (bossDead) return;
  if (event.key !== "Enter") return;
  let typed = inputBox.value();
  let success = false;
  for (let i = words.length - 1; i >= 0; i--) {
    if (words[i].text === typed) {
      success = true;
      let w = words[i];
      bloodEffects2.push({ x: w.x, y: w.y, life: 20 });
      words.splice(i, 1);
      frontLineX += 120;
      frontLineX = constrain(frontLineX, 0, width * 0.8);
      screenShake2 = 10;
      showMessage2("몬스터 제거 완료!");
      score++;
      break;
    }
  }
  if (!success) {
    frontLineX -= 60;
    screenShake2 = 20;
    showMessage2("타자 입력 완료!");
  }
  inputBox.value("");
}

// ========================
// 애니메이션
// ========================
function updateAttackAnimation2() {
  if (!attackAnim2) return;
  attackTimer2++;
  if (attackTimer2 % 8 === 0) attackFrame2++;
  imageMode(CENTER);
  if (attackFrame2 === 0) image(player_effect1, windowWidth/2.5, windowHeight/1.5, 200, 200);
  else if (attackFrame2 === 1) image(player_effect3, windowWidth/1.8, windowHeight/1.5, 200, 200);
  else if (attackFrame2 === 2) image(player_effect2, windowWidth/1.5, windowHeight/1.4, 200, 200);
  else if (attackFrame2 > 2) attackAnim2 = false;
}
//몬스터 공격 애니메이션 
function updateMonsterAttackAnimation2() {
  if (bossDead || !monsterAttackAnim2) return;
  monsterAttackTimer2++;
  // 프레임 속도 조절
  if (monsterAttackTimer2 % 18 === 0) monsterAttackFrame2++;
  imageMode(CENTER);
  // 왼쪽으로 점점 이동 (프레임이 올라갈수록 -값 증가)
  let offsetX = monsterAttackFrame2 * 350;
  let img;
  if (monsterAttackFrame2 === 0) img = monster_attack3;
  else if (monsterAttackFrame2 === 1) img = monster_attack2;
  else if (monsterAttackFrame2 === 2) img = monster_attack1;
  else { monsterAttackAnim2 = false; return; }
  image(img, windowWidth * 0.75 - offsetX, windowHeight * 0.65, 300, 300);
}

function drawShield2() {
  if (!shieldActive2) return;
  push();
  imageMode(CENTER);
  let pulse = 1 + sin(frameCount * 0.2) * 0.1;
  tint(255, 180);
  image(shield, windowWidth/7, windowHeight/1.5, 220 * pulse, 220 * pulse);
  pop();
  shieldTimer2--;
  if (shieldTimer2 <= 0) shieldActive2 = false;
}

function drawBlood2() {
  for (let i = bloodEffects2.length - 1; i >= 0; i--) {
    let b = bloodEffects2[i];
    fill(255, 0, 0);
    noStroke();
    ellipse(b.x, b.y, random(10, 20), random(10, 20));
    b.life--;
    if (b.life <= 0) bloodEffects2.splice(i, 1);
  }
}

// ========================
// 그리기
// ========================
function monster2() {
  if (monsterHitBlinkTimer2 > 0) monsterHitBlinkTimer2--;
  imageMode(CENTER);
  if (monsterHitBlinkTimer2 > 0 && frameCount % 6 < 3) tint(255, 100);
  else noTint();
  image(monster_2, windowWidth * 0.85, windowHeight * 0.65, 220, 230);
  noTint();
  if (bossDialogueTimer2 > 0) {
    drawSpeechBubble(windowWidth * 0.7, windowHeight * 0.65 - 160, currentBossDialogue2);
  }
}

function player2() {
  if (playerHitBlinkTimer2 > 0 && frameCount % 6 < 3) return;
  imageMode(CENTER);
  // HP 상태에 따라 이미지 변경
  let img = playerHP2 <= 0 ? mainPixel3 : playerHP2 <= 40 ? mainPixel2 : mainPixel;
  image(img, windowWidth / 7, windowHeight / 1.5, 180, 180);
  if (playerHitBlinkTimer2 > 0) playerHitBlinkTimer2--;
}

function stage2() {
  background(0);
  image(bg3, 0, 0, width, height);
  //체력바 
  fill(255);
  rect(windowWidth / 2, windowHeight * 0.15,
       windowWidth - windowWidth * 0.3, windowHeight * 0.1);

  push();
  rectMode(CORNER);
  bossHP2 = constrain(bossHP2, 0, 100);
  playerHP2 = constrain(playerHP2, 0, 100);
  fill(255, 0, 0);
  rect(windowWidth * 0.5, windowHeight / 7.5,
       map(bossHP2, 0, 100, 0, windowWidth * 0.3), windowHeight * 0.05);
  fill(0, 0, 255);
  rect(windowWidth * 0.2, windowHeight / 7.5,
       map(playerHP2, 0, 100, 0, windowWidth * 0.3), windowHeight * 0.05);
  pop();

  fill(255);
  rect(windowWidth / 3.5, windowHeight * 0.09, windowWidth / 6, windowHeight * 0.05);
  fill(0); textAlign(CENTER, CENTER); textSize(30);
  text("나", windowWidth / 3.5, windowHeight * 0.09);

  fill(255);
  rect(windowWidth - windowWidth / 3.5, windowHeight * 0.09,
       windowWidth / 3.6, windowHeight * 0.05);
  fill(0); textSize(22);
  text("흑사병 의사", windowWidth - windowWidth / 3.2, windowHeight * 0.09);

  fill(255);
  ellipse(windowWidth * 0.13, windowHeight * 0.15, 140, 140);
  imageMode(CENTER);
  image(mainCharIcon, windowWidth * 0.13, windowHeight * 0.15, 140, 140);
  ellipse(windowWidth * 0.87, windowHeight * 0.15, 140, 140);
  fill(255);
  ellipse(windowWidth / 2, windowHeight * 0.15, 80, 80);
  image(monster2Icon, windowWidth * 0.87, windowHeight * 0.15, 150, 161);
  textAlign(CENTER, CENTER); fill(0); textSize(45);
  text("VS", windowWidth / 2, windowHeight * 0.16);
  //  작은 몬스터 (타자 RPG 핵심)
  for (let i = words.length - 1; i >= 0; i--) {
    let w = words[i];
    let floatY = w.y + sin(frameCount * w.floatSpeed) * 10;
    imageMode(CENTER);
    //작은 몬스터 이미지
    image(smallMonster2, w.x, floatY + w.offsetY - 20, 100, 100);
    let barW = 50, barH = 6;
    fill(0); rect(w.x - barW/2, floatY + w.offsetY - 60, barW, barH);
    fill(255,0,0); rect(w.x - barW/2, floatY + w.offsetY - 60, barW*(w.hp/w.maxHp), barH);
    let bw = textWidth(w.text) + 30;
    fill(50); rect(w.x, w.y, bw, 50, 10);
    fill(255); textAlign(CENTER,CENTER); textSize(32); text(w.text, w.x, w.y);
    if (!bossDead) w.x -= w.speed;
    // 플레이어 도달 데미지
    if (!bossDead && !w.hitPlayer && w.x < windowWidth * 0.25) {
      playerHP2 -= 10;
      showMessage2("실험쥐에게 물렸다!");
      playerHitBlinkTimer2 = 30;
      w.hitPlayer = true;
    }
    // 몬스터 사망 처리
    if (w.hp <= 0) {
      bloodEffects2.push({ x: w.x, y: w.y, life: 25 });
      showMessage2("처치!"); words.splice(i, 1); score++; continue;
    }
    // 화면 밖 제거
    if (w.x < -200) words.splice(i, 1);
  }
}

function drawMessage2() {
  if (messageTimer2 <= 0) return;
  fill(0, 180);
  rect(windowWidth / 2, windowHeight * 0.08, 400, 60, 10);
  fill(255); textAlign(CENTER, CENTER); textSize(28);
  text(messageText2, windowWidth / 2, windowHeight * 0.08);
  messageTimer2--;
}

function drawAttackCooldownUI2() {
  let bw = 300, bh = 25;
  let x = windowWidth / 2 - bw / 2, y = windowHeight - 110;
  let elapsed = millis() - lastAttackTime2;
  let ratio = constrain(elapsed / attackCooldown2, 0, 1);
  push();
  rectMode(CORNER);
  fill(40, 40, 40, 220); rect(x, y, bw, bh, 10);
  fill(255, 120, 0); rect(x, y, bw * ratio, bh, 10);
  noFill(); stroke(255); strokeWeight(2); rect(x, y, bw, bh, 10);
  noStroke(); fill(255); textAlign(CENTER, CENTER); textSize(18);
  if (ratio >= 1) text("공격 가능", x + bw/2, y + bh/2);
  else text(`쿨타임 ${((attackCooldown2-elapsed)/1000).toFixed(1)}초`, x + bw/2, y + bh/2);
  pop();
}

function updateBossDialogue2() {
   // 타이머 감소
  if (bossDialogueTimer2 > 0) bossDialogueTimer2--;
  else currentBossDialogue2 = "";
  // 새로운 대사 체크
  for (let i = 0; i < bossDialogues2.length; i++) {
    let d = bossDialogues2[i];
    // 아직 안 나온 대사 + HP 조건 만족
    if (bossHP2 <= d.hp && !triggeredDialogues2.includes(i)) {
      currentBossDialogue2 = d.text;
      bossDialogueTimer2 = 180;
      triggeredDialogues2.push(i);
      break;
    }
  }
}

// ========================
// keyPressed 위임 함수
// ========================
function stage2KeyPressed() {
  if (gameState2 === "play2") {
    if (keyCode === RIGHT_ARROW) {
      let now = millis();
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
    if (keyCode === LEFT_ARROW) defend2();
  }
}

// ========================
// 엔딩 씬
// ========================
function ending4() {
  if (typeof ending_bg !== "undefined") image(ending_bg, 0, 0, width, height);
  else background(20, 10, 10);
  push();
  rectMode(CENTER);
  fill(200, 30, 30, 150);
  rect(windowWidth/2, windowHeight/2, windowWidth/1.3+12, windowHeight/2+12, 15);
  fill(15, 15, 20, 230);
  rect(windowWidth/2, windowHeight/2, windowWidth/1.3, windowHeight/2, 12);
  textAlign(CENTER,CENTER); textSize(60); textStyle(BOLD);
  fill(0,0,0,200); text("엔딩4 - 실험체", width/2+4, height/6);
  fill(220,40,40); text("엔딩4 - 실험체", width/2, height/6.4);
  textSize(26); fill(245,245,245); textStyle(NORMAL);
  text("당신은 흑사병 의사에게 패배하였습니다.\n의사의 실험 기록에는 단 한 줄만이 남아 있었습니다.\n\n\"피험체 반응 없음. 다음 실험으로 이행.\"",
    width/2, height/2);
  textSize(24);
  if (select === 0) {
    fill(220,40,40,180); rect(windowWidth/2, windowHeight/1.18, 250, 45, 5);
    fill(255); text("▶ 네 (재도전)", windowWidth/2, windowHeight/1.18);
  } else { fill(255,120); text("네 (재도전)", windowWidth/2, windowHeight/1.18); }
  if (select === 1) {
    fill(220,40,40,180); rect(windowWidth/2, windowHeight/1.10, 380, 45, 5);
    fill(255); text("▶ 아니오 (처음으로 돌아가기)", windowWidth/2, windowHeight/1.10);
  } else { fill(255,120); text("아니오 (처음으로 돌아가기)", windowWidth/2, windowHeight/1.10); }
  pop();
}
//win 씬 
function winScene2() {
  if (typeof bg3 !== "undefined") image(bg3, 0, 0, width, height);
  else background(10, 20, 10);
  push();
  rectMode(CENTER);
  fill(255,215,0,150);
  rect(windowWidth/2, windowHeight/2, windowWidth/1.3+12, windowHeight/2+12, 15);
  fill(15,15,25,230);
  rect(windowWidth/2, windowHeight/2, windowWidth/1.3, windowHeight/2, 12);
  textAlign(CENTER,CENTER); textSize(75); textStyle(BOLD);
  fill(0,0,0,200); text("VICTORY", width/2+4, height/6);
  fill(255,223,0); text("VICTORY", width/2, height/6.4);
  textSize(28); fill(245,245,245); textStyle(NORMAL);
  text("흑사병 의사를 물리쳤습니다.\n\n병동에는 더 이상 실험 소리가 들리지 않습니다.\n두 번의 시험을 모두 통과했습니다.", width/2, height/2);
  textSize(20);
  fill(255, 215, 0, (frameCount % 60 < 40) ? 180 : 60);
  text("- 종료하려면 ENTER 키를 누르세요. -", width/2, height/1.15);
  pop();
}
