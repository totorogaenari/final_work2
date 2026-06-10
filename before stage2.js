// 변수 선언
let dialogues7, dialogues8, dialogues9, drinkDialogues, rejectDialogues;
let room, lab, hallway, brokenGlassBg;
let  maidIcon2, maidIcon3, doctor;
let heartbeat = false;
let heartbeatSize = 1;

// story2 씬 전용 대화 변수 (sketch.js의 전역 dialogues/s2DialogueIndex와 분리)
let s2Dialogues;
let s2DialogueIndex = 0;

// 이 함수를 sketch.js의 preload에서 호출하세요
function preloadBeforeStage2() {
  room = loadImage("room.png");
  mainChar = loadImage("mainChar.png");
  maidIcon = loadImage("maid.png");
  maidIcon2 = loadImage("maid2.png");
  maidIcon3 = loadImage("maid3.png");
  man = loadImage("man.png");
  lab = loadImage("lab.png");
  hallway = loadImage("hallway.png");
  doctor = loadImage("doctor.png");
  brokenGlassBg = loadImage("brokenGlass.png");
}



function setupBeforeStage2() {

  createCanvas(windowWidth, windowHeight);

  // =========================
  // 기본 대화
  // =========================

  dialogues7 = [
    
    {
      speaker:"",
      text:"(테스트에서 우승한 당신은\n수행원의 안내에 따라 방으로 들어간다.)",
      icon:null
    }, 
    {
      speaker:"",
      text:"(예상보다 더 안락한 방이다.)",
      icon:null
    },

    {
      speaker:"",
      text:"(그러나 테스트 이후 당신은 \n몸에 남아있는 기력이 없다.)",
      icon:null
    },
    {
      speaker:"",
      text:"(침대에 누우려던 찰나 \n누군가가 문을 두드린다.)",
      icon:null
    },
    {
      speaker:"",
      text:"(국왕의 하녀가 모습을 드러낸다.)",
      icon:maidIcon
    },

    {
      speaker:"[하녀]",
      text:"많이 지쳐 보이시네요…",
      icon:maidIcon
    },

    {
      speaker:"[하녀]",
      text:"왕실 약초로 만든 음료입니다.\n회복에 도움이 될 거예요.",
      icon:maidIcon
    },

    {
      speaker:"[나]",
      text:"…고맙군.",
      icon:mainChar
    },

    {
      speaker:"",
      text:"(하녀가 유리잔에 담긴 음료를 건넨다.)",
      icon:maidIcon
    },

    {
      speaker:"[나]",
      text:"(몸이 무겁다…\n지금 상태로는 다음 싸움을 버틸 수 없어.)",
      icon:mainChar
    }, 
    {
      speaker:" ",
      text:"어떻게 하시겠습니까?",
      icon:null
    }

  ];

  // =========================
  // 마신다 루트
  // =========================

  drinkDialogues = [

    {
      speaker:"[나]",
      text:"…따뜻하군.",
      icon:mainChar
    },

    {
      speaker:"[나]",
      text:"조금… 살 것 같아…",
      icon:mainChar
    },

    {
      speaker:"",
      text:"(화면이 살짝 밝아진다.)",
      icon:null
    },

    {
      speaker:"",
      text:"(몸에 힘이 돌아오는 느낌이다.)",
      icon:null
    },

    {
      speaker:"",
      text:"(하지만 곧 시야가 흔들리기 시작한다.)",
      icon:null
    },

    {
      speaker:"",
      text:"(심장이 거칠게 뛰기 시작한다.)",
      icon:null
    },

    {
      speaker:"[나]",
      text:"…뭐지…",
      icon:mainChar
    },

    {
      speaker:"[나]",
      text:"숨이…",
      icon:mainChar
    },

    {
      speaker:"[하녀]",
      text:"…생각보다 늦게 듣는군요.",
      icon:maidIcon2
    },

    {
      speaker:"[나]",
      text:"…너…",
      icon:mainChar
    },

    {
      speaker:"[하녀]",
      text:"이웃나라께서 전해달라 하셨습니다.",
      icon:maidIcon2
    },

    {
      speaker:"",
      text:"(하녀는 문을 잠근 뒤 조용히 사라진다.)",
      icon:null
    },

    {
      speaker:"",
      text:"(몸이 점점 차가워진다…)",
      icon:null
    }

  ];

  // =========================
  // 마시지 않는다 루트
  // =========================

  rejectDialogues = [

    {
      speaker:"[나]",
      text:"…됐어.",
      icon:mainChar
    },

    {
      speaker:"[하녀]",
      text:"…네?",
      icon:maidIcon3
    },

    {
      speaker:"[나]",
      text:"남이 준 건 쉽게 못 믿는 성격이라.",
      icon:mainChar
    },

    {
      speaker:"[하녀]",
      text:"…그러시군요.",
      icon:maidIcon3
    },

    {
      speaker:"",
      text:"(하녀는 급하게 방을 나가려 한다.)",
      icon:maidIcon3
    },

    {
      speaker:"",
      text:"쨍그랑!!",
      bg:"broken",
      icon:null
    },

    {
      speaker:"",
      text:"(하녀가 들고 있던 잔이 바닥에 깨져버렸다.)",
      bg:"broken",
      icon:null
    },

    {
      speaker:"",
      text:"(무언가 수상함을 느낀 당신은\n쏟아진 음료를 유심히 바라본다…)",
      bg:"broken",
      icon:null
    },

    {
      speaker:"",
      text:"(바닥이 조금씩 녹아내리고 있다.)",
      bg:"broken",
      icon:null
    },

    {
      speaker:"[나]",
      text:"…독이 들어있던 건가?",
      bg:"broken",
      icon:null
    },

    {
      speaker:"",
      text:"(당신은 급히 하녀를 불러세우려 했지만…)",
      bg:"broken",
      icon:null
    },

    {
      speaker:"",
      text:"(그 이후 더 이상 하녀의 모습은 볼 수 없었다.)",
      bg:"broken",
      icon:null
    },

    {
      speaker:"",
      text:"(불안해진 당신은 \n수행원을 만나기로 한다.)",
      bg:"broken",
      icon:null
    }

  ];
  
   dialogues8 = [
    {
      speaker:"[나]",
      text:"…왕궁 안에도 적이 숨어있다는 건가.",
      icon:mainChar
    }, 
     {
      speaker:"[카렌]",
      text:"놀라실 일은 아닙니다.",
      icon:man
    }, 
     {
      speaker:"[카렌]",
      text:"국왕 폐하께서 돌아가신 이후,\n이 왕국 내부는 이미 오래전부터 \n무너지고 있었으니까요.",
      icon:man
    }, 
     {
      speaker:"[나]",
      text:"…그 하녀는 결국 못 찾았나?",
      icon:mainChar
    }, 
     {
      speaker:"[카렌]",
      text:"흔적도 없이 사라졌습니다.",
      icon:man
    }, 
     {
      speaker:"[카렌]",
      text:"병사들의 예측으로는 이웃나라의\n스파이였던 것으로 보입니다.",
      icon:man
    }, 
     {
      speaker:"[나]",
      text:"…다음 테스트는 뭐지?",
      icon:mainChar
    }, 
     {
      speaker:"[카렌]",
      text:"서부 격리구역으로 향할 예정입니다.",
      icon:man
    }, 
     {
      speaker:"[카렌]",
      text:"전쟁 이후, 왕국에는 정체불명의 \n전염병이 퍼지기 시작했습니다.",
      icon:man
    }, 
     {
      speaker:"[카렌]",
      text:"감염자는 피부가 검게 썩어가며,\n끝내 이성을 잃고 폭주하게 됩니다.",
      icon:man
    }, 
     {
      speaker:"[카렌]",
      text:"문제는 그곳에 한 남자가 \n나타났다는 겁니다.",
      icon:man
    }, 
     {
      speaker:"[나]",
      text:"누군데?",
      icon:mainChar
    }, 
     {
      speaker:"[카렌]",
      text:"그는 환자들을 돌보던 궁정 의사였습니다.",
      icon:man
    }, 
     {
      speaker:"[카렌]",
      text:"그러나 치료제를 위해 그는 \n 교단이 금지한 연금술에 손을 댔습니다.",
      icon:man
    }, 
     {
      speaker:"[카렌]",
      text:"교단은 그를 '악마와 계약한 이단'으로 \n몰아 처형하려 했고",
      icon:man
    }, 
     {
      speaker:"[카렌]",
      text:"간신히 탈출한 그는 지하 실험실에 \n숨어 교단에 대한 복수를 키우게 되었습니다.",
      icon:man
    }
 ]  
  
   dialogues9 = [
         {
      speaker:"",
      text:"(다음 날 새벽, 당신은 카렌과 함께\n서부 격리구역으로 향한다.)",
      icon:null
    },

    {
      speaker:"",
      text:"(왕궁을 벗어날수록 공기는 점점 차가워지고\n썩은 냄새가 짙어지기 시작한다.)",
      icon:null
},
     {
  speaker:"[카렌]",
  text:"놈은 항상 지하 실험실 안에 숨어 있습니다.",
  icon:man
},

{
  speaker:"[카렌]",
  text:"그리고 들어간 병사들은\n단 한 명도 돌아오지 못했습니다.",
  icon:man
  },
  {
    speaker:"",
    text:"(복도 끝, 거대한 철문이 모습을 드러낸다.)",
    icon:null
  },

  {
    speaker:"",
    text:"(문틈 사이로 붉은 빛과 함께\n기괴한 약품 냄새가 새어나온다.)",
    icon:null
  },  

  {
    speaker:"",
    text:"(철문이 천천히 열리기 시작한다.)",
    icon:null
  },
  {
      speaker:"[흑사병 의사]",
      text:"새로운 실험체가 도착했군…",
      icon:doctor
    },{
      speaker:"[흑사병 의사]",
      text:"이번에는 얼마나 버틸 수 있을까?",
      icon:doctor
    }
      
     
 ] 
  // 시작 대화 설정
  s2Dialogues = dialogues7;
}



function draw() {
  background(0);

  if (scene === "story2") {
    drawStory2();
  } else if (scene === "choice2") {
    drawChoice2();
  } else if (scene === "ending3") {
    ending3Scene();
  }
}

// 1. 스토리 대화 그리기 함수
function drawStory2() {
  if (!s2Dialogues) return;
  let current = s2Dialogues[s2DialogueIndex];
  if (!current) return;
  
  // 배경 로직
  let currentBg = room;
  if (s2Dialogues === dialogues8) currentBg = hallway;
  if (s2Dialogues === dialogues9) currentBg = lab;
  if (current.bg === "broken") currentBg = brokenGlassBg;

  // 심장 효과
  if (heartbeat) {
    heartbeatSize = 1 + sin(frameCount * 0.18) * 0.03;
    push();
    translate(width / 2, height / 2);
    scale(heartbeatSize);
    translate(-width / 2, -height / 2);
    image(currentBg, 0, 0, width, height);
    pop();
  } else {
    image(currentBg, 0, 0, width, height);
  }

  // 대화창 및 텍스트
  fill(255, 180);
  rectMode(CENTER);
  rect(width / 2, height / 1.3, width / 1.2, height / 3);
  fill(0);
  textAlign(LEFT, CENTER);
  textSize(30);
  text(current.speaker, width / 6, height / 1.5);
  textAlign(CENTER, CENTER);
  text(current.text, width / 2, height / 1.3);

  if (current.icon) image(current.icon, width / 7, height / 7, 280, 280);
}

// 2. 선택지 화면 그리기 함수
function drawChoice2() {
  image(room, 0, 0, width, height);
  fill(255);
  rect(width / 1.5, 250, 250, 80);
  rect(width / 1.5, 370, 250, 80);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(28);
  text("마신다", width / 1.5, 230);
  text("마시지 않는다", width / 1.5, 350);
}

function handleBeforeStage2MousePressed() {
  // 저장 버튼 우선 처리 (sketch.js의 mousePressed에서 이미 처리되므로 여기선 생략 가능하지만 안전장치)

  if (scene === "ending3") {
    // 버튼 1: 이전 선택지로 이동 (다시 choice2 씬으로 전환)
    if (mouseX >= width / 2 - 175 && mouseX <= width / 2 + 175 &&
        mouseY >= height / 1.12 - 55 && mouseY <= height / 1.12 - 5) {
      s2Dialogues = dialogues7; // 대화를 다시 초기화
      s2DialogueIndex = 0;
      scene = "choice2"; // 선택지 화면으로 복귀
    } 
    // 버튼 2: 처음으로 이동 ("start" 씬으로 전환)
    else if (mouseX >= width / 2 - 175 && mouseX <= width / 2 + 175 &&
             mouseY >= height / 1.02 - 55 && mouseY <= height / 1.02 - 5) {
      scene = "start"; // 처음 화면으로 이동
    }
  } else if (scene === "choice2") {
    // 기존 마신다/마시지 않는다 선택지 로직 유지
    if (mouseX >= width / 1.5 - 125 && mouseX <= width / 1.5 + 125) {
      if (mouseY >= 190 && mouseY <= 270) { // 마신다
        s2Dialogues = drinkDialogues;
        s2DialogueIndex = 0;
        heartbeat = false; // 상태 초기화
        scene = "story2";
      } else if (mouseY >= 310 && mouseY <= 390) { // 마시지 않는다
        s2Dialogues = rejectDialogues;
        s2DialogueIndex = 0;
        scene = "story2";
      }
    }
  }
}

function handleBeforeStage2KeyPress() {
  // 1. 스토리 진행 중일 때 (엔터키를 누르면)
  if (scene === "story2" && keyCode === ENTER) {
    
    // dialogues7의 마지막 인덱스에서는 엔터로 다음 화면으로 넘어가지 않음
    if (s2Dialogues === dialogues7 && s2DialogueIndex === s2Dialogues.length - 1) {
      return;
    }
    
    s2DialogueIndex++;
    
    // 인덱스가 배열 범위를 벗어날 경우(대화 종료 시)
    if (s2DialogueIndex >= s2Dialogues.length) {
      
      // [마신다 루트 종료] -> 엔딩3으로 이동
      if (s2Dialogues === drinkDialogues) {
        heartbeat = false; 
        scene = "ending3";
      } 
      // [안 마신다 루트 종료] -> dialogue8로 이동
      else if (s2Dialogues === rejectDialogues) {
        s2Dialogues = dialogues8;
        s2DialogueIndex = 0;
      } 
      // [dialogue8 종료] -> dialogue9로 이동
      else if (s2Dialogues === dialogues8) {
        s2Dialogues = dialogues9;
        s2DialogueIndex = 0;
      } 
      // [dialogue9 종료] -> stage2로 이동
      else if (s2Dialogues === dialogues9) {
        roomBGM.stop();
        scene = "stage2Ready";
      }
      return;
    }
    
    // 심장 박동 효과 타이밍 체크
    if (s2Dialogues === drinkDialogues && s2DialogueIndex >= 4) {
      heartbeat = true;
    }
  }
  
  // 2. 스토리 진행 중 마지막 대화에서 엔터키를 누르면 선택지 씬으로 전환
  if (scene === "story2" && s2Dialogues === dialogues7 && s2DialogueIndex === s2Dialogues.length - 1 && keyCode === ENTER) {
    scene = "choice2";
  }
}

// ending3Scene 및 windowResized 함수는 기존 그대로 유지
function ending3Scene() {



  image(brokenGlassBg, 0, 0, width, height);



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

    "#엔딩3 - 강하지만 우둔한 영웅",

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

    "당신은 수도승을 해치우고 영웅 반열에 \n" +

    "오를뻔 했으나 이웃나라의 첩자였던\n\n" +

    "시녀에게 속아넘어가 결국 사망했습니다.\n" +

    "당신은 강하지만 우둔했던 영웅으로\n"+

    "기억될 것 입니다. ";

  

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




function windowResized() {

  resizeCanvas(windowWidth, windowHeight);

}
