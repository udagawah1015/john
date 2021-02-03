'use strict';


function clearTitle(){
  E_TITLE_WRAPPER.style.display ='none';
  E_TITLE_MAIN.innerHTML = '';
  E_TITLE_SUB.innerHTML = '';
  E_TITLE_NEXT.innerHTML = '';
  E_TITLE_PREVIOUS.innerHTML = '';
  E_TITLE_NEXT.removeEventListener('mouseover', fncChangeCursorCmn);
  E_TITLE_PREVIOUS.removeEventListener('mouseover', fncChangeCursorCmn);
}

function setTitle() {
  // console.log(`stage: ${glblStageNum}`);
  switch (glblYourLocation) {
    case 'opening':
      E_TITLE_WRAPPER.style.display ='';
      E_TITLE_MAIN.innerHTML = '\“Don’t try this shit at home.\”';
      E_TITLE_MAIN.style.fontSize = '6rem';
      // E_TITLE_MAIN.animate({opacity: [ 0, 1 ]}, 2000);
      E_TITLE_SUB.innerHTML = '– Brother Mash';
      E_TITLE_SUB.style.fontSize = '3rem';
      // E_TITLE_SUB.animate({opacity: [ 0, 1 ]}, 2000);
      // setTimeout(() => {
        E_TITLE_NEXT.innerHTML = 'Next ! >';
        E_TITLE_NEXT.style.fontSize = '3rem';
        // E_TITLE_NEXT.animate({opacity: [ 0, 1 ]}, 500);
        E_TITLE_NEXT.addEventListener('mouseover', fncChangeCursorCmn);
        E_TITLE_NEXT.addEventListener('click', fncClickNext, {once : true});//addEventListenerは関数かつ引数をつけると削除できなくなる
      // }, 3000);
      break;
    case 'lecture':
      E_TITLE_MAIN.innerHTML = '';
      E_TITLE_SUB.innerHTML = '';
      E_TITLE_NEXT.innerHTML = '';
      E_TITLE_PREVIOUS.innerHTML = '';
      E_TITLE_WRAPPER.style.display ='';
      E_TITLE_MAIN.innerHTML = 'Hey yo my man !<br>Click the same stupid guys and remove it !';
      E_TITLE_MAIN.style.fontSize = '4rem';
      // E_TITLE_MAIN.animate({opacity: [ 0, 1 ]}, 500);
      E_TITLE_SUB.style.display = 'none';
      // setTimeout(() => {
        E_TITLE_NEXT.innerHTML = 'I got this ! >';
        // E_TITLE_NEXT.animate({opacity: [ 0, 1 ]}, 500);
        E_TITLE_NEXT.addEventListener('click', fncClickNext, {once : true});
        // setTimeout(() => {
          // SOUND_STAGE1.load();
          // SOUND_STAGE1.loop = true;
          // SOUND_STAGE1.play();
      //   }, 500);
      // }, 2000);
      break;
    case 'setStage':
      E_PARAMETER_STAGE.innerHTML = `STAGE ${glblStageNum + 1}`;
      clearTitle();
      break;
    case 'clear':
      E_TITLE_MAIN.innerHTML = '';
      E_TITLE_SUB.innerHTML = '';
      E_TITLE_NEXT.innerHTML = '';
      E_TITLE_PREVIOUS.innerHTML = '';
      E_TITLE_WRAPPER.style.display ='';
      E_TITLE_MAIN.innerHTML = 'You made it !';
      E_TITLE_MAIN.style.fontSize = '4rem';
      E_TITLE_MAIN.animate({opacity: [ 0, 1 ]}, 500);
      E_TITLE_SUB.style.display = 'none';
      // setTimeout(() => {
        E_TITLE_NEXT.innerHTML = 'aiight ! >';
        E_TITLE_NEXT.animate({opacity: [ 0, 1 ]}, 500);
        E_TITLE_NEXT.addEventListener('mouseover', fncChangeCursorCmn);
        E_TITLE_NEXT.addEventListener('click', fncClickNext, {once : true});
        // setTimeout(() => {
          // SOUND_STAGE1.load();
          // SOUND_STAGE1.loop = true;
          // SOUND_STAGE1.play();
      //   }, 500);
      // }, 2000);
      break;
    case 'nextStage':
      console.log('nextStage');
      constStage();
    break;
    default:
      break;
  }//switch (glblYourLocation) {
}//function constTitle() 


function fncClickEvent(sound,element,eventType){
  console.log(`chain ${chainNumber}`);
  if (eventType === 'match' && fncChain() === true){
    console.log(`pass1`);
    switch (chainNumber) {
      case 2: sound = SOUND_MATCH_2; console.log('chain:' + 2); break;
      case 3: sound = SOUND_MATCH_3; console.log('chain:' + 3); break;
      case 4: sound = SOUND_MATCH_4; console.log('chain:' + 4); break;
      case 5: sound = SOUND_MATCH_5; console.log('chain:' + 5); break;
      case 6: sound = SOUND_MATCH_6; console.log('chain:' + 6); break;
      default: sound = SOUND_MATCH_6; console.log('chain:' + 7); break;
    }
    console.log(`pass2`);
    E_PARAMETER_CHAIN.style.display = '';
    E_PARAMETER_CHAIN.innerHTML = `${chainNumber} chain !`
    E_PARAMETER_CHAIN.animate({opacity: [ 1, 0 ]}, CHAIN_TIME);
    setTimeout(() => {
      E_PARAMETER_CHAIN.style.display = 'none';
      preMatchTime = null;
      chainNumber = 0;
    }, CHAIN_TIME);
  }

  sound.load();
  sound.play();
  
  if (eventType === 'select 1st'){
    // console.log('select 1st');
    // console.log(element.className);
    glblSelectPerson1st = element;
    glblSelectPerson1st.style.outline = SELECT_BORDER;
  } else if(eventType === 'cancel 1st' || eventType === 'cancel 1st body'){
    // console.log('cancel 1st or cancel 1st body');
    // console.log(element.className);
    glblSelectPerson1st.style.outline = 'none';
    glblSelectPerson1st = null;
  } else if (eventType === 'not match'){
    // console.log('not match');
    // console.log(element.className);
    // console.log(glblSelectPerson1st.className);
    clearAddEventListener();//ミスした瞬間にevent削除
    element.style.outline = SELECT_BORDER;
    setTimeout(()=>{//2ndを選択したことが分かるようにちょっと待ってからライン消す
      glblSelectPerson1st.style.outline = 'none';
      glblSelectPerson1st = null;
      element.style.outline = 'none';
      fncGameOver(element);
    },800);
  } else if (eventType === 'match'){
    console.log('match');
    // console.log(element.className);
    // console.log(glblSelectPerson1st.className);
    glblSelectPerson1st.removeEventListener('mouseover', fncChangeCursorCmn);
    glblSelectPerson1st.removeEventListener('click', fncClick);
    glblSelectPerson1st.style.zIndex = Z_INDEX.stage
    element.removeEventListener('mouseover', fncChangeCursorCmn);
    element.removeEventListener('click', fncClick);
    element.style.zIndex = Z_INDEX.stage
    element.style.outline = SELECT_BORDER;
    let tempSelectPerson1st = glblSelectPerson1st;//連鎖のため
    glblSelectPerson1st = null;
    new Promise((resolve)=>{
      setTimeout(()=>{//2ndを選択したことが分かるようにちょっと待ってからライン消す
        tempSelectPerson1st.style.outline = 'none';
        tempSelectPerson1st.style.animation = 'none';
        tempSelectPerson1st.style.filter = 'grayscale(100%)';
        tempSelectPerson1st.animate({opacity: [ 1, 0 ]}, CHAIN_TIME);
        element.style.outline = 'none';
        element.style.animation = 'none';
        element.style.filter = 'grayscale(100%)';
        element.animate({opacity: [ 1, 0 ]}, CHAIN_TIME);
        glblRestPerson--;
        setParameter(true);
        // console.log(glblRestPerson);
        if (glblRestPerson === 0){//stage clear
          setTimeout(() => {
            // console.log('clear');
            glblStageNum++;
            glblYourLocation = 'clear';
            setTitle();
          }, 1000);
        }
        resolve();
      },150);
    }).then((result)=>{
      setTimeout(() => {
        tempSelectPerson1st.style.display = 'none';
        element.style.display = 'none';
        // element.style.transition = '1600ms ease-out';
        return result
      }, CHAIN_TIME - 150);
    });
  }//} else if (eventType === 'match'){
}//function fncClickEvent(sound,element,eventType)


function fncChain(){
  // console.log(chainNumber);
  if (preMatchTime === null){
    preMatchTime = new Date;
    chainNumber++;
    return false;
  }
  let matchTime = new Date;
  if (matchTime - preMatchTime < CHAIN_TIME){
    console.log(`ok chainTime: ${matchTime - preMatchTime}ms ${chainNumber}chain`);
    preMatchTime = new Date;
    chainNumber++;
    return true;
  }else{
    console.log(`ng chainTime: ${matchTime - preMatchTime}ms ${chainNumber}chain`);
    preMatchTime = null;
    chainNumber = 0;
    return false;
  }
}

function fncGameOver(element) {
  element.children[0].style.animation = 'flipped 0.2s infinite step-end forwards';
  element.style.zIndex = Z_INDEX.parameter + 1;
  element.style.top = '40vh';
  element.style.left = '40vw';
  element.style.transform = 'scale(7)';
  element.style.transition = '1600ms ease-out';
  SOUND_FOOTSTEPS.load();
  SOUND_FOOTSTEPS.play();
  //transitionはstyleで設定した項目にたいして適用される
  new Promise((resolve)=>{
    setTimeout(() => {
      console.log(E_TITLE_WRAPPER);
      SOUND_LAUGH.load();
      SOUND_LAUGH.play();
      element.children[0].style.animation = 'none';
      E_BODY.style.filter = 'grayscale(100%)';
      E_TITLE_WRAPPER.style.display = '';
      E_TITLE_WRAPPER.style.zIndex = Z_INDEX.title + 1;
      E_TITLE_WRAPPER.style.backdropFilter = 'blur(6px)';
      // E_TITLE_WRAPPER.style.transition = '2000ms ease-out';
      console.log(E_TITLE_WRAPPER);
      // E_TITLE_WRAPPER.animate({opacity: [ 0, 1 ]}, 2000);
      resolve();
    }, 2000);
  }).then((result)=>{
    setTimeout(() => {
      E_TITLE_MAIN.style.display = '';
      E_TITLE_MAIN.innerHTML = 'Failed';
      E_TITLE_MAIN.style.fontSize = '10rem';
      E_TITLE_MAIN.style.top = '30vh';
      E_TITLE_MAIN.style.left = '30vw';
      E_TITLE_MAIN.animate({opacity: [ 0, 1 ]}, 1500);
      return result
    }, 1000);
  }).then((result)=>{
    setTimeout(() => {
      E_TITLE_NEXT.style.display = '';
      E_TITLE_NEXT.innerHTML = 'One more ! >';
      E_TITLE_NEXT.animate({opacity: [ 0, 1 ]}, 300);
      E_TITLE_NEXT.addEventListener('mouseover', fncChangeCursorCmn);
      E_TITLE_NEXT.addEventListener('click', constStage);//startStageかも
      return result
    }, 3000);
  });//new Promise((resolve)=>{
}//function fncGameOver(element) 


function clearParameter(){
  E_BODY.style.filter = 'none';
}
function setParameter(setType = false) {
  E_PARAMETER_PERSON_REST.innerHTML = `Ass hole pair ${glblRestPerson}`;
  if (setType){
    E_PARAMETER_PERSON_REST.animate([
      // keyframes
      { transform: 'scale(1.2)' },
      { transform: 'scale(1)' }
    ], {
      // timing options
      duration: 100,
    });
  }
}
