'use strict';

//グルーバル変数は頭にglbl
//constはすべてグローバル
//固定のelementはグルーバルへ代入
const S_TIME = new Date;
window.onload = () => {
  const E_TIME = new Date;
  console.log('loadTime:' + (E_TIME - S_TIME));
}

const Z_INDEX = {stage : 0, element : 1, char:2, selector :3, parameter:4 };

const E_BODY = document.getElementsByTagName('body')[0];
const E_STAGE = document.getElementsByClassName('stage')[0];


//ダサいけどうまく配列に入れられへんからこれで
//フリー音源：小森 平 https://taira-komori.jpn.org/
const SOUND_BURP = new Audio('burp1.mp3');
const SOUND_SCRATCH = new Audio('shaking_a_box_of_tablets5.mp3');


const ITEM = [
  [//layer: 0
    [//layer: 0 stage: 0
      {name: 'bodyHispanicAmerican', src: 'bodyHispanicAmerican.svg'}
    ],
    [//layer: 0 stage: 1
      {name: 'bodyCaucasian', src: 'bodyCaucasian.svg'}
    ],
    [//layer: 0 stage: 2
      {name: 'bodyAfricanAmerican', src: 'bodyAfricanAmerican.svg'}
    ],
    [//layer: 0 stage: 3
      {name: 'bodyAngry', src: 'bodyAngry.svg'}
    ]
  ],//layer: 0

  [//layer:1
    [//layer:1 stage: 0
      {name: 'bouzu', src: 'bouzu.svg'},
      {name: 'hige', src: 'hige.svg'}
    ],
    [//layer:1 stage: 1
      {name: 'medama', src: 'medama.svg'},
      // {name: 'makeUp', src: 'makeUp.svg'}
    ],
    [//layer:1 stage: 2
      // {name: '', src: '.svg'},
      {name: 'makeUp', src: 'makeUp.svg'}
    ],
    [//layer:1 stage: 3
      {name: 'camoFace', src: 'camoFace.svg'},
      {name: 'baseballFace',  src: 'baseballFace.svg'}
    ]
  ],//layer: 1

  [//layer:2
    [//layer:2 stage: 0
      {name: 'faceMask', src: 'faceMask.svg'},
      {name: 'hundosi', src: 'hundosi.svg'}
    ],
    [//layer:2 stage: 1
      {name: 'glassese', src: 'glassese.svg'},
      {name: 'taitu', src: 'taitu.svg'},
      {name: 'borderShirt', src: 'borderShirt.svg'}
    ],
    [//layer:2 stage: 2
      {name: 'sunglass', src: 'sunglass.svg'},
      // {name: '', src: '.svg'}
    ],
    [//layer:2 stage: 3
      {name: 'zensinTaitu', src: 'zensinTaitu.svg'},
      {name: 'batman', src: 'batman.svg'}
    ]
  ],//layer: 2

  [//layer:3
    [//layer:3 stage: 0
      {name: 'goldNeckless', src: 'goldNeckless.svg'},
      {name: 'candy', src: 'candy.svg'}
    ],
    [//layer:3 stage: 1
      {name: 'hamaki', src: 'hamaki.svg'},
      {name: 'cap', src: 'cap.svg'}
    ],
    [//layer:3 stage: 2
      {name: 'helmet', src: 'helmet.svg'},
      // {name: '', src: '.svg'}
    ],
    [//layer:3 stage: 3
      {name: 'jasonMask', src: 'jasonMask.svg'},
      // {name: '', src: '.svg'}
    ]
  ],//layer: 3
];

// console.log(ITEM);
// console.log(ITEM[0].length);
// console.log(ITEM[1].length);
// console.log(ITEM[0]);
// console.log(ITEM[1]);