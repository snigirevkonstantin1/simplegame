var timep = document.getElementById('timep')
var againbtn = document.getElementById('againbtn');
var shit = document.getElementById('mymodal');
var timer = document.getElementById('minsec');



var memojibox = {
    count: 0,
    memoji: ['🐶', '🐱', '🐭', '🐹', '🐰', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐙', '🐵', '🦄', '🐞', '🦀', '🐟', '🐊', '🐓', '🦃', '🐿'],
    memojiarea: function(){
        var i = 0;
        var j = 0;
        var count = 0;
        var arr = [];
        var returnarr = []
        while (i < 6){
            var elem = this.memoji[Math.floor(Math.random() * 23)];
            if (arr.includes(elem)){
                continue;
            }
            else {
                arr[i] = elem;
                    i++;
            };
        };
        while (j < 6){
            var index = Math.floor(Math.random() * 12);
            if (returnarr[index] === undefined){
                returnarr[index] = arr[j];
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
    memojicounter: function(){
        this.count++
    },
};


function init(){
    var arr = document.querySelectorAll('div.conteiner');
    shit.style.display = 'none';
    againbtn.addEventListener('click', function(){
        init();
    })
    timep.innerHTML = ''
    var timeString = new Date(0, 0, 0, 0, 31, 17, 0).toISOString().substr(14, 5);
    timer.innerHTML = timeString; 
    var incr = document.querySelectorAll('.correct');
    for (var i = 0; i < incr.length; i++){
        flip(incr[i])
    };
    var incr = document.querySelectorAll('.active');
    for (var i = 0; i < incr.length; i++){
        flip(incr[i])
    };   
    memojibox.count = 0;
    setTimeout(()=>{
    CreateBoard(arr);
    CreateBoardTwice(arr);
    }, 300)  
}


function CreateBoardTwice(list){
    sec = 16;
    var box = memojibox.memojiarea();
    for (var i = 0; i < list.length; i++){
        list[i].addEventListener('click', function(){
            memojibox.memojicounter();
            if (memojibox.count === 1){
                var timerint = new Timer(function(){
                timer.innerHTML = new Date(0, 0, 0, 0, 31, sec--, 0).toISOString().substr(14, 5);
                var incr = document.querySelectorAll('.correct')
                if (incr.length == 12){
                    timerint.stop();
                    timeOut.stop();
                    againbtn.innerHTML = 'Play again';
                    CreateWord('WIN')
                    shit.style.display = 'block'; 
                }
               }, 1000)
               var timeOut = new Coundown ( function(){
                   timerint.stop();
                   againbtn.innerHTML = 'Try again';
                   CreateWord('LOSE');
                   shit.style.display = 'block';
                }, 50000)
            };  
        }, false);

    };
};


function Coundown(func, t){
    var coundObj = setTimeout(func, t);

    this.stop = function(){
        if (coundObj){
            clearInterval(coundObj);
            coundObj = null;
        };
        return this
    };
};


function Timer(func, t){
    var timeObj = setInterval(func, t);

    this.stop = function(){
        if (timeObj){
            clearInterval(timeObj);
            timeObj = null;
        }
        return this;
    };
};


function CreateBoard(list){
    var box = memojibox.memojiarea();
    for (var i = 0; i < list.length; i++){
        var first = list[i].querySelector(".conteiner div:nth-child(1)");
        first.innerHTML = box[i]
        list[i].addEventListener('click', SomeFunction, false);
    };
}


function SomeFunction(){
    var diver = this;
    var open = diver.querySelector('.conteiner div:nth-child(1)');
    if (open.classList.contains('correct')){
        return
    };
    diver.style.WebkitTransitionDuration='0.5s';
    diver.style.webkitTransform = 'rotateY(180deg)';
    open.classList.add('active');
    var incr = document.querySelectorAll('.incorrect');
    if (incr.length === 2){
        for (var i = 0; i < incr.length; i++){
            flip(incr[i])
        }
    };
    var test = document.querySelectorAll('.active');
    if (test.length == 2){
        if(test[0].textContent === test[1].textContent) {
            for (var i = 0; i < test.length; i++){
            test[i].classList.add('correct');
            test[i].classList.remove('active');   
        };
    }
        else {
            for (var i = 0; i < test.length; i++){
                test[i].classList.add('incorrect');
            };
        };
    };
};


function flip(a){
    var b = (a.previousSibling.parentElement);
    setTimeout (function() {
        b.style.webkitTransform = 'rotateY(0deg)';
        while (a.classList.length > 0){
            a.classList.remove(a.classList.item(0))
        }
    }, 0.0)
}


function CreateWord(word) {
	for(var i = 0; i < word.length; i++) {
		var newSpan = document.createElement('span');
        newSpan.innerHTML = word[i];
        timep.appendChild(newSpan);
	}
};


init();