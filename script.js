const timep = document.getElementById('timep');
const againbtn = document.getElementById('againbtn');
const modal = document.getElementById('mymodal');
const timer = document.getElementById('minsec');
const conteinerOfMemoji = document.querySelectorAll('div.conteiner');



let memojibox = {
    boardsize: document.querySelectorAll('div.conteiner').length,
    itsFirstClick: false,
    memoji: ['🐶', '🐱', '🐭', '🐹', '🐰', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐙', '🐵', '🦄', '🐞', '🦀', '🐟', '🐊', '🐓', '🦃', '🐿'],
    memojiBoard() {
        let i = 0;
        let j = 0;
        let count = 0;
        let arrofmemoji = [];
        let returnarr = []
        while (i < this.boardsize/2){
            let elem = this.memoji[Math.floor(Math.random() * this.memoji.length)];
            if (arrofmemoji.includes(elem)){
                continue;
            }
            else {
                arrofmemoji[i] = elem;
                    i++;
            };
        };
        while (j < this.boardsize/2){
            let index = Math.floor(Math.random() * this.boardsize);
            if (returnarr[index] === undefined){
                returnarr[index] = arrofmemoji[j];
                count++;
                if (count === 2){
                    count = 0;
                    j++
                };
            }
            else {
                continue
            };
        };
        return returnarr      
    },
    memojiFirstClick: () => this.itsFirstClick = true,
};


function init(){
    modal.style.display = 'none';
    againbtn.addEventListener('click', () => init());
    timep.innerHTML = '';
    let timeString = new Date(0, 0, 0, 0, 31, 17, 0).toISOString().substr(14, 5);
    timer.innerHTML = timeString; 
    let correctClass = document.querySelectorAll('.correct');
    for (let i = 0; i < correctClass.length; i++){
        flip(correctClass[i]);
    };
    let activeClass = document.querySelectorAll('.active');
    for (let i = 0; i < activeClass.length; i++){
        flip(activeClass[i]);
    };   
    memojibox.itsFirstClick = false;
    // Задержка при инициализации борда
    setTimeout(()=>{
    CreateBoard(conteinerOfMemoji);
    CreateBoardTwice(conteinerOfMemoji);
    }, 300);  
};


// Работа с таймером и модальным окном
function CreateBoardTwice(list){
    let second = 16; 
    for (let i = 0; i < list.length; i++){
        list[i].addEventListener('click', function(){
            memojibox.memojiFirstClick();
            if (!memojibox.itsFirstClick){
                memojibox.itsFirstClick = true;
                let timerint = new Timer(function(){
                timer.innerHTML = new Date(0, 0, 0, 0, 31, second--, 0).toISOString().substr(14, 5); 
                let checkCorrect = document.querySelectorAll('.correct');
                if (checkCorrect.length === conteinerOfMemoji.length){
                    timerint.stop();
                    timeOut.stop();
                    againbtn.innerHTML = 'Play again';
                    CreateWord('WIN')
                    modal.style.display = 'block'; 
                }
               }, 1000);
               let timeOut = new Coundown ( function(){
                   timerint.stop();
                   againbtn.innerHTML = 'Try again';
                   CreateWord('LOSE');
                   modal.style.display = 'block';
                }, 60000)
            };  
        }, false);

    };
};


function Coundown(func, t){
    let coundObj = setTimeout(func, t);

    this.stop = function(){
        if (coundObj){
            clearTimeout(coundObj);
            coundObj = null;
        };
        return this;
    };
};


function Timer(func, t){
    let timeObj = setInterval(func, t);

    this.stop = function(){
        if (timeObj){
            clearInterval(timeObj);
            timeObj = null;
        }
        return this;
    };
};

// Запись значения в блок
function CreateBoard(list){
    let box = memojibox.memojiBoard();
    for (let i = 0; i < list.length; i++){
        list[i].children[0].innerHTML = box[i];
        list[i].addEventListener('click', checkCorrectCard, false);
    };
}


// работа с логикой игры
function checkCorrectCard(){
    let openCard = this;
    let open = openCard.children[0]; // через детей
    if (open.classList.contains('correct') || open.classList.contains('incorrect')){
        return
    };
    if (open.classList.contains('active')){
        open.classList.remove('active'); 
        flip(open);
    }
    animated({ duration: 400, timing(timeFraction) {return timeFraction;},
        draw(progress) {
            openCard.style.webkitTransform = 'rotateY(' + progress * 180 + 'deg)';
       }
     });
    open.classList.add('active');
    let incorrect = document.querySelectorAll('.incorrect');
    if (incorrect.length === 2){
        for (let i = 0; i < incorrect.length; i++){
            flip(incorrect[i]);
        }
    };
    let active = document.querySelectorAll('.active');
    if (active.length === 2){
        if(active[0].textContent === active[1].textContent) {
            for (let i = 0; i < active.length; i++){
                active[i].classList.add('correct');
                active[i].classList.remove('active');  
        };
    }
        else {
            for (let i = 0; i < active.length; i++){
                active[i].classList.add('incorrect');
            };
        };
    };
};


//Анимации 
function flip(element){
    let flipelement = (element.previousSibling.parentElement);
    console.log(flipelement)
    setTimeout (function() {
        animated({ duration: 500, timing(timeFraction) {return timeFraction;},
     draw(progress) {
         flipelement.style.webkitTransform = 'rotateY(' + (180 - progress * 180) + 'deg)';
       }
     });
        while (element.classList.length > 0){
            element.classList.remove(element.classList.item(0))
        }
    }, 0.0)
}


function CreateWord(word) {
	for(let i = 0; i < word.length; i++) {
		let newSpan = document.createElement('span');
        newSpan.innerHTML = word[i];
        timep.appendChild(newSpan);
	}
};


function animated({timing, draw, duration}){
    let start = performance.now();
    requestAnimationFrame(function animated(time){
        let timeFaction = (time - start) / duration;
        if (timeFaction > 1) timeFaction = 1;
        let progress = timing(timeFaction);
        draw(progress);
        if (timeFaction < 1){
            requestAnimationFrame(animated)
        }
    })
}


init();