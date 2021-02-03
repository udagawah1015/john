//グローバル変数はローカル変数に落とし込んで使用

'use strict';

let debug = false;

const IMG_SIZE = 10;
const SCALE = 5;
const ELEMENT_SIZE = IMG_SIZE * SCALE;
const MAX_BLOCK_X = 20;//0含む
const MAX_BLOCK_Y = 40;
const STAGE_LENGTH_X = ELEMENT_SIZE * MAX_BLOCK_X;
const STAGE_LENGTH_Y = ELEMENT_SIZE * MAX_BLOCK_Y;

//常にparameterで表示
let LctCursor = null;//mouse moveで取得
let LctJohn = null;//setIntervalで取得
let LctElmt = null;//click eventで取得
let Coli = null;//getCollisionで取得

let rmvElt = false;//element削除のsetTimerで使用
let AmountX = 0;//char移動量のカウント
let AmountY = 0;
let CmdX = null;
let CmdY = null;


//多次元配列の要素数指定
let EData = new Array(MAX_BLOCK_Y + 1);//0: x軸 row
for (let i = 0; i < MAX_BLOCK_Y + 1; i++) {
  EData[i] = new Array(MAX_BLOCK_X + 1);//1: y y軸 column
  for (let j = 0; j < EData[i].length; j++) {
    EData[i][j] = new Array(5);//2: プロパティ数
  }
}

const JOHN = setElement('img','john',E_BODY,0,0,0,0,false)
const PARA_LOCATION = document.getElementsByClassName('parameter')[0];
const PARA_DATA = document.getElementsByClassName('parameter')[1];
const PARA_DATA2 = document.getElementsByClassName('parameter')[2];

constElement();
setAddEventListener();
LctJohn = getLocation(JOHN);
//キャラの位置情報はtransformだとリアルタイルで取れないので
//細かく直接指定して移動させる > transform = 'scale(7)'.transition = '1600ms'はダメ
setInterval(() => {
  LctJohn = getLocation(JOHN);
  fncFall();
  fncWalk();
  fncJump();
  setParameter();
}, 20);



function constElement() {
  let sTime = new Date;
  let count = 0;//debug

  E_STAGE.style.width = `${STAGE_LENGTH_X + ELEMENT_SIZE}px`;
  E_STAGE.style.height = `${STAGE_LENGTH_Y + ELEMENT_SIZE}px`;

  //最下層から作成
  let y2 = MAX_BLOCK_Y;
  for (let y = STAGE_LENGTH_Y; y >= 0; y -= ELEMENT_SIZE) {
    // EData.push([y2])
    let x2 = 0;
    for (let x = 0; x <= STAGE_LENGTH_X; x += ELEMENT_SIZE) {
      // console.log(`${y} : ${x}`);
      
      let name = 'blank';
      // if (num != 0){//登頂タイプ *jumpがうまく処理できないので断念
      //   name = 'sand';
      //   if (y2 === MAX_BLOCK_Y){
      //     setElement('img',name,E_BODY,y,x,y2,x2);
      //   }else if(num < 7 && EData[y2 + 1][x2][0] === 'sand'){
      //     setElement('img',name,E_BODY,y,x,y2,x2);
      //   }else if((x2 > 0 && EData[y2][x2 - 1][0] === 'sand') || (x2 < MAX_BLOCK_X && EData[y2][x2 + 1][0] === 'sand')){
      //     setElement('img',name,E_BODY,y,x,y2,x2);
      //   }else{
      //     name = 'blank';
      //   }
      // }else{
      //   name = 'blank';
      // }
      if(y2 > 5) {
        let num = getRndmNum(0,9);
        if(y2 === 6 || num > 1){
          name = 'sand';
          setElement('img',name,E_BODY,y,x,y2,x2);
        // }else if (y2 === 2){
        //   setElement('img',name,E_BODY,y,x,y2,x2);
        // }else if(num < 7 && EData[y2 + 1][x2][0] === 'sand'){
        //   setElement('img',name,E_BODY,y,x,y2,x2);
        // }else if((x2 > 0 && EData[y2][x2 - 1][0] === 'sand') || (x2 < MAX_BLOCK_X && EData[y2][x2 + 1][0] === 'sand')){
        //   setElement('img',name,E_BODY,y,x,y2,x2);
        }else{
          name = 'blank';
        }
      }
    
      EData[y2][x2][0] = name;
      EData[y2][x2][1] = y;
      EData[y2][x2][2] = x;
      EData[y2][x2][3] = '';
      EData[y2][x2][4] = '';
      if (debug){
        // let text = constElementCmn('div',temp,`data`,'absolute',`${y}px`,null,`${x}px`,null,`${IMG_SIZE}px`,`${IMG_SIZE}px`,0);
        let element = setElement('div','data',E_BODY,y,x,y2,x2,false);
        element.innerHTML = `${count} ${y2}:${x2} ${y}:${x} ${name}`;
        element.innerHTML = `${count} ${y2}:${x2} ${name}`;
        count++;
      }//if (debug){
      x2++;
    }//for (let x = 0; x <= STAGE_LENGTH_X; x += ELEMENT_SIZE) {
  y2--;
  }//for (let y = STAGE_LENGTH_Y; y >= 0; y -= ELEMENT_SIZE) {
  // console.log(EData);
  let eTime = new Date;
  console.log(`fnc time: ${eTime - sTime}`);
}//function constElement() {

function setElement(tag,name,parent,y,x,y2,x2,type = true) {
  let element;
  element = document.createElement(tag);
  if (type){element.className = `element ${name}`;}//imgの場合はcss.elementを効かせる
  else{element.className = name}
  element.name = `${y2},${x2}`
  element.style.top = `${y}px`;
  element.style.left = `${x}px`;
  parent.appendChild(element);
  element.src = `${name}.svg`;
  return element;
}

// function clearAddEventListener(){
//   let element = document.getElementsByClassName('element');//person shadow
//   for (let i = element.length - 1; i > -1; i--) {//逆から削除しないと配列がずれる
//     // console.log('set:' + element[i].className);
//     // console.log(element[i].className);
//     // element[i].removeEventListener('mouseover', fncChangeCursorCmn);
//     // element[i].addEventListener('mouseout', fncMouseout);
//     element[i].removeEventListener('click', fncClickLeft);
//   }
// }
function setAddEventListener(){
  let element = document.getElementsByClassName('element');//person shadow
  for (let i = 0; i < element.length; i++) {
    // console.log('set:' + element[i].className);
    element[i].addEventListener('mouseover', fncMouseOver);
    element[i].addEventListener('mouseout', fncMouseout);
    element[i].addEventListener('dblclick', fncRemoveElement);
    element[i].addEventListener('click', fncCommand);
    // element[i].addEventListener('oncontextmenu', fncClickRight);//右クリック
  }
  document.addEventListener('mousemove',fncMouseMove);
}

function fncMouseOver(e) {
  e.srcElement.style.border = '2px solid rgba(0,0,0,.6)';
  PARA_DATA.innerHTML = ` ${e.srcElement.className} ${e.srcElement.style.top}:${e.srcElement.style.left}`
  e.srcElement.style.zIndex = Z_INDEX.element + 1;
}

function fncMouseout(e) {
  PARA_DATA.innerHTML = '';
  e.srcElement.style.border = 'none';
  e.srcElement.style.zIndex = Z_INDEX.element;
}

function fncMouseMove(e) {//カーソルの位置情報はeventでしか取得できない
  LctCursor = getLocation(e);
  if (LctCursor.left > STAGE_LENGTH_X){LctCursor.left = STAGE_LENGTH_X;}
  if (LctCursor.top > STAGE_LENGTH_Y){LctCursor.top = STAGE_LENGTH_Y;}
  if (LctCursor.row > MAX_BLOCK_Y){LctCursor.row = MAX_BLOCK_Y;}
  if (LctCursor.clm > MAX_BLOCK_X){LctCursor.clm = MAX_BLOCK_X;}
}
// const IMG_SIZE = 10;
// const SCALE = 5;

function fncRemoveElement(e) {
  // console.log(e);
  if (!rmvElt){
    rmvElt = true;
    SOUND_SCRATCH.load();
    SOUND_SCRATCH.play();
    PARA_DATA.innerHTML = '';
    // const row = LctElmt.row;//setTimeoutのラグ対策
    // const clm = LctElmt.clm;
    e.srcElement.removeEventListener('mouseover', fncMouseOver);
    e.srcElement.removeEventListener('mouseout', fncMouseout);
    e.srcElement.removeEventListener('dblclick', fncRemoveElement);
    e.srcElement.removeEventListener('click', fncCommand);
    new Promise((resolve)=>{
      setTimeout(() => {
        // EData[row][clm][0] = 'blank';
        EData[LctElmt.row][LctElmt.clm][0] = 'blank'
        e.srcElement.remove();
        resolve();
      }, 250);
    })
    .then((result)=>{
      rmvElt = false;
      return result;
    })
  }
}


function fncCommand(e) {
  LctElmt = getLocation(e)//クリックした箇所
  LctJohn = getLocation(JOHN);//renew
  // if(!LctElmt.left2 && !LctJohn.left2){
    if (LctElmt.left2 > LctJohn.left2){
      CmdX = 'right';
      JOHN.style.transform = 'scale(1, 1)';
    } else if (LctElmt.left2 < LctJohn.left2) {
      CmdX = 'left';
      JOHN.style.transform = 'scale(-1, 1)';
    }
    if (LctElmt.top2 > LctJohn.top2){
      CmdY = 'up';
    } else if (LctElmt.top2 < LctJohn.top2) {
      CmdY = 'down';
    }
    fncCollision(LctJohn.left);//実行前に確認
  // }
}

function fncFall() {
  if (CmdX === 'leftStop' || CmdX === 'rightStop'){return;}
  if (LctJohn.row + 2 < MAX_BLOCK_Y) {//bottom *足元なので2block先をみる
    if (EData[LctJohn.row + 2][LctJohn.clm][0] === 'blank') {
      // if (JOHN.style.left === `${LctJohn.left2}px`){
        JOHN.style.top = `${LctJohn.top + 10}px`;
      // }
    }
  }
}

function fncJump() {
  if (CmdY === null || Coli.top != 0){return;}
  if (CmdX === 'rightStop'){
    if (Coli.topR === 0 && Coli.upR === 0){
      let cnstY = 5;
      AmountY += cnstY;
      JOHN.style.top = `${LctJohn.top - cnstY}px`
      if (AmountY === ELEMENT_SIZE) {
        AmountY = 0;
        CmdY = null;
        // LctJohn = getLocation(JOHN);//renew
        // fncCollision(LctJohn.top);
      }
    }
  }
}

//1intervalの移動量が1elementサイズで割り切れないので調整が必要
function fncWalk() {

  if (CmdX === null){return;}

  let cnstX = 5;
  let ajstX = cnstX;
  let moveX = 0;

  AmountX += cnstX;

  if (AmountX > ELEMENT_SIZE){//総移動量が1elementサイズを超える場合は調整
    ajstX = cnstX - (AmountX - ELEMENT_SIZE);
    AmountX = 0;
  }
  
  if (CmdX === 'left'){
    moveX = LctJohn.left - ajstX;
  } else {
    moveX = LctJohn.left + ajstX;
  }

  if (moveX < 0) {moveX =0;}

  JOHN.style.left = `${moveX}px`;

  //1element動いたときにcollision
  let mod = moveX % ELEMENT_SIZE;
  if (mod === 0 ) {
    AmountX = 0;
    LctJohn = getLocation(JOHN);//renew
    fncCollision(moveX);
  }

}

function getLocation(e) {
  let y;
  let x;
  if (e.className === 'john'){
    y = e.style.top.replace(/[^0-9]/g, '');//top
    x = e.style.left.replace(/[^0-9]/g, '');//left
  }else{
    y = e.pageY;
    x = e.pageX;
  }
  x = parseInt(x);
  y = parseInt(y);
  const y2 = y - (y % (ELEMENT_SIZE));//画像左上を基準に再設定
  const x2 = x - (x % (ELEMENT_SIZE));
  const y3 = parseInt(y / (ELEMENT_SIZE))//EDATA row
  const x3 = parseInt(x / (ELEMENT_SIZE))//EDATA clm
  const lct = {top:y, left:x, top2:y2, left2:x2, row:y3, clm:x3,};
  return lct;
}

function fncCollision(move) {
  Coli = getCollision();
  if (CmdX === 'left'){
    if (Coli.upL === 1 || Coli.lowL === 1){
      // CmdX = null;
      CmdX += 'Stop';
      return;
    }
  } else if (CmdX === 'right'){
    if (Coli.upR === 1 || Coli.lowR === 1){
      // CmdX = null;
      CmdX += 'Stop';
      return;
    }
  }
  if (move === LctElmt.left2){
    if(CmdX != 'leftStop' || CmdX != 'rightStop'){
      CmdX = null;
    }
  } 
}

function getCollision() {
  //0:blank 1:hit 2:limit
  let hitTop = 1; let hitTopR = 1; let hitTopL = 1;
  let hitUpR = 1; let hitUpL = 1;
  let hitLowR = 1; let hitLowL = 1;
  let hitBtmR = 1; let hitBtmL = 1; let hitBtm = 1;

  // * * *  @が基準
  // * @ *
  // * | *
  // * * *

  //limit
  if (LctJohn.row === 0) {hitTopL = 2; hitTop = 2; hitTopR = 2;}//top
  if (LctJohn.clm === MAX_BLOCK_X) {hitTopR = 2; hitUpR = 2; hitLowR = 2; hitBtmR = 2;}//right
  if (LctJohn.row + 1 === MAX_BLOCK_Y) {hitBtmL = 2; hitBtm = 2; hitBtmR = 2;}//bottom
  if (LctJohn.clm === 0) {hitTopL = 2; hitUpL = 2; hitLowL = 2; hitBtmL = 2;}//left
  
  //hitTopL hitTop hitTopR
  if (hitTopL != 2) {if (EData[LctJohn.row - 1][LctJohn.clm - 1][0] === 'blank') {hitTopL = 0;}}
  if (hitTop != 2) {if (EData[LctJohn.row - 1][LctJohn.clm][0] === 'blank') {hitTop = 0;}}
  if (hitTopR != 2) {if (EData[LctJohn.row - 1][LctJohn.clm + 1][0] === 'blank') {hitTopR = 0;}}

  //hitTopR hitUpR hitLowR hitBtmR
  // if (hitTopR != 2) {if (EData[LctJohn.row - 1][LctJohn.clm + 1][0] === 'blank') {hitTopR = 0;}}
  if (hitUpR != 2) {if (EData[LctJohn.row][LctJohn.clm + 1][0] === 'blank') {hitUpR = 0;}}
  if (hitLowR != 2) {if (EData[LctJohn.row + 1][LctJohn.clm + 1][0] === 'blank') {hitLowR = 0;}}
  if (hitBtmR != 2) {if (EData[LctJohn.row + 2][LctJohn.clm + 1][0] === 'blank') {hitBtmR = 0;}}

  //hitBtmL hitBtm hitBtmR
  if (hitBtmL != 2) {if (EData[LctJohn.row + 2][LctJohn.clm - 1][0] === 'blank') {hitBtmL = 0;}}
  if (hitBtm != 2) {if (EData[LctJohn.row + 2][LctJohn.clm][0] === 'blank') {hitBtm = 0;}}
  // if (hitBtmR != 2) {if (EData[LctJohn.row + 2][LctJohn.clm + 1][0] === 'blank') {hitBtmR = 0;}}

  //hitTopL hitUpL hitLowL hitBtmL
  if (hitTopL != 2) {if (EData[LctJohn.row - 1][LctJohn.clm - 1][0] === 'blank') {hitTopL = 0;}}
  if (hitUpL != 2) {if (EData[LctJohn.row][LctJohn.clm - 1][0] === 'blank') {hitUpL = 0;}}
  if (hitLowL != 2) {if (EData[LctJohn.row + 1][LctJohn.clm - 1][0] === 'blank') {hitLowL = 0;}}
  // if (hitBtmL != 2) {if (EData[LctJohn.row + 2][LctJohn.clm - 1][0] === 'blank') {hitBtmL = 0;}}

  let hit = {topL:hitTopL, top:hitTop, topR:hitTopR, upR:hitUpR, lowR:hitLowR,
  btmR:hitBtmR, btm:hitBtm, btmL:hitBtmL, lowL:hitLowL, upL:hitUpL}
  return hit;
}

function setParameter() {
  if (LctCursor != null){
    PARA_LOCATION.innerHTML = `cursor ${LctCursor.top}:${LctCursor.left} (${LctCursor.row}:${LctCursor.clm})`;
    PARA_LOCATION.innerHTML += ` ${EData[LctCursor.row][LctCursor.clm][0]}`;
  }
  PARA_DATA2.innerHTML = `john ${LctJohn.top}:${LctJohn.left} (${LctJohn.top2}:${LctJohn.left2})`;
  PARA_DATA2.innerHTML += ` (${LctJohn.row}:${LctJohn.clm})`;
  if (Coli != null) {
    // PARA_DATA2.innerHTML += ` coli top:${Coli.topL Coli.top Coli.topR} up:${Coli.upL Coli.upR} low:${Coli.lowL Coli.lowR} btm:${Coli.btmL Coli.btm Coli.btmR}`;
    PARA_DATA2.innerHTML += ` coli top:${Coli.topL} ${Coli.top} ${Coli.topR} up:${Coli.upL} ${Coli.upR} low:${Coli.lowL} ${Coli.lowR} btm:${Coli.btmL} ${Coli.btm} ${Coli.btmR}`;
  }
  if (LctElmt != null){
    PARA_DATA2.innerHTML += ` select ${LctElmt.top}:${LctElmt.left} (${LctElmt.top2}:${LctElmt.left2})`;
    PARA_DATA2.innerHTML += ` (${LctElmt.row}:${LctElmt.clm})`;
  }
}