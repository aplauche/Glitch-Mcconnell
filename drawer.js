
const canvasTag = document.querySelector('canvas');

canvasTag.width = window.innerWidth * 2
canvasTag.height = window.innerHeight * 2

canvasTag.style.width = window.innerWidth + "px";
canvasTag.style.height = window.innerHeight + "px";

/* Set up canvas for 2d retina */
const context = canvasTag.getContext('2d');
context.scale(2,2);


let aimX = null;
let aimY = null;
let currentX = null;
let currentY = null;




let i = 0;

const images = ["mitch1.png", "mitch2.png", "mitch3.png", "mitch4.png"].map(src => {
    const image = document.createElement('img')
    image.src = `/images/${src}`
    return image
})

document.addEventListener('mousemove', function(event){
    aimX = event.pageX
    aimY = event.pageY

    if(currentX === null) {
        currentX = event.pageX
        currentY = event.pageY
    }

})

document.addEventListener('touchmove', function(event){
    aimX = event.pageX
    aimY = event.pageY

    if(currentX === null) {
        currentX = event.pageX
        currentY = event.pageY
    }

})


canvasTag.addEventListener("click", function() {
    i = i+1;
    if (i >= images.length) {
        i = 0;
    }
})

canvasTag.addEventListener("touchstart", function() {
    i = i+1;
    if (i >= images.length) {
        i = 0;
    }
})

canvasTag.addEventListener('touchmove', function(event){
    event.preventDefault();
    return false;
})

const draw = function() {
    if (currentX) {
        if(images[i].complete) {
            context.drawImage(images[i], currentX -75, currentY -75, 150,150)
        }

        currentX = currentX + (aimX - currentX) * 0.1
        currentY = currentY + (aimY - currentY) * 0.1

    }

    requestAnimationFrame(draw);
}

const download_img = function(el) {
    var image = canvasTag.toDataURL("image/jpg");
    el.href = image;
  };

document.getElementById('clear-btn').addEventListener('click', function() {
    context.clearRect(0,0, canvasTag.width, canvasTag.height)
})


draw();
