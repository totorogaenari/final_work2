//sketch.js

//브금과 효과음
let introBgm;
let music2;
let roomBGM;
let glassBreak2;

let scene = "start"; // 전체 게임의 씬을 제어하는 유일한 변수
let playerName = "";
let userName = ""; // 사용자 이름 변수 통합

//배경 사진 및 아이콘 이미지
let castle2;
let bg1;

let mainIcon;
let ownerIcon;
let logo;
let man;
let villan;

//대사 
let dialogues;
let dialogueIndex = 0;

// 배경 이미지 변수
let bgCastle;
let bgHall;
let bgMonastery;

// 캐릭터 이미지 변수
let mainChar;
let maidIcon;

//대사
let dialogues1;
let dialogues2;
let dialogues3;
let dialogues4;
let dialogues5;
let helpIndex = 0;
let ignoreIndex = 0;

let bottleDialogues;
let bottleIndex = 0;

let broomDialogues;
let broomIndex = 0;

// 변수 선언 추가 및 통합
let mainStoryIndex = 0; 
let select = 0;          
let afterNameDialogues = [];
let afterNameIndex = 0;
let winIndex = 0;
let acceptIndex = 0;
let refuseIndex = 0;

// 외부(minigame.js)에서 주입 및 사용될 대사집 배열 변수 유지
let winDialogues = [];
let acceptDialogues = [];
let refuseDialogues = [];

function preload() {
  introBgm = loadSound("intro.mp3");
  music2 = loadSound("music2.mp3");
  roomBGM = loadSound("room.mp3");
  glassBreak = loadSound("glassBreak2.mp3");
  
  castle2 = loadImage("castle.png");
  bg1 = loadImage("funeral.png");
  bg2 = loadImage("bar.png");
  mainIcon = loadImage("mainChar.png");
  ownerIcon = loadImage("owner.png");
  logo = loadImage("logo.png");
  man = loadImage("man.png");
  villan = loadImage("villan.png");
  
  bgCastle = loadImage("kingdom.png");
  bgHall = loadImage("hallway.png");
  bgMonastery = loadImage("bgMonastery.png");

  mainChar = loadImage("mainChar.png");
  maidIcon = loadImage("maid.png");
  
  // minigame.js 의 이미지 에셋 로드 함수 호출
  if (typeof preloadMinigame === "function") {
    preloadMinigame();
  }

  // stage1.js의 에셋 로더 엔진 강제 연동
  if (typeof stage1Preload === "function") {
    stage1Preload();
  }
  if (typeof stage2Preload === "function") {
    stage2Preload();
  }
  preloadBeforeStage2();
  preloadFinal();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  fullscreen(true);
  setupBeforeStage2();
  
  introBgm.setVolume(0.5);
  introBgm.loop();


  // 첫번째 대화 
  dialogues1 = [
    { speaker: "", text: "밤하늘엔 검은 연기만이 떠올랐다.\n왕국의 수도, 아르덴.\n국왕의 장례식 종소리가\n 도시 전체를 뒤덮고 있었다." },
    { speaker: "[병사1]", text: "국왕 폐하께서… 정말 돌아가신 건가?" },
    { speaker: "[병사2]", text: "후계자가 없어 왕위를 이을 사람도 없다는데... \n정말 큰일이야" },
    { speaker: "[시민1]", text: "동쪽 국경의 베르하임 놈들이 벌써 \n군대를 모은다더군." },
    { speaker: "[시민2]", text: "혼란해진 틈을 타 공격을 하려는건가. \n우린 이제 끝이야." },
    { speaker: "[시민3]", text: "전쟁이야… 전쟁이 온다고…" },
    { speaker: "", text: "(멀리서 장례식 종소리가 울린다.)" }
  ];

  // 두번째 대화씬 
  dialogues2 = [
    { speaker: "", text: "술집은 시끄럽고 어두웠다. \n구석 자리에는 허름한 차림의 남자가 \n술병을 붙잡은 채 앉아 있었다.", icon: null },
    { speaker: "", text: "한때 왕국 최고의 용병대장이라 불렸던 남자.\n하지만 지금은 빚과 술에 찌든 \n몰락한 거지일 뿐이었다.", icon: mainIcon },
    { speaker: "[주점 주인]", text: "야, 또 외상이냐?", icon: ownerIcon },
    { speaker: "[나]", text: "...내 이름값 정도면 술 한 잔쯤은 줄 수 있잖아.", icon: mainIcon },
    { speaker: "[주점 주인]", text: "이름값? 하!\n10년 전 전쟁 이야기로 평생 먹고살 줄 알았냐?", icon: ownerIcon },
    { speaker: "[시민1]", text: "그러니까... 저 인간이 \n 그 ‘검은 사자 용병단’ 대장이었다고?" },
    { speaker: "[시민2]", text: "지금은 그냥 술주정뱅이잖아.\n이전까지 번 돈을 전부 \n도박에 탕진했다고 하더군" },
    { speaker: "[나]", text: ".......", icon: mainIcon },
    { speaker: "", text: "(그 순간 밖에서 비명 소리가 들린다)", icon: null },
    { speaker: "[여자]", text: "도, 도둑이다!!", icon: null },
    { speaker: "[남자]", text: "누가 좀 막아!!", icon: null },
    { speaker: "", text: "거대한 덩치의 도둑이 \n사람들을 밀치며 골목을 뛰어간다.", icon: null },
    { speaker: "[주점 주인]", text: "또 저 괴물인가. \n 몇년째 마을을 괴롭히고 있는건지 모르겠군. \n 용병들 조차 잡지 못하니 원...", icon: ownerIcon },
    { speaker: "[손님들]", text: "“건드리지 마!”\n“팔 하나가 통나무만 하다던데!”", icon: null }
  ];

  // 세번째 대화씬 
  dialogues3 = [
    { speaker: " ", text: "어떻게 하겠습니까?", icon: null }
  ];
  
  // '무시하기' 선택지 대화
  dialogues4 = [
    { speaker: "", text: "(갑자기 시민들이 웅성거리는 \n소리가 점점 가까워진다.)", icon: null },
    { speaker: "", text: "콰앙!!!!", icon: null },
    { speaker: "[술집 주인]", text: "뭐, 뭐야!!", icon: null },
    { speaker: "[도둑]", text: "다들 돈 되는 건 내놔라.", icon: villan },
    { speaker: "", text: "(손님들은 공포에 질려 구석으로 도망친다)", icon: null },
    { speaker: "", text: "(도둑은 한 손으로 테이블을 걷어차 박살낸다.)", icon: null },
    { speaker: "", text: "(도둑의 시선이 천천히 주인공에게 향한다.)", icon: null },
    { speaker: "", text: "(도둑이 당신에게 다가온다.)", icon: null },
    { speaker: "", text: "(지금 당신의 상태라면 도둑에게 \n완패하고 말것이다. \n 무언가 도구가 필요하다...)", icon: null }
  ];

  // '시민을 돕는다' 선택지 대화
  dialogues5 = [
    { speaker: "", text: "(당신은 술잔을 내려놓고 \n천천히 자리에서 일어났다.)", icon: null },
    { speaker: "[술집 주인]", text: "어이, 돈은 내고 가야지!", icon: null },
    { speaker: "", text: "당신은 술집 주인을 뒤로 한채 밖으로 나온다.", icon: null },
    { speaker: "[시민들]", text: "“저쪽이다!”\n“막아!!”", icon: null },
    { speaker: "[시민들]", text: "(골목 끝.\n거대한 남자가 등을 돌린 채 서 있었다.)", icon: null },
    { speaker: "[도둑]", text: "뭐냐? 술 취한 거지인가?", icon: villan },
    { speaker: "", text: "(그 순간,\n도둑이 괴성을 지르며 돌진해온다.)", icon: null },
    { speaker:"",text: "(지금 당신의 상태라면 도둑에게 완패당한다. \n 무언가 도구가 필요하다...)", icon: null }
  ];
//유리병 선택지
  bottleDialogues = [
    { speaker: "", text: "(당신은 바닥에 굴러다니던 \n유리병을 집어 들었다.)", icon: null },
    { speaker: "[나]", text: "...이 정도면 충분하겠지.", icon: mainIcon },
    { speaker: "", text: "(당신은 힘껏 유리병을 던졌다.)", icon: null },
    { speaker: "", text: "쨍그랑!!", icon: null },
    { speaker: "[도둑]", text: "...끝이냐?", icon: villan },
    { speaker: "", text: "(유리 조각은 산산조각 났지만\n도둑은 눈 하나 깜빡이지 않았다.)", icon: null },
    { speaker: "", text: "(오히려 도둑의 표정이 더욱 험악해진다.)", icon: null },
    { speaker: "", text: "다른 도구를 선택해야 한다...", icon: null }
  ];
//빗자루 선택지
  broomDialogues = [
    { speaker: "", text: "(당신은 벽 구석에 기대어 있던 \n빗자루를 집어 들었다.)", icon: null },
    { speaker: "[도둑]", text: "...뭐냐 그건?", icon: villan },
    { speaker: "[술집 주인]", text: "미쳤나?!\n빗자루로 저 괴물을 상대한다고?!", icon: ownerIcon }, 
    { speaker: "", text: "(당신은 빗자루를 낮게 고쳐 잡는다.)", icon: null },
    { speaker: "",  text:"(당신은 빗자루 끝부분을 이용해 \n도둑을 밀어내기로 한다.)", icon: null },
    { speaker: "", text:"(도둑이 괴성을 지르며 거칠게 돌진해온다...)", icon: null }
  ];
  
  dialogues = [
    { speaker: "", text: "(성문이 열리고 왕국 내부로 진입한다.)", bg: "castle", icon: null },
    { speaker: "[나]", text: "생각보다 평화롭군…", bg: "castle", icon: mainChar },
    { speaker: "[카렌]", text: "겉보기에는 그렇습니다.", bg: "castle", icon: man },
    { speaker: "", text: "(왼쪽 복도에서 누군가가 다가온다.)", bg: "castle", icon: null },
    { speaker: "[시녀]", text: "여기까지 오시느라 고생 많으셨습니다.", bg: "castle", icon: maidIcon },
    { speaker: "[나]", text: "...너는?", bg: "castle", icon: mainChar },
    { speaker: "[시녀]", text: "저는 이 왕궁의 시녀입니다.\n후보자님의 시중을 들라는 명을 받았습니다.", bg: "castle", icon: maidIcon },
    { speaker: "", text: "(시녀는 가볍게 고개를 숙인다)", bg: "castle", icon: maidIcon },
    { speaker: "[시녀]", text: "다음 테스트를 위해 최선을 다하겠습니다.", bg: "castle", icon: maidIcon },
    { speaker: "[나]", text: "테스트?", bg: "castle", icon: mainChar },
    { speaker: "[카렌]", text: "이곳에서는 왕이 되기 위해\n자격을 증명해야 합니다.", bg: "castle", icon: man },
    { speaker: "[카렌]", text: "두 개의 테스트를 통과해야\n왕의 자격을 얻을 수 있습니다.", bg: "castle", icon: man },
    { speaker: "[시녀]", text: "피곤하실 테니\n방으로 안내하겠습니다.", bg: "castle", icon: maidIcon },
    { speaker: "[시녀]", text: "…곧 첫 번째 테스트가 시작됩니다.", bg: "castle", icon: maidIcon },
    { speaker: "", text: "(수행원을 따라 왕국 복도로 이동한다.)", bg: "hall", icon: null },
    { speaker: "[나]", text: "첫 번째 테스트 상대는 뭐지?", bg: "hall", icon: mainChar },
    { speaker: "[카렌]", text: "전쟁광 수도승입니다.", bg: "hall", icon: man },
    { speaker: "[카렌]", text: "원래는 이 수도원의 관리인이었으나\n10년 전 전쟁에서 가족을 잃고\n미쳐버려 전쟁광이 되었죠.", bg: "hall", icon: man },
    { speaker: "[카렌]", text: "현재 폐허가 된 수도원을\n점거하고 있습니다.", bg: "hall", icon: man },
    { speaker: "[카렌]", text: "수도승을 처치하고\n수도원을 되찾으십시오.", bg: "hall", icon: man },
    { speaker: "[카렌]", text: "이곳이 첫 번째 테스트 장소입니다.", bg: "monastery", icon: man },
    { speaker: "", text: "(멀리서 종소리가 들린다)", bg: "monastery", icon: null },
    { speaker: "[나]", text: "…종소리?", bg: "monastery", icon: mainChar },
    { speaker: "[카렌]", text: "조심하십시오.", bg: "monastery", icon: man },
    { speaker: "[수도승]", text: "새로운 후보인가.", bg: "monastery", icon: null },
    { speaker: "[수도승]", text: "다른 후보들처럼\n금방 죽고 말겠지만…", bg: "monastery", icon: null }
  ];
  
  mainStoryIndex = 0;
  select = 0;

  if (typeof setupMinigame === "function") {
    setupMinigame();
  }

  // stage1.js의 인풋창 생성 및 기본 셋업 강제 연동
  if (typeof stage1Setup === "function") {
    stage1Setup();
  }
}

function draw() {
  background(220);

  if (scene === "start") {
    startDraw();
  } else if (scene === "Dialogue1") {
    Dialogue1();
  } else if (scene === "Dialogue2") {
    Dialogue2();
  } else if (scene === "Dialogue3") {
    Dialogue3();
  } else if (scene === "help") {
    helpScene();
  } else if (scene === "ignore") {
    ignoreScene();
  } else if (scene === "weaponSelect") {
    weaponSelectScene();
  } else if (scene === "bottleFail") {
    bottleFailScene();
  } else if (scene === "broom") {
    broomScene();
  } else if (scene === "story") {
    storyDrawScene();
  }// 스테이지 1 진입 전 연출/대기 화면 구역
else if (scene === "stage1Ready") {
  drawStage1ReadyScene();
}// 스테이지 2 진입 전 연출/대기 화면 구역
else if (scene === "stage2Ready") {
  drawStage2ReadyScene();
}

  // 대사가 다 끝난 뒤 진입하는 첫 번째 보스전 렌더링 구역
  else if (scene === "stage1") {
    if (typeof stage1Draw === "function") {
      stage1Draw();
    }
  }else if (scene === "stage2") {
    if (typeof stage2Draw === "function") {
      stage2Draw();
    }
  }
  // 기존 minigame.js 내부 화면 그리기 기능들 유지
  else if (scene === "info") {
    infoScene(); 
  } else if (scene === "game") {
    miniScene(); 
  } else if (scene === "storyWin") {
    storyWinScene(); 
  } else if (scene === "nameInput") {
    nameScene();
  } else if (scene === "afterName") {
    afterNameScene();
  } else if (scene === "choice") {
    choiceScene();
  } else if (scene === "lose") {
    loseScene();
  } else if (scene === "ending_0") {
    ending0();
  } else if (scene === "refuse") {
    refuseScene();
  } else if (scene === "ending_1") {
    ending1Scene();
  } else if (scene === "accept") {
    acceptScene();
  } 
  
  
  else if (scene === "story2") {
  // s2Dialogues가 초기화되지 않았다면 story2 진입 시 초기화
  if (typeof s2Dialogues === "undefined" || s2Dialogues === null || s2Dialogues === undefined) {
    if (typeof dialogues7 !== "undefined") {
      s2Dialogues = dialogues7;
      s2DialogueIndex = 0;
    }
  }
  drawStory2();
}
else if (scene === "choice2") {
  drawChoice2();
}
else if (scene === "ending3") {
  ending3Scene();
}else if (scene === "credits") {
  drawCredits(); // 크레딧 함수
}
else if (scene === "winScene2") {
  if (typeof stage2Draw === "function") {
    stage2Draw();
  }
}
else if (scene === "finalScene" || scene === "fadeout" || scene === "ending") {
  if (typeof drawFinalEnding === "function") {
    drawFinalEnding();
  }
}
else if (scene === "creditsEnd") {
  if (typeof drawCreditsEnd === "function") {
    drawCreditsEnd();
  }
}

  // 인풋 창 제어
  if (scene === "nameInput") {
    if (typeof nameInput !== "undefined" && nameInput !== null) {
      nameInput.show();
      nameInput.position(windowWidth / 2 - 150, windowHeight / 2);
    }
  } else if (typeof nameInput !== "undefined" && nameInput !== null && scene !== "nameInput") { 
    nameInput.hide();
  }

  // 저장 버튼 (항상 최상단에 그리기)
  drawSaveButton();
}

function storyDrawScene() {
  let d = dialogues[mainStoryIndex];

  // 대사가 다 끝나 씬이 넘어가는 찰나의 순간 안전장치 구현
  if (!d) return;

  if (d.bg === "castle") {
    image(bgCastle, 0, 0, width, height);
  } else if (d.bg === "hall") {
    image(bgHall, 0, 0, width, height);
  } else if (d.bg === "monastery") {
    image(bgMonastery, 0, 0, width, height);
  }

  fill(255, 180);
  rectMode(CENTER);
  rect(windowWidth / 2, windowHeight / 1.3, windowWidth / 1.2, windowHeight / 3);

  fill(0);
  textAlign(LEFT, CENTER);
  textSize(30);
  text(d.speaker, windowWidth / 6, windowHeight / 1.5);

  textAlign(CENTER, CENTER);
  textSize(30);
  text(d.text, windowWidth / 2, windowHeight / 1.3);

  if (d.icon != null) {
    image(d.icon, windowWidth / 7, windowHeight / 5.8, 330, 330);
  }

  fill(255);
  textSize(22);
  text(">> ENTER 키를 눌러 진행", windowWidth / 1.4, windowHeight - 55);
}

function startDraw() {
  image(castle2, 0, 0, width, height);
  
  push();
  imageMode(CENTER);
  image(logo, windowWidth / 2, windowHeight / 5, 450, 310);
  pop();
  
  rectMode(CENTER);

  fill(255, 180);
  rect(windowWidth / 2, windowHeight / 1.8, windowWidth / 1.3, windowHeight / 3);

  textAlign(CENTER, CENTER);
  fill(0);
  textSize(20);
  text(
    "이 게임은 전쟁으로 인한 왕국을 지켜내어\n" +
    "왕의 자리에 오르는 RPG 게임입니다.\n" +
    "기존 RPG 게임들과 달리 타자 게임과 결합하여\n" +
    "일정 시간 내에 타자를 치면 몬스터에게 공격이 가해집니다.\n" +
    "플레이어는 ->로 공격, <-로 방어를 할 수 있으며\n" +
    "스테이지2에서는 라인 디펜스 기능이 추가됩니다.\n" +
    "몬스터는 7초마다 한번씩 공격합니다.",
    windowWidth / 2, windowHeight / 1.8
  );

  // ── 새 게임 버튼 ──
  let newGameHover = mouseX >= windowWidth / 2 - windowWidth / 5.2 &&
                     mouseX <= windowWidth / 2 + windowWidth / 5.2 &&
                     mouseY >= windowHeight / 1.18 - windowHeight / 11.4 &&
                     mouseY <= windowHeight / 1.18 + windowHeight / 11.4;
  fill(newGameHover ? color(220, 200, 150, 230) : color(255, 180));
  rect(windowWidth / 2 - windowWidth / 6, windowHeight / 1.18, windowWidth / 3.5, windowHeight / 5.7);
  fill(0);
  textSize(38);
  text("새 게임", windowWidth / 2 - windowWidth / 6, windowHeight / 1.17);

  // ── 이어하기 버튼 ──
  let hasSave = hasSaveData();
  let continueHover = mouseX >= windowWidth / 2 + windowWidth / 10 - windowWidth / 7 &&
                      mouseX <= windowWidth / 2 + windowWidth / 10 + windowWidth / 7 &&
                      mouseY >= windowHeight / 1.18 - windowHeight / 11.4 &&
                      mouseY <= windowHeight / 1.18 + windowHeight / 11.4;
  fill(hasSave ? (continueHover ? color(150, 200, 220, 230) : color(255, 180)) : color(180, 180, 180, 150));
  rect(windowWidth / 2 + windowWidth / 6, windowHeight / 1.18, windowWidth / 3.5, windowHeight / 5.7);
  fill(hasSave ? 0 : 120);
  textSize(38);
  text("이어하기", windowWidth / 2 + windowWidth / 6, windowHeight / 1.17);
  if (!hasSave) {
    textSize(16);
    fill(100);
    text("(저장 데이터 없음)", windowWidth / 2 + windowWidth / 6, windowHeight / 1.17 + 30);
  }
}

function Dialogue1() {
  let d = dialogues1[dialogueIndex];
  image(bg1, 0, 0, width, height);
  fill(255, 150);
  rect(windowWidth / 2, windowHeight / 1.3, windowWidth / 1.2, windowHeight / 3);

  fill(0);
  textSize(28);
  textAlign(LEFT, CENTER);
  text(d.speaker, windowWidth / 6, windowHeight / 1.5); 

  textAlign(CENTER, CENTER);
  text(d.text, windowWidth / 2, windowHeight / 1.3);

  if (d.icon != null) {
    image(d.icon, windowWidth / 6, windowHeight / 5.8, 330, 330);
  }
}

function Dialogue2() {
  let d = dialogues2[dialogueIndex];
  image(bg2, 0, 0, width, height);
  fill(255, 150);
  rect(windowWidth / 2, windowHeight / 1.3, windowWidth / 1.2, windowHeight / 3);

  fill(0);
  textSize(28);
  textAlign(LEFT, CENTER);
  text(d.speaker, windowWidth / 6, windowHeight / 1.5); 

  textAlign(CENTER, CENTER);
  text(d.text, windowWidth / 2, windowHeight / 1.3);

  if (d.icon != null) {
    image(d.icon, windowWidth / 6, windowHeight / 5.8, 330, 330);
  }
}

function Dialogue3() {
  let d = dialogues3[dialogueIndex];
  image(bg2, 0, 0, width, height);
  fill(255, 150);
  rect(windowWidth / 2, windowHeight / 1.3, windowWidth / 1.2, windowHeight / 3);

  fill(0);
  textSize(28);
  textAlign(LEFT, CENTER);
  text(d.speaker, windowWidth / 6, windowHeight / 1.5); 

  textAlign(CENTER, CENTER);
  text(d.text, windowWidth / 2, windowHeight / 1.3);

  if (d.icon != null) {
    image(d.icon, windowWidth / 6, windowHeight / 5.8, 330, 330);
  }
  //선택지 
  if (dialogueIndex === 0) {
    rectMode(CENTER);
    fill(255, 200);
    rect(windowWidth / 1.5, windowHeight / 3, 250, 80);
    fill(0);
    textSize(30);
    text("귀찮다. 신경 끈다.", windowWidth / 1.5, windowHeight / 3);

    fill(255, 200);
    rect(windowWidth / 1.5, windowHeight / 2, 250, 80);
    fill(0);
    text("시민을 도우러 간다.", windowWidth / 1.5, windowHeight / 2);
  }
}
//무기 선택지 
function weaponSelectScene() {
  image(bg2, 0, 0, width, height);
  fill(255, 150);
  rect(windowWidth / 2, windowHeight / 1.3, windowWidth / 1.2, windowHeight / 3);

  fill(0);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("어떤 도구를 선택하시겠습니까?", windowWidth / 2, windowHeight / 1.3);

  fill(255, 200);
  rect(windowWidth / 1.5, windowHeight / 3, 250, 80);
  fill(0);
  text("빗자루", windowWidth / 1.5, windowHeight / 3);

  fill(255, 200);
  rect(windowWidth / 1.5, windowHeight / 2, 250, 80);
  fill(0);
  text("유리병", windowWidth / 1.5, windowHeight / 2);
}

function bottleFailScene() {
  let d = bottleDialogues[bottleIndex];
  image(bg2, 0, 0, width, height);
  fill(255, 150);
  rect(windowWidth / 2, windowHeight / 1.3, windowWidth / 1.2, windowHeight / 3);

  fill(0);
  textSize(28);
  textAlign(LEFT, CENTER);
  text(d.speaker, windowWidth / 6, windowHeight / 1.5); 

  textAlign(CENTER, CENTER);
  text(d.text, windowWidth / 2, windowHeight / 1.3);

  if (d.icon != null) {
    image(d.icon, windowWidth / 6, windowHeight / 5.8, 330, 330);
  }
}
//'돕는다' 선택했을 시 
function helpScene() {
  let d = dialogues4[helpIndex];
  image(bg2, 0, 0, width, height);
  fill(255, 150);
  rect(windowWidth / 2, windowHeight / 1.3, windowWidth / 1.2, windowHeight / 3);

  fill(0);
  textSize(28);
  textAlign(LEFT, CENTER);
  text(d.speaker, windowWidth / 6, windowHeight / 1.5); 

  textAlign(CENTER, CENTER);
  text(d.text, windowWidth / 2, windowHeight / 1.3);

  if (d.icon != null) {
    image(d.icon, windowWidth / 6, windowHeight / 5.8, 330, 330);
  }
}
//'무시한다' 선택했을 시
function ignoreScene() {
  let d = dialogues5[ignoreIndex];
  image(bg2, 0, 0, width, height);
  fill(255, 150);
  rect(windowWidth / 2, windowHeight / 1.3, windowWidth / 1.2, windowHeight / 3);

  fill(0);
  textSize(28);
  textAlign(LEFT, CENTER);
  text(d.speaker, windowWidth / 6, windowHeight / 1.5); 

  textAlign(CENTER, CENTER);
  text(d.text, windowWidth / 2, windowHeight / 1.3);

  if (d.icon != null) {
    image(d.icon, windowWidth / 6, windowHeight / 5.8, 330, 330);
  }
}
//빗자루 선택 시
function broomScene() {
  let d = broomDialogues[broomIndex];
  image(bg2, 0, 0, width, height);
  fill(255, 150);
  rect(windowWidth / 2, windowHeight / 1.3, windowWidth / 1.2, windowHeight / 3);

  fill(0);
  textSize(28);
  textAlign(LEFT, CENTER);
  text(d.speaker, windowWidth / 6, windowHeight / 1.5); 

  textAlign(CENTER, CENTER);
  text(d.text, windowWidth / 2, windowHeight / 1.3);

  if (d.icon != null) {
    image(d.icon, windowWidth / 6, windowHeight / 5.8, 330, 330);
  }
}

function mousePressed() {
  // 저장 버튼 클릭 우선 처리
  if (checkSaveButtonClick()) return;

  // 1. 시작 화면
  if (scene === "start") {
    // 새 게임 버튼
    if (mouseX >= width / 2 - width / 3.5 / 2 - width / 6 - width / 3.5 / 2 + width / 6 - width / 5.2 &&
        mouseX <= width / 2 - width / 6 + width / 3.5 / 2 &&
        mouseY >= height / 1.18 - height / 11.4 && mouseY <= height / 1.18 + height / 11.4) {
      clearSaveData();
      resetGameStats();
      scene = "Dialogue1";
    }
    // 새 게임 버튼 (좌측)
    else if (mouseX >= width / 2 - width / 6 - width / 7 &&
             mouseX <= width / 2 - width / 6 + width / 7 &&
             mouseY >= height / 1.18 - height / 11.4 && mouseY <= height / 1.18 + height / 11.4) {
      clearSaveData();
      resetGameStats();
      scene = "Dialogue1";
    }
    // 이어하기 버튼 (우측)
    else if (mouseX >= width / 2 + width / 6 - width / 7 &&
             mouseX <= width / 2 + width / 6 + width / 7 &&
             mouseY >= height / 1.18 - height / 11.4 && mouseY <= height / 1.18 + height / 11.4) {
      if (hasSaveData()) {
        loadGame();
      }
    }
  } 
  // 2. 대화 선택지 씬들 (기존 로직 유지)
  else if (scene === "Dialogue3") {
    if (mouseX >= width / 1.5 - 125 && mouseX <= width / 1.5 + 125 && mouseY >= height / 3 - 40 && mouseY <= height / 3 + 40) {
      scene = "help"; helpIndex = 0;
    } else if (mouseX >= width / 1.5 - 125 && mouseX <= width / 1.5 + 125 && mouseY >= height / 2 - 40 && mouseY <= height / 2 + 40) {
      scene = "ignore"; ignoreIndex = 0;
    }
  } else if (scene === "weaponSelect") {
    if (mouseX >= width / 1.5 - 125 && mouseX <= width / 1.5 + 125 && mouseY >= height / 3 - 40 && mouseY <= height / 3 + 40) {
      scene = "broom"; broomIndex = 0;
    } else if (mouseX >= width / 1.5 - 125 && mouseX <= width / 1.5 + 125 && mouseY >= height / 2 - 40 && mouseY <= height / 2 + 40) {
      scene = "bottleFail"; bottleIndex = 0;
    }
  } else if (scene === "choice") {
    if (mouseX >= width / 1.5 - 125 && mouseX <= width / 1.5 + 125 && mouseY >= height / 3 - 40 && mouseY <= height / 3 + 40) {
      scene = "accept"; acceptIndex = 0;
    } else if (mouseX >= width / 1.5 - 125 && mouseX <= width / 1.5 + 125 && mouseY >= height / 2 - 40 && mouseY <= height / 2 + 40) {
      scene = "refuse"; refuseIndex = 0;
    }
  } 
  // 3. 엔딩 및 stage2 관련 씬들
  else if (scene === "ending_0") {
    if (mouseX >= width / 2 - 250 && mouseX <= width / 2 + 250 && mouseY >= height / 1.13 - 25 && mouseY <= height / 1.13 + 25) {
      resetGameStats(); scene = "info"; 
    } else if (mouseX >= width / 2 - 250 && mouseX <= width / 2 + 250 && mouseY >= height / 1.05 - 25 && mouseY <= height / 1.05 + 25) {
      resetGameStats(); scene = "start"; 
    }
  } else if (scene === "info") {
    power = 15; winTimer = 0; loseTimer = 0; scene = "game";
  } else if (scene === "lose") {
    scene = "ending_0"; 
  } else if (scene === "ending_1") {
    if (mouseX >= width / 2 - 175 && mouseX <= width / 2 + 175 && mouseY >= height / 1.12 - 55 && mouseY <= height / 1.12 - 5) {
      scene = "choice";
    } else if (mouseX >= width / 2 - 175 && mouseX <= width / 2 + 175 && mouseY >= height / 1.02 - 55 && mouseY <= height / 1.02 - 5) {
      resetGameStats(); scene = "start";
    }
  } 
  // [스테이지 2 분기 선택지 & 엔딩3] → before_stage2.js 핸들러로 위임
  else if (scene === "choice2" || scene === "ending3") {
    if (typeof handleBeforeStage2MousePressed === "function") {
      handleBeforeStage2MousePressed();
    }
  }
}

function keyPressed() {
  // ✅ 1. 최우선: final 씬 처리
  if (scene === "finalScene" || scene === "fadeout" || scene === "ending" || scene === "credits") {
    if (typeof finalKeyPressed === "function") {
      finalKeyPressed();
    }
    return;
  }

  // ✅ 2. winScene2 처리
  if (scene === "winScene2") {
    if (typeof keyPressedInWinScene2 === "function") {
      keyPressedInWinScene2();
    }
    return;
  }

  // ✅ 3. stage1 처리
  if (scene === "stage1Ready") {
    if (keyCode === ENTER) {
      if (typeof lastSpawnTime !== "undefined") lastSpawnTime = millis();
      if (typeof lastBossAttackTime !== "undefined") lastBossAttackTime = millis();
      scene = "stage1";
    }
    return;
  }

  if (scene === "stage1") {
    if (typeof stage1KeyPressed === "function") {
      stage1KeyPressed();
    }
    return;
  }

  // ✅ 4. stage2Ready 처리 (중복 제거)
  if (scene === "stage2Ready") {
    if (keyCode === ENTER) {
      if (typeof lastSpawnTime !== "undefined") lastSpawnTime = millis();
      if (typeof lastBossAttackTime !== "undefined") lastBossAttackTime = millis();
      if (typeof stage2Setup === "function") stage2Setup();
      scene = "stage2";
      if (typeof inputBox !== "undefined") inputBox.show();
    }
    return;
  }

  // ✅ 5. stage2 처리 — scene이 stage2일 때만
if (scene === "stage2") {
  if (gameState2 === "lose") {
    // 패배 선택지 처리
    if (keyCode === UP_ARROW || keyCode === DOWN_ARROW) {
      select = 1 - select;
    }
    if (keyCode === ENTER) {
      if (select === 0) {
        resetGame2();
      } else {
        scene = "start";
      }
    }
  } else if (gameState2 === "play2") {
    // 플레이 중일 때만 stage2KeyPressed에 위임 (win/lose 상태에선 호출 안 함)
    if (typeof stage2KeyPressed === "function") {
      stage2KeyPressed();
    }
  }
  return;
}

  // ✅ 6. before_stage2 키 처리
  if (typeof handleBeforeStage2KeyPress === "function") {
    handleBeforeStage2KeyPress();
  }

  // ✅ 7. 미니게임 스페이스바
  if (scene === "game" && keyCode === 32) {
    if (typeof power !== "undefined") power += 4.5;
    return;
  }

  // ✅ 8. 엔딩0 방향키
  if (scene === "ending_0") {
    if (keyCode === DOWN_ARROW) {
      if (typeof menuSelect !== "undefined") menuSelect = (menuSelect + 1) % 2;
    } else if (keyCode === UP_ARROW) {
      if (typeof menuSelect !== "undefined") menuSelect = (menuSelect - 1 + 2) % 2;
    }
  }

  // ✅ 9. ENTER 키 처리 (나머지 씬들)
  if (keyCode === ENTER) {
    if (scene === "Dialogue1") {
      dialogueIndex++;
      if (dialogueIndex >= dialogues1.length) {
        scene = "Dialogue2";
        dialogueIndex = 0;
      }
    } else if (scene === "Dialogue2") {
      if (dialogueIndex === 8) {
        introBgm.stop();
        music2.setVolume(0.5);
        music2.loop();
      }
      dialogueIndex++;
      if (dialogueIndex >= dialogues2.length) {
        scene = "Dialogue3";
        dialogueIndex = 0;
      }
    } else if (scene === "help") {
      helpIndex++;
      if (helpIndex >= dialogues4.length) {
        scene = "weaponSelect";
      }
    } else if (scene === "ignore") {
      ignoreIndex++;
      if (ignoreIndex >= dialogues5.length) {
        scene = "weaponSelect";
      }
    } else if (scene === "bottleFail") {
      bottleIndex++;
      if (
        bottleIndex < bottleDialogues.length &&
        bottleDialogues[bottleIndex].text === "쨍그랑!!"
      ) {
        glassBreak.play();
      }
      if (bottleIndex >= bottleDialogues.length) {
        scene = "weaponSelect";
      }
    } else if (scene === "broom") {
      broomIndex++;
      if (broomIndex >= broomDialogues.length) {
        scene = "info";
      }
    } else if (scene === "storyWin") {
      winIndex++;
      if (winIndex >= winDialogues.length) {
        scene = "nameInput";
      }
    } else if (scene === "nameInput") {
      if (typeof nameInput !== "undefined" && nameInput !== null) {
        userName = nameInput.value();
        nameInput.hide();
      }
      afterNameDialogues = [
        { speaker: "[카렌]", text: userName + "입니다.", icon: man },
        { speaker: "[카렌]", text: userName + "님께서 이번 테스트에서 승리하신다면\n왕의 자리를 드리겠습니다.", icon: man },
        { speaker: "[나]", text: "...만약 패배한다면?", icon: mainIcon },
        { speaker: "[카렌]", text: "즉시 처형입니다.", icon: man },
        { speaker: "[카렌]", text: "제안을 받아들이겠습니까?", icon: man }
      ];
      afterNameIndex = 0;
      scene = "afterName";
    } else if (scene === "afterName") {
      afterNameIndex++;
      if (afterNameIndex >= afterNameDialogues.length) {
        scene = "choice";
      }
    } else if (scene === "accept") {
      acceptIndex++;
      if (acceptIndex >= acceptDialogues.length) {
        mainStoryIndex = 0;
        scene = "story";
      }
    } else if (scene === "refuse") {
      refuseIndex++;
      if (refuseIndex >= refuseDialogues.length) {
        scene = "ending_1";
      }
    } else if (scene === "ending_1") {
      resetGameStats();
      scene = "start";
    } else if (scene === "ending_0") {
      if (typeof menuSelect !== "undefined" && menuSelect === 0) {
        resetGameStats();
        scene = "info";
      } else {
        resetGameStats();
        scene = "start";
      }
    } else if (scene === "story") {
      if (mainStoryIndex === 25) {
        music2.stop();
      }
      mainStoryIndex++;
      if (mainStoryIndex >= dialogues.length) {
        if (typeof lastSpawnTime !== "undefined") lastSpawnTime = millis();
        if (typeof lastBossAttackTime !== "undefined") lastBossAttackTime = millis();
        scene = "stage1Ready";
      }
    }
  }
}
//재시작 
function resetGameStats() {
  if (typeof menuSelect !== "undefined") menuSelect = 0;
  if (typeof heartbeat !== "undefined") heartbeat = false;
  if (typeof dialogueIndex !== "undefined") dialogueIndex = 0;
  winIndex = 0;
  afterNameIndex = 0;
  refuseIndex = 0;
  acceptIndex = 0;
  mainStoryIndex = 0; 
  userName = "";
}

// ==========================================
// 스테이지 1 타이틀 및 시작 대기 화면
// ==========================================
function drawStage1ReadyScene() {
  // 수도원 배경을 흐릿하게 깔아서 긴장감 조성
  image(bgMonastery, 0, 0, width, height);
  fill(0, 180); // 어두운 반투명 오버레이
  rectMode(CORNER);
  rect(0, 0, width, height);

  // 스테이지 타이틀 연출
  textAlign(CENTER, CENTER);
  
  // "STAGE 01" 빨간색 강조
  fill(255, 50, 50);
  textSize(40);
  text("STAGE 01", windowWidth / 2, windowHeight / 2 - 80);

  // 보스 이름
  fill(255);
  textSize(60);
  text("폐허의 전쟁광 수도승", windowWidth / 2, windowHeight / 2);

  // 조작법 리마인드 팁 안내
  fill(200);
  textSize(22);
  text("Tip: [→] 방향키로 보스 공격 | [←] 방향키로 공격 방어", windowWidth / 2, windowHeight / 2 + 80);
  text("화면에 나타나는 처형견(단어)들을 타이핑하여 저지하세요!", windowWidth / 2, windowHeight / 2 + 120);

  // 시작 안내 (깜빡이는 연출 효과 포함)
  if (frameCount % 60 < 40) {
    fill(255, 255, 0);
    textSize(28);
    text(">> 전투를 시작하려면 ENTER 키를 누르세요 <<", windowWidth / 2, windowHeight / 1.3);
  }
}

// ==========================================
//스테이지 2 타이틀 및 시작 대기 화면
// ==========================================
function drawStage2ReadyScene() {
  // 수도원 배경을 흐릿하게 깔아서 긴장감 조성
  image(bg2, 0, 0, width, height);
  fill(0, 180); // 어두운 반투명 오버레이
  rectMode(CORNER);
  rect(0, 0, width, height);

  // 스테이지 타이틀 연출
  textAlign(CENTER, CENTER);
  
  // "STAGE 02" 빨간색 강조
  fill(255, 50, 50);
  textSize(40);
  text("STAGE 02", windowWidth / 2, windowHeight / 2 - 80);

  // 보스 이름
  fill(255);
  textSize(60);
  text("병동의 흑사병 의사", windowWidth / 2, windowHeight / 2);

  // 조작법 리마인드 팁 안내
  fill(200);
  textSize(22);
  text("Tip: [→] 방향키로 보스 공격 | [←] 방향키로 공격 방어", windowWidth / 2, windowHeight / 2 + 80);
  text("라인 디펜스 기능이 추가 되었습니다.", windowWidth / 2, windowHeight / 2 + 120);
   text("오타를 내면 라인이 앞당겨지고 \n몬스터를 처치하면 라인이 오른쪽으로 이동합니다.", windowWidth / 2, windowHeight / 2 + 160);

  // 시작 안내 (깜빡이는 연출 효과 포함)
  if (frameCount % 60 < 40) {
    fill(255, 255, 0);
    textSize(28);
    text(">> 전투를 시작하려면 ENTER 키를 누르세요 <<", windowWidth / 2, windowHeight / 2 + 240);
  }
}

// ==========================================
// stage2 승리 씬 키 처리 (winScene2 → finalScene)
// ==========================================
function keyPressedInWinScene2() {
  if (keyCode !== ENTER) return;
  // final 세팅 초기화 후 finalScene으로 전환
  if (typeof setupFinalEnding === "function") {
    setupFinalEnding();
  }
  scene = "finalScene";
}

// stage2.js 파일 내부에 작성한 초기화 함수를 메인에서 호출 가능하게 함 
function prepareStage2() {
  if (typeof resetForStage2 === "function") {
    resetForStage2(); // stage2.js에 작성했던 변수 초기화 함수
  }
  if (typeof stage2Setup === "function") {
    stage2Setup(); // 캔버스 세팅 및 입력창 생성
  }
}


//전체 화면 
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (typeof nameInput !== "undefined" && nameInput !== null) {
    nameInput.position(windowWidth / 2 - 150, windowHeight / 2);
  }
  if (typeof stage1WindowResized === "function") stage1WindowResized();
}

// ============================================================
// 저장/불러오기 시스템
// ============================================================
const SAVE_KEY = "rpgGameSave";

// 저장 가능한 씬 목록 (엔딩/미니게임 진행중 제외)
const SAVEABLE_SCENES = [
  "Dialogue1","Dialogue2","Dialogue3","help","ignore","weaponSelect",
  "bottleFail","broom","story","stage1Ready","storyWin","nameInput",
  "afterName","choice","accept","refuse","stage2Ready",
  "story2","choice2","ending3","ending_0","ending_1","finalScene"
];

function hasSaveData() {
  try {
    return localStorage.getItem(SAVE_KEY) !== null;
  } catch(e) { return false; }
}

function clearSaveData() {
  try { localStorage.removeItem(SAVE_KEY); } catch(e) {}
}

function saveGame() {
  try {
    // dialogues_2 식별 (final.js)
    let dialogues2Id = "dialogues7";
    if (typeof dialogues_2 !== "undefined") {
      if (dialogues_2 === drinkDialogues) dialogues2Id = "drinkDialogues";
      else if (dialogues_2 === rejectDialogues) dialogues2Id = "rejectDialogues";
      else if (typeof dialogues8 !== "undefined" && dialogues_2 === dialogues8) dialogues2Id = "dialogues8";
      else if (typeof dialogues9 !== "undefined" && dialogues_2 === dialogues9) dialogues2Id = "dialogues9";
    }

    let saveData = {
      scene: scene,
      dialogueIndex: dialogueIndex,
      helpIndex: helpIndex,
      ignoreIndex: ignoreIndex,
      bottleIndex: bottleIndex,
      broomIndex: broomIndex,
      mainStoryIndex: mainStoryIndex,
      winIndex: winIndex,
      acceptIndex: acceptIndex,
      refuseIndex: refuseIndex,
      afterNameIndex: afterNameIndex,
      userName: userName,
      dialogueIndex_2: typeof dialogueIndex_2 !== "undefined" ? dialogueIndex_2 : 0,
      dialogues2Id: dialogues2Id,
      heartbeat: typeof heartbeat !== "undefined" ? heartbeat : false,
      // finalScene 저장
      dialogueIndex_final: typeof dialogueIndex_final !== "undefined" ? dialogueIndex_final : 0,
      dialogues_finalId: (typeof dialogues_final !== "undefined" && typeof dialogues_end2 !== "undefined" && dialogues_final === dialogues_end2) ? "end2" : "end1",
      savedAt: new Date().toLocaleString("ko-KR")
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
    showSaveNotice("저장 완료!");
  } catch(e) {
    showSaveNotice("저장 실패");
  }
}

function loadGame() {
  try {
    let raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return;
    let d = JSON.parse(raw);

    scene           = d.scene;
    dialogueIndex   = d.dialogueIndex   || 0;
    helpIndex       = d.helpIndex       || 0;
    ignoreIndex     = d.ignoreIndex     || 0;
    bottleIndex     = d.bottleIndex     || 0;
    broomIndex      = d.broomIndex      || 0;
    mainStoryIndex  = d.mainStoryIndex  || 0;
    winIndex        = d.winIndex        || 0;
    acceptIndex     = d.acceptIndex     || 0;
    refuseIndex     = d.refuseIndex     || 0;
    afterNameIndex  = d.afterNameIndex  || 0;
    userName        = d.userName        || "";
    if (typeof heartbeat !== "undefined") heartbeat = d.heartbeat || false;

    // dialogues_2 복원 (final.js)
    if (typeof dialogueIndex_2 !== "undefined") {
      dialogueIndex_2 = d.dialogueIndex_2 || 0;
      if (typeof dialogues_2 !== "undefined") {
        switch(d.dialogues2Id) {
          case "drinkDialogues":   dialogues_2 = drinkDialogues;   break;
          case "rejectDialogues":  dialogues_2 = rejectDialogues;  break;
          case "dialogues8":       dialogues_2 = dialogues8;       break;
          case "dialogues9":       dialogues_2 = dialogues9;       break;
          default:                 dialogues_2 = dialogues7;       break;
        }
      }
    }

    // afterName 복원 시 afterNameDialogues 재생성
    if (userName && (scene === "afterName" || scene === "choice")) {
      afterNameDialogues = [
        { speaker: "[카렌]", text: userName + "입니다.", icon: man },
        { speaker: "[카렌]", text: userName + "님께서 이번 테스트에서 승리하신다면\n왕의 자리를 드리겠습니다.", icon: man },
        { speaker: "[나]", text: "...만약 패배한다면?", icon: mainIcon },
        { speaker: "[카렌]", text: "즉시 처형입니다.", icon: man },
        { speaker: "[카렌]", text: "제안을 받아들이겠습니까?", icon: man }
      ];
    }

    // finalScene 복원
    if (scene === "finalScene" && typeof dialogueIndex_final !== "undefined") {
      dialogueIndex_final = d.dialogueIndex_final || 0;
      // dialogues_end1/end2는 setupFinalEnding()이 호출된 후에야 존재하므로
      // 씬 진입 시 setupFinalEnding을 먼저 호출한 뒤 인덱스/배열을 덮어씀
      if (typeof setupFinalEnding === "function") {
        setupFinalEnding();
        dialogueIndex_final = d.dialogueIndex_final || 0;
        if (d.dialogues_finalId === "end2" && typeof dialogues_end2 !== "undefined") {
          dialogues_final = dialogues_end2;
        }
      }
    }
  } catch(e) { console.error("불러오기 실패:", e); }
}

// ── 저장 완료 알림 ──
let _saveNoticeText = "";
let _saveNoticeTimer = 0;
function showSaveNotice(msg) {
  _saveNoticeText = msg;
  _saveNoticeTimer = millis();
}

// ── 저장 버튼 그리기 (draw 루프에서 호출) ──
function drawSaveButton() {
  if (!SAVEABLE_SCENES.includes(scene)) return;

  let bw = 130, bh = 44;
  let bx = windowWidth - bw / 2 - 18;
  let by = 30;

  let hover = mouseX >= bx - bw/2 && mouseX <= bx + bw/2 &&
              mouseY >= by - bh/2 && mouseY <= by + bh/2;

  push();
  rectMode(CENTER);
  fill(hover ? color(60, 120, 200, 230) : color(30, 80, 160, 200));
  stroke(200);
  strokeWeight(1);
  rect(bx, by, bw, bh, 8);
  noStroke();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(18);
  text("💾 저장하기", bx, by);

  // 저장 완료 알림 (2초)
  if (_saveNoticeText && millis() - _saveNoticeTimer < 2000) {
    fill(0, 180, 80, 220);
    rect(bx, by + 36, bw + 20, 30, 6);
    fill(255);
    textSize(15);
    text(_saveNoticeText, bx, by + 36);
  } else if (millis() - _saveNoticeTimer >= 2000) {
    _saveNoticeText = "";
  }
  pop();
}

// ── 저장 버튼 클릭 감지 ──
function checkSaveButtonClick() {
  if (!SAVEABLE_SCENES.includes(scene)) return false;
  let bw = 130, bh = 44;
  let bx = windowWidth - bw / 2 - 18;
  let by = 30;
  if (mouseX >= bx - bw/2 && mouseX <= bx + bw/2 &&
      mouseY >= by - bh/2 && mouseY <= by + bh/2) {
    saveGame();
    return true;
  }
  return false;
}
