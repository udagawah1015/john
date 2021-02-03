'use strict';

// new Promise((resolve)=>{
// //function here
//   resolve();
// }).then((result)=>{
//   //function here
//   return result
// }).then((result)=>{
//   //function here
//   return result
// })

//前のstageのitemを適用できるように
function setITEM(){
  if (glblStageNum === 0 || glblStageNum > MAX_ITEM_STAGE_LEVEL){return;}
  let previewStage = glblStageNum - 1;
  for (let layer = 0; layer < ITEM[0].length; layer++) {
    for (let item = 0; item < ITEM[layer][previewStage].length; item++) {
      let tempName = ITEM[layer][previewStage][item].name;
      let tempSrc = ITEM[layer][previewStage][item].src;
      ITEM[layer][glblStageNum].push({name: tempName, src: tempSrc});
      if (item === 20){break};
    }
  }
}


function fncClickNext(event) {
  // console.log(event.srcElement);
  // console.log(event.srcElement.innerText);
  event.stopPropagation();//親要素への伝播を止めるためのメソッド
  SOUND_SELECT.load();
  SOUND_SELECT.play();
  switch (glblYourLocation) {
    case 'opening':
      glblYourLocation = 'lecture';
      setTitle();
      break;
    case 'lecture':
      glblYourLocation = 'setStage';
      setTitle();
      break;
    case 'clear':
      //glblYourLocationのclearはfncClickEventでglblRestPersonが0になったときに設定される
      // glblYourLocation = 'nextStage';
      glblYourLocation = 'setStage';
      constStage();
      break;
    default: break;
  }
}

function clearPerson(){
  let person = document.getElementsByClassName('person shadow')
  for (let i = person.length - 1; i > -1; i--) {//逆から削除しないと配列がずれる
    person[i].remove();
  }
}

//同じIDのキャラは出さない
function setPerson(){
  let personID;
  let arrayID = [];
  glblRestPerson = MAX_PERSONS * (glblStageNum + 1);
  for (let i = 0; i < glblRestPerson; i++) {
    for (let j = 0; j < 10; j++) {//whileだとloopしやすいのであらかじめ実行回数を設定
      personID = getPersonID();
      // console.log(personID);
      // console.log(arrayID);
      if (!arrayID.includes(personID)){arrayID.push(personID);break};
      if (personID.length === glblRestPerson){break};
      if (j === 9) {console.log('error:max count');}
    }
    let child = constPerson(i,personID);
    let child_partner = child.cloneNode(true);
    E_BODY.appendChild(child_partner);
    setPosition(child);
    setPosition(child_partner);
  }
  arrayID.sort();
  // console.log(arrayID);
}

function getPersonID(){
  // for (let layer = 0; layer < ITEM[0].length; layer++) {
  //   for (let stage = 0; stage < ITEM[layer].length; stage++) {
  //     const item =  getRandomNumberCmn(0, ITEM[layer][stage].length - 1);
  //     for (let item = 0; item < ITEM[layer][stage].length; item++) {
  //       console.log(`$${layer}${stage}${item}`);
  //       console.log(`layer: ${layer} stage: ${stage} item: ${item} name: ${ITEM[layer][stage][item].name}`);
  //     }
  //   }
  // }
  let personID = '';
  let tempStage = glblStageNum;
  if (glblStageNum > MAX_ITEM_STAGE_LEVEL){
    tempStage = MAX_ITEM_STAGE_LEVEL;
  }
  // console.log(ITEM);
  for (let layer = 0; layer < ITEM[0].length; layer++) {//各layerと各stageにitemがないとエラーになる
    const item =  getRandomNumberCmn(0, ITEM[layer][tempStage].length - 1);
    personID += `${layer}${tempStage}${item}`;
    // console.log(`ID: $${layer}${stage}${item}`);
    // console.log(`layer: ${layer} stage: ${stage} item: ${item} name: ${ITEM[layer][stage][item].name}`);
  }
  return personID
}


function constPerson(num,personID){//return returnChild
  let parent;
  let child;
  let returnChild;
  let itemParent;

  //shadow
  // > wrapper *ここでpointerEvents = 'none'をすれば親のshadowをクリックできる
  //    > body
  //    > item

  //personWrapperに影をつけるためのwrapper
  child = constElementCmn('div',E_BODY,'person shadow ' + num,'absolute',null,null,null,null,IMG_SIZE + 'px',IMG_SIZE + 'px',Z_INDEX.person);
  returnChild = child;//for return
  parent = child;

  //personBodyをアニメーションするためのwrapper
  child = constElementCmn('div',parent,'person wrapper ' + num,'absolute',null,null,null,null,IMG_SIZE + 'px',IMG_SIZE + 'px',Z_INDEX.person);
  child.style.pointerEvents = 'none';
  // child.style.animation = 'none';
  itemParent = child;//for add item 
  parent = child;

  let arrayItem = personID.match(/.{3}/g);
  // console.log(arrayItem)
  for (let i = 0; i < arrayItem.length; i++) {
    let layer = arrayItem[i].charAt(0);
    let stage = arrayItem[i].charAt(1);
    let item = arrayItem[i].charAt(2);
    let name = ITEM[layer][stage][item].name
    let src = ITEM[layer][stage][item].src
    // console.log(ITEM[layer][stage][item].name);
    child = constElementCmn('img',parent,name,'absolute',null,null,null,null,IMG_SIZE + 'px',IMG_SIZE + 'px',Z_INDEX.person);
    child.src = src;
  }

  return returnChild
}//function constPerson()


function setPosition(target){//すでに配置済みのところに設定しない
  target.style.top = getRandomNumberAvoidDuplicateCmn(MIN_XY, MAX_XY, glblDuplicateY) + 'vh';
  target.style.left = getRandomNumberAvoidDuplicateCmn(MIN_XY, MAX_XY, glblDuplicateX) + 'vw';
}

function clearAddEventListener(){
  E_STAGE.removeEventListener('click', fncClick);
  let element = document.getElementsByClassName('person shadow');//person shadow
  for (let i = element.length - 1; i > -1; i--) {//逆から削除しないと配列がずれる
    // console.log('set:' + element[i].className);
    // console.log(element[i].className);
    element[i].removeEventListener('mouseover', fncChangeCursorCmn);
    // element[i].addEventListener('mouseout', fncMouseout);
    element[i].removeEventListener('click', fncClick);
  }
}
function setAddEventListener(){
  E_STAGE.addEventListener('click', fncClick);
  let element = document.getElementsByClassName('person shadow');//person shadow
  for (let i = 0; i < element.length; i++) {
    // console.log('set:' + element[i].className);
    element[i].addEventListener('mouseover', fncChangeCursorCmn);
    // element[i].addEventListener('mouseout', fncMouseout);
    element[i].addEventListener('click', fncClick);
  }
}


//switchが使えないのでreturnでifを終了させる
function fncClick(event){
  // console.log(event);
  // console.log(event.srcElement.localName + '/' +event.srcElement.className);
  // console.log(event);
  event.stopPropagation();//person shadowをclickしたときに親のbody clickが実行されないために必要
  //select body
  if (event.srcElement.className === 'stage'){
    //cancel body
    if (glblSelectPerson1st != null){//cancel 1st
      fncClickEvent(SOUND_CANCEL,event.srcElement,'cancel 1st body');
    }
  return;
  }

  //select 1st
  if (glblSelectPerson1st === null){
    fncClickEvent(SOUND_SELECT,event.srcElement,'select 1st');
    return;
  }
  //select 1st again
  if (glblSelectPerson1st === event.srcElement){
    fncClickEvent(SOUND_CANCEL,event.srcElement,'cancel 1st');
    return;
  }

  //select 2nd *different element 1st
  if (glblSelectPerson1st != event.srcElement){
    //same className
    if (glblSelectPerson1st.className === event.srcElement.className){
      fncClickEvent(SOUND_MATCH,event.srcElement,'match');
    } else {
    //different className
      fncClickEvent(SOUND_NOT_MATCH,event.srcElement,'not match');
    }
    return;
  }//if (glblSelectPerson1st[0] != event.srcElement){
}//function fncClick(element)

