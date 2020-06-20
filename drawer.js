
const canvasTag = document.querySelector('canvas');
const switchBtn = document.querySelector('.info')
const dlBtn = document.querySelector('#download')

canvasTag.width = window.innerWidth * 2
canvasTag.height = window.innerHeight * 2

canvasTag.style.width = window.innerWidth + "px";
canvasTag.style.height = window.innerHeight + "px";

/* Set up canvas for 2d retina */
const context = canvasTag.getContext('2d');
context.scale(2,2);


let drawing = false;
let switchedText = false;

let aimX = null;
let aimY = null;
let currentX = null;
let currentY = null;


let i = 0;


// IMAGE HANDLER
const images = ["mitch1.png", "mitch2.png", "mitch3.png", "mitch4.png"].map(src => {
    const image = document.createElement('img')
    image.src = `/images/${src}`
    return image
})

// MOVEMENT MECHANICS

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


// HANDLE MITCH SWITCH BUTTON 
switchBtn.addEventListener("click", function(e) {
    e.stopPropagation()
    if(switchedText){
        switchBtn.innerText = 'Switch Mitch'
    } else {
        switchBtn.innerText = 'Mitch Switch'
    }
    switchedText = !switchedText

    i = i+1;
    if (i >= images.length) {
        i = 0;
    }
})



// PREVENT DEFAULT TOUCH BEHAVIOR
canvasTag.addEventListener('touchmove', function(event){
    event.preventDefault();
    return false;
})


// THE DRAW FUNCTION
const draw = function() {
    if(drawing){
        if (currentX) {
            if(images[i].complete) {
                context.drawImage(images[i], currentX -75, currentY -75, 150,150)
            }

            currentX = currentX + (aimX - currentX) * 0.1
            currentY = currentY + (aimY - currentY) * 0.1

        }
    }

    requestAnimationFrame(draw);
}

// HANDLE DOWNLOADS
const download_img = function(el) {
    var image = canvasTag.toDataURL("image/jpg");
    el.href = image;
  };


// CLEAR BUTTON
document.getElementById('clear-btn').addEventListener('click', function() {
    context.clearRect(0,0, canvasTag.width, canvasTag.height)
})



// EVENT LISTENERS FOR HANDLING DRAW STATE

document.addEventListener('mousedown', (e) => {
    if(e.target !== switchBtn && e.target !== dlBtn){
    currentX = e.pageX
    currentY = e.pageY
    drawing = true
    }
})

document.addEventListener('touchstart', (e) => {
    if(e.target !== switchBtn && e.target !== dlBtn){
    currentX = e.pageX
    currentY = e.pageY
    aimX = e.pageX
    aimY = e.pageY
    drawing = true
    }
})

document.addEventListener('mouseup', () => {
    drawing = false
})

document.addEventListener('touchend', () => {
    drawing = false
})

draw();
