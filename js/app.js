
var bomb = document.querySelectorAll('.bomb'),
    box = document.querySelector('.box'),
    chanceToMove = 1.5,
    moveInterval = 1100,
    boxRect = box.getBoundingClientRect(),
    boxHeight = boxRect.height,
    boxWidth = boxRect.width;

$(document).keydown(function(e){
    switch (e.which){
    case 37:
        $(".block").css({
            left: "-=90"
        });
        $(".block").css({
            transform: "scale(1,1)"
        });
        $(".block").animate({}, "fast", checkCollisions);
        break;

    case 38:
        $(".block").css({
            top: "-=90"
        });

        $(".block").animate({}, "fast", checkCollisions);
        break;

    case 39:
        $(".block").css({
            left: "+=90"
        });

        $(".block").animate({}, "fast", checkCollisions);
        $(".block").css({
            transform: "scale(-1,1)"
        });
        break;

    case 40:
        $(".block").css({
            top: "+=90"
        });

        $(".block").animate({}, "fast", checkCollisions);
        break;
    }
});


function move(){
    bomb.forEach(bomb => {
        if (Math.random() < chanceToMove) {
            bomb.style.left = getRandomInt(0, boxWidth  - 30) + 'px'
            bomb.style.top  = getRandomInt(0, boxHeight - 10) + 'px'
    }
})
};
  
setInterval(move, moveInterval)
  
function getRandomInt(min, max) {
return Math.floor(Math.random() * (max - min + 1)) + min;
}

  
function getPositions(box) {
    var $box = $(box);
    var pos = $box.position();
    var width = $box.width();
    var height = $box.height();
    return [ [ pos.left, pos.left + width ], [ pos.top, pos.top + height ] ];
}
          
function comparePositions(p1, p2) {
    var x1 = p1[0] < p2[0] ? p1 : p2;
    var x2 = p1[0] < p2[0] ? p2 : p1;
    return x1[1] > x2[0] || x1[0] === x2[0] ? true : false;
}

  let score = 1;
  $("#score").html("Score : " + 0);
  $("#message").html("Goal - 15 pts (It is a possible bro)")

function checkCollisions(){
    var box = $(".bomb")[0];
    var pos = getPositions(box);
  
    var pos2 = getPositions(this);
    var horizontalMatch = comparePositions(pos[0], pos2[0]);
    var verticalMatch = comparePositions(pos[1], pos2[1]);            
    var match = horizontalMatch && verticalMatch;
    if (match) {
        $("#score").html("Score : " + score++);
    }
    if(match){
        $(".block").css({
            width: "+=10",
            height: "+=10"
        });

    } 

    if(score == 15){
        $(".box").css({backgroundImage: "url(img/youwin.png)"});
        $("#score").html("Nice Work :D");
        $("#score").css({width: "500"});
        $(".bomb").css({ width: "0", height: "0"});
        $("#message").html("Author of this mega game: Manoli Alexandru");
        $(".block").fadeOut(3000);

    }
};

