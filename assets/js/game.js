/**
 * Created by sowwy on 8/14/16.
 */
const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const KEY_SPACE = 32;
const KEY_MOVE_UP = 38;
const KEY_CROWCH = 17;
const KEY_DOWN = 40;
touch = 0;

$(function(){

    var arrayStone = ["stone-up", "stone-middle", "stone-down"];
    count = 0

    setInterval(function() {
        //var body = $('#body');
        var number = Math.floor(Math.random() * 3);
        var randomDiv = arrayStone[number];
        var div = document.createElement("div");
        div.className = randomDiv + ' ball';
        div.id = "test";
        document.body.appendChild(div);

        $("#test").animate({
            left: "-=1300px",

        },1000 ,function (){
            count++;
            $("#points").html(count);
            if(touch >= 3 ){
                var  cont = confirm(" You lose! \nWould you like to play again?");
            }
            if(count >= 20 && touch < 3){
                var  cont = confirm(" You won! \nWould you like to play again?");
            }
            if(cont){
                location.reload();
            }
            $("#test").remove();
        })

    }, 1500)
})

var moves = {
    37: {
        left: "-=3"
    },
    17: {
        crouch: ""
    },
    39: {
        left: "+=3"
    },
    32: {
        top: ""
    },
    38: {
        top: ""
    },
    40: {
        bottom: ""
    }
};

$(document).one("keydown", keyDown);
var going;
function keyDown(e) {
    if (e.keyCode == KEY_SPACE || e.keyCode == KEY_MOVE_UP) {
        $(".item")
            .animate({
                bottom: "+=150px"
            }, "fast")
    }
    if (e.keyCode == KEY_CROWCH) {
        $(".item")
            .animate({
                height: '130px'
            }, "fast");
    }
    if (e.keyCode == KEY_DOWN) {
        $(".item")
            .animate({
                height: '50px',
                width: '250px'
            }, "fast");
    }
    $(document).one("keyup", keyup);

    var animation = moves[e.which];

    if(animation == undefined){

        return;
    }
    going = setInterval(function keepGoing() {
        $(".item").css(animation)

    }, 1);
}
function keyup(e) {
    clearInterval(going);
    $(document).one("keydown", keyDown)
    if (e.keyCode == KEY_CROWCH) {
        $(".item")
            .animate({
                height: '250px'
            }, "fast")
    }
    if (e.keyCode == KEY_DOWN) {
        $(".item")
            .animate({
                height: '250px',
                width: '100px'
            }, "fast");
    }
    if (e.keyCode == KEY_SPACE || e.keyCode == KEY_MOVE_UP) {
        $(".item")
            .animate({
                bottom: "0px"
            }, "fast")
    }
}

function collision() {
    if(!($('.ball').length)){
        return false;
    }
    var x1 = $('.item').offset().left;
    var y1 = $('.item').offset().top;
    var h1 = $('.item').outerHeight(true);
    var w1 = $('.item').outerWidth(true);
    var b1 = y1 + h1;
    var r1 = x1 + w1;
    var x2 = $('.ball').offset().left;
    var y2 = $('.ball').offset().top;
    var h2 = $('.ball').outerHeight(true);
    var w2 = $('.ball').outerWidth(true);
    var b2 = y2 + h2;
    var r2 = x2 + w2;


    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
    console.log(h1)
    $('.ball').remove();
    touch++;
    $("#shots").html(touch);
    return true;
}


window.setInterval(function() {
    collision();
}, 200);