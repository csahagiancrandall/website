var colors = new Array([62,35,255], [60,255,60], [255,35,98], [45,175,230], [255,205,41], [255,0,255], [255,128,0]);
var gradientTimer, timer, step = 0, colorIndices, gradientSpeed = .02, deg, gradTextSupp, menuScroll, homeopen = true;
    
$(document).ready(function() {
    step = parseFloat(localStorage.getItem("step"));
    if (isNaN(step)) step = 0;

    colorIndices = JSON.parse(localStorage.getItem("colorIndices"));
    if (localStorage.getItem("colorIndices") == null) colorIndices = [0,1,2,3,4,5,6];

    deg = parseInt(localStorage.getItem("deg"));
    if (isNaN(deg)) deg = 180;

    gradientTimer = setInterval(updateGradient,350);
});
  
function updateGradient(){
    deg = 90;
    var c0_0 = colors[colorIndices[0]];
    var c0_1 = colors[colorIndices[1]];
    var c1_0 = colors[colorIndices[2]];
    var c1_1 = colors[colorIndices[3]];
    
    var istep = 1 - step;
    var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
    var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
    var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
    var color1 = 'rgb(' + r1 + ',' + g1 + ',' + b1 + ')';

    var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
    var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
    var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
    var color2 = 'rgb(' + r2 + ',' + g2 + ',' + b2 + ')';
	
    $(".title, .card--link, .portfolio-preview").css({
        "background":'linear-gradient(' + deg + 'deg,' + color1 + ', ' + color2 + ')',
    });

    step += gradientSpeed;
    if (step >= 1){
        step %= 1;
        colorIndices[0] = colorIndices[1];
        colorIndices[2] = colorIndices[3];
        colorIndices[1] = (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
        colorIndices[3] = (colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
    }
    $("body").removeClass("is-loading");
}

window.onbeforeunload = function(){save()};
window.addEventListener("beforeunload", function(e){save()}, false);

function save(){
    clearInterval(gradientTimer); localStorage.setItem("colorIndices",JSON.stringify(colorIndices));
    localStorage.setItem("step",step);
    localStorage.setItem("deg",deg);
}

$('.preload').load(function(){
   $(this).css('background','none');
});