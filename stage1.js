// ==========================================
// [stage1.js] 
// ==========================================
let gameBGM;
let playerBgm; //플레이어가 공격할때
let monsterBgm; //몬스터가 공격할때
let defendBgm; //방어할때

let inputBox; // 입력창
let words = []; // 단어 목록
let score = 0; 
//이미지 변수 
let mainCharIcon;
let monsterIcon;

let mainPixel;
let mainPixel2;
let mainPixel3;
let monster_1;
let monster_1Pixel2;  
let monster_1Pixel3;
let message;
let smallMonster1; 
let player_effect1;
let player_effect2;
let player_effect3;
let speechBubble;
let currentBossDialogue = "";
let gameState = "play";

let spawnInterval = 3000; // 처음 3초
let lastSpawnTime = 0;

let bg;
let ending_bg;
//플레이어 어택 변수 
let attackAnim = false;
let attackFrame = 0;
let attackTimer = 0;
//몬스터 어택 변수 
let monsterAttackAnim = false;
let monsterAttackFrame = 0;
let monsterAttackTimer = 0;

let effectIndex = 0; //전투 효과 인덱스 
let showEffect = false;
let effectTimer = 0;

let monster_attack1;
let monster_attack2;
let monster_attack3;
let shield;
//HP
let bossHP = 100;
let playerHP = 100;
//방어 
let pendingDamage = 0;
let damageTimer = 0;
//깜빡이는 효과에 쓰이는 변수 
let isInvincible = false;  
let lastBossAttackTime = 0;
//메시지 변수 
let messageText = "";
let messageTimer = 0;
let isDefense = false;
//방어 변수 
let shieldActive = false;
let shieldTimer = 0;
let guardSuccess = false;

let bossDialogueTimer = 0;
let triggeredDialogues = [];

let playerHitBlinkTimer = 0;
let monsterHitBlinkTimer = 0;
//작은 몬스터 터지는 효과 
let bloodEffects = [];
let screenShake = 0;
//쿨 타임 
let attackCooldown = 7000; // 7초
let lastAttackTime = -7000;

//let select = 0; 

// 연출 스케줄 관리를 위한 제어 변수
let gameOverTriggered = false; // 사망 시퀀스 시작 여부
let gameOverTimer = 0;         // 사망 시점이 기록될 변수
let fadeAmount = 0;            // 페이드 불투명도 (0 ~ 255)

let resultState = ""; // "win" 또는 "lose"
//단어 리스트 
const wordList = [
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

// 말풍선 대사
let bossDialogues = [
  { hp: 85, text: "전쟁은 곧 신의 언어다." },
  { hp: 60, text: "이건 전쟁이다. \n아름다운 전쟁이다." },
  { hp: 30, text: "왜 쓰러지지 않는가… \n이것도 신의 뜻인가?" },
  { hp: 10,  text: "심판은 아직 \n끝나지 않았다!!!" }
];

// 몬스터 피격시 대사
let playerHitLines = [
  "크윽!!"
];

// 메인 sketch.js의 preload에서 호출할 함수
function stage1Preload() {
  gameBGM = loadSound("game.mp3");
  playerBgm = loadSound("playerattack.mp3");
  monsterBgm = loadSound("monsterAttack.mp3");
  defendBgm = loadSound("defendSound.mp3");
  
  bg = loadImage("bg.png");
  ending_bg = loadImage("ending_bg.png");
  mainCharIcon = loadImage("mainCharIcon.png");
  monsterIcon = loadImage("monsterIcon.png");
  mainPixel = loadImage("mainPixel.png");
  mainPixel2 = loadImage("mainPixel2.png");
  mainPixel3 = loadImage("mainPixel3.png");
  
  monster_1 = loadImage("monster1.png");
  monster_1Pixel2 = loadImage("monster_1Pixel2.png"); 
  monster_1Pixel3 = loadImage("monster_1Pixel3.png");
  message = loadImage("message.png");
  smallMonster1 = loadImage("smallMonster1.png");
  player_effect1 = loadImage("player_effect1.png");
  player_effect2 = loadImage("player_effect2.png");
  player_effect3 = loadImage("player_effect3.png");
  monster_attack1 = loadImage("monster_attack1.png");
  monster_attack2 = loadImage("monster_attack2.png");
  monster_attack3 = loadImage("monster_attack3.png");
  shield = loadImage("shield.png");
  speechBubble = loadImage("bubble.png");
  playerBgm.setVolume(0.5);
  monsterBgm.setVolume(0.7);
  defendBgm.setVolume(0.4);
}

// 메인 sketch.js의 setup에서 호출할 함수
function stage1Setup() {
  inputBox = createInput();
  push();
  rectMode(CENTER);
  inputBox.position(windowWidth / 2 - 100, windowHeight - 60);
  inputBox.size(200, 40);
  inputBox.elt.addEventListener("keydown", checkEnter);
  pop();
  inputBox.hide(); 
}

// 메인 sketch.js에서 구동할 메인 루프
function stage1Draw() {
  if (!gameBGM.isPlaying()) {
    gameBGM.setVolume(0.5);
    gameBGM.loop();
  }
  push();
  rectMode(CENTER); 

  if (gameState === "play") {
    if (inputBox) inputBox.show(); 
    
    // 게임 로직들
    let shakeX = 0;
    let shakeY = 0;
    if (screenShake > 0) {
      shakeX = random(-screenShake, screenShake);
      shakeY = random(-screenShake, screenShake);
      screenShake *= 0.9;
    }

    push();
    translate(shakeX, shakeY);
    stage1();
    monster1();
    player();
    drawShield();
    handlePendingDamage();
    drawBlood();
    updateBossDialogue();
    bossAttackSystem();
    updateMonsterAttackAnimation();
    handleWordSpawn();
    if (frameCount % 120 === 0) smallMonsterAttack();
    updateAttackAnimation();
    pop();
    
    drawMessage();
    drawAttackCooldownUI();
    updateFadeOutScene(); // 여기서 gameState가 win/lose로 변경됨

    // 승패 판정
    if (playerHP <= 0 && !gameOverTriggered) {
      gameOverTriggered = true;
      gameOverTimer = millis();
      resultState = "lose";
    }
    if (bossHP <= 0 && !gameOverTriggered) {
      gameOverTriggered = true;
      gameOverTimer = millis();
      resultState = "win";
    }
  } 
  // else if를 사용하여 play 상태가 아닐 때 씬이 겹치지 않게 함
  else if (gameState === "lose") {
    if (inputBox) inputBox.hide(); 
    ending2(); 
  }
  else if (gameState === "win") {
    if (inputBox) inputBox.hide();
    winScene();
    // 씬 전환 로직은 여기에 위치
    if (keyIsPressed && keyCode === ENTER) {
      gameBGM.stop();
      music2.stop();

      roomBGM.setVolume(0.5);
      roomBGM.loop();
      scene = "story2";
      gameState = "play"; 
    }
  }
  
  pop(); 
}

function updateFadeOutScene() {

  if (!gameOverTriggered) return;

  let elapsed = millis() - gameOverTimer;

  // 2초 후부터 페이드 시작
  if (elapsed > 2000) {

    fadeAmount += 3;
    fadeAmount = constrain(fadeAmount, 0, 255);

    push();
    fill(0, fadeAmount);
    noStroke();
    rectMode(CORNER);
    rect(0, 0, width, height);
    pop();
  }

  // 총 5초 후 결과 화면 전환
  if (elapsed > 5000) {
    gameBGM.stop();

    gameState = resultState;

    gameOverTriggered = false;
    fadeAmount = 0;
  }
}

// 메인 sketch.js의 keyPressed에서 넘겨받을 함수
function stage1KeyPressed() {
  if (gameState === "play") {
    if (keyCode === RIGHT_ARROW) {
      let now = millis();
      if (now - lastAttackTime >= attackCooldown) {
        lastAttackTime = now;
        attackBoss();
        attackAnim = true;
        attackFrame = 0;
        attackTimer = 0;
      } else {
        showMessage("아직 공격할 수 없다!");
      }
    }

    if (keyCode === LEFT_ARROW) {
      defend();
    }
  }

  else if (gameState === "lose") {
    if (keyCode === UP_ARROW || keyCode === DOWN_ARROW) {
      select = 1 - select; 
    }

    if (keyCode === ENTER) {
      if (select === 0) {
        resetGame(); 
      } else {
        location.reload(); 
      }
    }
  }
  if (scene === "beforeStage2") {
  handleBeforeStage2KeyPress();
  return;
}
}

function stage1WindowResized() {
  if (inputBox) {
    inputBox.position(windowWidth / 2 - 100, windowHeight - 60);
  }
}
//게임 재시작 함수 
function resetGame() {
  bossHP = 100;
  playerHP = 100;
  words = [];
  bloodEffects = [];
  score = 0;
  pendingDamage = 0;
  damageTimer = 0;
  triggeredDialogues = [];
  bossDialogueTimer = 0;
  currentBossDialogue = "";
  screenShake = 0;
  gameState = "play";
  
  // 다시 시작 시 3000ms(3초) 초기화 보존
  spawnInterval = 3000; 
  lastSpawnTime = millis(); 

  inputBox.show(); 
  inputBox.value(""); 
}

function handleWordSpawn() {
  if (millis() - lastSpawnTime > spawnInterval) {
    makeWord();
    lastSpawnTime = millis();
    
    //후반부에 과부하가 오지 않도록 최소 주기를 1400ms(1.4초)로 제한하고 단어 증가 폭 조절
    if (spawnInterval > 1400) {
      spawnInterval -= 80;
    }
  }
}
//메시지 출력 
function drawMessage() { 
  if (messageTimer <= 0) return;
  fill(0, 180); 
  rect(windowWidth / 2, windowHeight * 0.08, 400, 60, 10); 
  fill(255); 
  textAlign(CENTER, CENTER); 
  textSize(28); 
  text(messageText, windowWidth / 2, windowHeight * 0.08);
  messageTimer--; 
}

function handlePendingDamage() {
  if (damageTimer > 0) {
    damageTimer--;
  }
  if (damageTimer === 0 && pendingDamage > 0) {
    if (guardSuccess) {
      showMessage("완벽히 방어했다!");
    } else {
      playerHP -= pendingDamage;
      showMessage("으악 공격 당했다!");
      playerHitBlinkTimer = 30;
    }
    pendingDamage = 0;
  }
}
//어택 애니메이션 
function updateAttackAnimation() { 
  if (!attackAnim) return;
  attackTimer++; 
  if (attackTimer % 8 === 0) { 
    attackFrame++; 
  } 
  imageMode(CENTER); 
  if (attackFrame === 0) { 
    image(player_effect1, windowWidth/2.5, windowHeight/1.5, 200, 200); 
  } else if (attackFrame === 1) { 
    image(player_effect3, windowWidth/1.8, windowHeight/1.5, 200, 200); 
  } else if (attackFrame === 2) { 
    image(player_effect2, windowWidth/1.5, windowHeight/1.4, 200, 200); 
  } else if (attackFrame > 2) { 
    attackAnim = false;
  } 
}
//큰 몬스터 
function monster1() {
  imageMode(CENTER);
  let img;
  
  if (bossHP <= 0) {
    img = monster_1Pixel3;
  } else if (bossHP <= 40) {
    img = monster_1Pixel2;
  } else {
    img = monster_1; 
  }

  if (monsterHitBlinkTimer > 0) {
    monsterHitBlinkTimer--;
  }
  
  if (monsterHitBlinkTimer > 0 && frameCount % 6 < 3) {
    tint(255, 100);
  } else {
    noTint();
  }
  
  image(img, windowWidth * 0.85, windowHeight * 0.65, 220, 230);
  noTint();

  if (bossDialogueTimer > 0) {
    drawSpeechBubble(windowWidth * 0.7, windowHeight * 0.65 - 160, currentBossDialogue);
  }
}
//어택 메시지 
function attak_message() {
  image(message, windowWidth/2, windowHeight * 0.27, 270, 80);
  textSize(30);
  fill(255,255,0);
  text("앗!        당했다!",windowWidth / 2.8, windowHeight * 0.27);
  fill("255");
  text("공격",windowWidth / 2.35, windowHeight * 0.27);
}

function player() {
  if (playerHitBlinkTimer > 0 && frameCount % 6 < 3) {
    return;
  }
  imageMode(CENTER);
  let img;
  if (playerHP <= 0) {
    img = mainPixel3;
  } else if (playerHP <= 40) {
    img = mainPixel2;
  } else {
    img = mainPixel; 
  }
  image(img, windowWidth / 7, windowHeight / 1.5, 180, 180);

  if (playerHitBlinkTimer > 0) {
    playerHitBlinkTimer--;
  }
}

function stage1() {
  background(bg, width/2, height/2, width, height);

  fill(255);
  rect(windowWidth / 2, windowHeight * 0.15, windowWidth - windowWidth * 0.3, windowHeight * 0.1);

  push();
  rectMode(CORNER); 

  let bossBarX = windowWidth * 0.5;
  let bossBarY = windowHeight / 7.5;
  let playerBarX = windowWidth * 0.2;
  let playerBarY = windowHeight / 7.5;

  bossHP = constrain(bossHP, 0, 100);
  playerHP = constrain(playerHP, 0, 100);

  fill(255, 0, 0);
  rect(bossBarX, bossBarY, map(bossHP, 0, 100, 0, windowWidth * 0.3), windowHeight * 0.05);

  fill(0, 0, 255);
  rect(playerBarX, playerBarY, map(playerHP, 0, 100, 0, windowWidth * 0.3), windowHeight * 0.05);
  pop();

  fill(255);
  rect(windowWidth / 3.5, windowHeight * 0.09, windowWidth / 6, windowHeight * 0.05);

  fill(0);
  textAlign(CENTER, CENTER);
  textSize(30);
  text("나", windowWidth / 3.5, windowHeight * 0.09);

  fill(255);
  rect(windowWidth - windowWidth / 3.5, windowHeight * 0.09, windowWidth / 3.6, windowHeight * 0.05);

  fill(0);
  textSize(22);
  text("전쟁광 수도사", windowWidth - windowWidth / 3.2, windowHeight * 0.09);

  fill(255); 
  ellipse(windowWidth * 0.13, windowHeight * 0.15, 140, 140);   
  imageMode(CENTER);
  image(mainCharIcon, windowWidth * 0.13, windowHeight * 0.15, 140, 140);
  ellipse(windowWidth * 0.87, windowHeight * 0.15, 140, 140); 
  
  fill(255); 
  image(monsterIcon, windowWidth * 0.87, windowHeight * 0.15, 150, 161) 
  ellipse(windowWidth / 2, windowHeight * 0.15, 80, 80);         
  textAlign(CENTER, CENTER); 
  fill(0); 
  textSize(45); 
  text("VS", windowWidth / 2, windowHeight * 0.16);

  for (let i = words.length - 1; i >= 0; i--) {
    let w = words[i];
    let floatY = w.y + sin(frameCount * w.floatSpeed) * 10;

    imageMode(CENTER);
    image(smallMonster1, w.x, floatY + w.offsetY - 20, 100, 100);

    let boxWidth = textWidth(w.text) + 30;
    let boxHeight = 50;

    fill(50);
    rect(w.x, w.y, boxWidth, boxHeight, 10);

    fill(255);
    textAlign(CENTER, CENTER);
    textSize(32);
    text(w.text, w.x, w.y);

    w.x -= w.speed;

    if (!w.hitPlayer && w.x < windowWidth * 0.25) {
      playerHP -= 10;
      showMessage("처형견에게 물렸다!");
      playerHitBlinkTimer = 30;
      w.hitPlayer = true;
    }

    if (w.hp <= 0) {
      bloodEffects.push({ x: w.x, y: w.y, life: 25 });
      showMessage("처치!");
      words.splice(i, 1);
      score++;
      continue;
    }

    //플레이어 뒤로 멀리 지나간 몬스터를 신속히 지워 렉을 사전에 차단
    if (w.x < windowWidth * 0.05) {
      words.splice(i, 1);
    }
  }
}
//보스 어택 함수 
function attackBoss() {
  playerBgm.play();
  
  bossHP -= 15; //플레이어 공격 시 데미지 
  monsterHitBlinkTimer = 20;
  currentBossDialogue = random(playerHitLines);
  bossDialogueTimer = 120;
  effectIndex = (effectIndex + 1) % 3;
  effectTimer = 10;
  isInvincible = true;
  setTimeout(() => { isInvincible = false; }, 200);
}
//방어 함수 
function defend() {
  defendBgm.play();
  shieldActive = true;
  shieldTimer = 40;
  guardSuccess = true; 
  showMessage("방어했다!");
  setTimeout(() => { guardSuccess = false; }, 1000); 
}

function drawSpeechBubble(x, y, textStr) {
  noTint();
  imageMode(CENTER);
  image(speechBubble, x - 20, y - 70, 330, 220);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(20);
  text(textStr, x-17, y - 57);
}
//방어 이미지 그리기 함수 
function drawShield() {
  if (!shieldActive) return;
  push();
  imageMode(CENTER);
  let pulse = 1 + sin(frameCount * 0.2) * 0.1;
  tint(255, 180);
  image(shield, windowWidth/7, windowHeight/1.5, 220 * pulse, 220 * pulse);
  pop();
  shieldTimer--;
  if (shieldTimer <= 0) {
    shieldActive = false;
  }
}

function bossAttackSystem() {
  if (millis() - lastBossAttackTime > 6000) {
    monsterBgm.play();
    lastBossAttackTime = millis();
    screenShake = 20;
    monsterAttackAnim = true;
    monsterAttackFrame = 0;
    monsterAttackTimer = 0;
    pendingDamage = 25;
    damageTimer = 60;
    showMessage("공격이 들어온다!");
  }
}
//몬스터 어택 
function updateMonsterAttackAnimation() {
  if (!monsterAttackAnim) return;
  monsterAttackTimer++;
  if (monsterAttackTimer % 18 === 0) {
    monsterAttackFrame++; //몬스터 맞으면 프레임 깜빡임 
  }
  imageMode(CENTER);
  let img;
  let offsetX = monsterAttackFrame * 350; //공격 이펙트 x거리 

  if (monsterAttackFrame === 0) {
    img = monster_attack3;
  } else if (monsterAttackFrame === 1) {
    img = monster_attack2;
  } else if (monsterAttackFrame === 2) {
    img = monster_attack1;
  } else {
    monsterAttackAnim = false;
    return;
  }
  image(img, windowWidth * 0.75 - offsetX, windowHeight * 0.65, 300, 300);
}

function showMessage(msg) {
  messageText = msg;
  messageTimer = 60;
}
//작은 몬스터가 플레이어에게 닿으면 메시지 출력 
function smallMonsterAttack() {
  for (let i = 0; i < words.length; i++) {
    if (!words[i].hitPlayer && words[i].x < windowWidth * 0.25) {
      playerHP -= 10;
      showMessage("작은 몬스터에게 맞았다!");
      playerHitBlinkTimer = 30;
      words[i].hitPlayer = true;
    }
  }
}
//단어 만들기 
function makeWord() {
  let randomWord = random(wordList); //단어 리스트에서 랜덤하게 가져옴 
 words.push({
    text: randomWord,
    x: width + 100,
    y: random(250, height - 100),
    speed: random(1, 2),
    hp: 1,
    maxHp: 1,
    offsetY: random(-30, 30),
    floatSpeed: random(0.01, 0.03),
    hitPlayer: false
  });
}
//보스 대사 업데이트 
function updateBossDialogue() {
  if (bossDialogueTimer > 0) {
    bossDialogueTimer--;
  } else {
    currentBossDialogue = "";
  }
  for (let i = 0; i < bossDialogues.length; i++) {
    let d = bossDialogues[i];
    if (bossHP <= d.hp && !triggeredDialogues.includes(i)) {
      currentBossDialogue = d.text;
      bossDialogueTimer = 180;
      triggeredDialogues.push(i);
      break;
    }
  }
}
//엔터 눌렀다면 -> 단어 입력됨 
function checkEnter(event) {
  if (event.key === "Enter") {
    let typed = inputBox.value();
    for (let i = words.length - 1; i >= 0; i--) {
      if (words[i].text === typed) {
        let w = words[i];
        bloodEffects.push({ x: w.x, y: w.y, life: 20 });
        words.splice(i, 1);  
        score++;
        break;
      }
    }
    inputBox.value("");
  }
}
//작은 몬스터 사망 시 나오는 이펙트 
function drawBlood() {
  for (let i = bloodEffects.length - 1; i >= 0; i--) {
    let b = bloodEffects[i];
    fill(255, 0, 0);
    noStroke();
    ellipse(b.x, b.y, random(10, 20), random(10, 20));
    b.life--;
    if (b.life <= 0) {
      bloodEffects.splice(i, 1);
    }
  }
}
//쿨타임 ui 
function drawAttackCooldownUI() {
  let barWidth = 300;
  let barHeight = 25;
  let x = windowWidth / 2 - barWidth / 2;
  let y = windowHeight - 110;
  let elapsed = millis() - lastAttackTime;
  let ratio = constrain(elapsed / attackCooldown, 0, 1);
  
  push();
  fill(50);
  rectMode(CORNER);
  rect(x, y, barWidth, barHeight, 10);
  fill(255, 180, 0);
  rect(x, y, barWidth * ratio, barHeight, 10);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(18);
  if (ratio >= 1) {
    text("공격 가능", x + barWidth / 2, y + barHeight / 2);
  } else {
    let remain = ((attackCooldown - elapsed) / 1000).toFixed(1);
    text(`쿨타임 ${remain}초`, x + barWidth / 2, y + barHeight / 2);
  }
  pop();
}
//엔딩 씬 
function ending2() {
  image(ending_bg, 0, 0, width, height);

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
  text("엔딩2-용감한 거지", width / 2 + 4, height / 6);
  
  fill(220, 40, 40); 
  text("엔딩2-용감한 거지", width / 2, height / 6.4);

  textSize(26);
  fill(245, 245, 245);
  textAlign(CENTER, CENTER);
  
  let storyText = 
      "당신은 전쟁광 수도승에게 패배하였습니다.\n" +
            "거지였던 당신이 왕국을 위해 싸운건\n" +
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
//이겼을때 나오는 씬 
function winScene() {
  image(bg, 0, 0, width, height);

  push();
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
  
  let storyText = "전쟁광 수도승을 완벽히 쓰러뜨렸습니다.\n\n" +
                  "마침내 폐허가 된 수도원에는\n" +
                  "더 이상 광기에 가득 찬 \n기도 소리가 들리지 않습니다...";
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
