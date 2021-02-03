'use strict';

function fncChangeCursorCmn(event) {
  // console.log(event.srcElement);
  event.srcElement.style.cursor = 'pointer';
}


//こんなん共通でつかえんやろ
function getRandomNumberAvoidDuplicateCmn(min, max, duplicate){//duplicate is array
  let loopNum = 1;
  let loopLength = max - min;
  // console.log('loopLength:' + loopLength);
  while(true){
    let num = Math.floor(Math.random() * (max - min + 1) + min);
    if (!duplicate.includes(num)){
      // duplicate.push(num);
      // console.log('loopNumber:' + loopNum);
      return num
    }
    if (loopNum === loopLength){
      return null}
    loopNum++;
  }
}

function getRndmNum(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function constElementCmn(tag,parent,childClassName,position,top,bottom,left,right,width,height,zIndex){//return child
  let child;
  child = document.createElement(tag);
  child.className = childClassName;
  child.style.position = position;
  child.style.top = top;
  // child.style.bottom = bottom;
  child.style.left = left;
  // child.style.right = right;
  // child.style.width = width;
  // child.style.height = height;
  parent.appendChild(child);
  child.style.zIndex = zIndex;
  return child
}

