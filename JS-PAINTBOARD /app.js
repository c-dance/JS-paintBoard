//canvas, context initilizie
const BACKGROUND_LAYER = document.getElementById("background-layer");
const PHOTO_LAYER = document.getElementById("photo-layer");
const LINE_LYAER = document.getElementById("line-layer");
const BACKGROUND_CTX = BACKGROUND_LAYER.getContext("2d");
const PHOTO_CTX = PHOTO_LAYER.getContext("2d");
const LINE_CTX = LINE_LYAER.getContext("2d");

const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 600;

const LAYERS = [BACKGROUND_LAYER, PHOTO_LAYER, LINE_LYAER];
LAYERS.forEach(LAYER =>{
    LAYER.width = CANVAS_WIDTH;
    LAYER.height = CANVAS_HEIGHT;
});

BACKGROUND_CTX.fillStyle="white";
BACKGROUND_CTX.fillRect(0,0,BACKGROUND_LAYER.width, BACKGROUND_LAYER.height);
LINE_CTX.strokeStyle = "black";
LINE_CTX.linewith = 2.5;

//div
const BRUSH_MODE = document.getElementById("brush-mode");
const BACKGROUND_MODE = document.getElementById("background-mode");
const BRUSH_SIZES = document.getElementsByClassName("size");
const BRUSH_COLORS = document.getElementsByClassName("color");
//btns
const BACKGROUND_BTN = document.getElementById("background");
const BRUSH_BTN = document.getElementById("brush");
const CLEAN_BTN = document.getElementById("clean");
const BACK_BTN = document.getElementById("back");
const SAVE_BTN = document.getElementById("save");

//inputs
const BACKGROUND_COLOR = document.getElementById("background-color");
const PHOTO_UPLOADER = document.getElementById("photo-uploader");
const PHOTO_TRANSPARENCY = document.getElementById("photo-transparency");

//drawMode
let drawMode = false;
let X = 0;
let Y = 0;
let backUp=[];

//photo-functions
function uploadPhoto(event){

}

//paintMode-functions
function clickBrushMode(event){
    BACKGROUND_MODE.style.display = "none";
    BRUSH_MODE.style.display="flex";
}
function clickBackgroundMode(event){
    BRUSH_MODE.style.display="none";
    BACKGROUND_MODE.style.display = "flex";
}

//background-functions
function inputBackgroundColor(event){
    const color = BACKGROUND_COLOR.value;
    BACKGROUND_CTX.fillStyle = color;
    BACKGROUND_CTX.fillRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

//brush-functions
function clickBrushSize(event){
    let size;
    if(event.target.lastChild) size = event.target.lastChild.getAttribute("height");
    else size = event.target.getAttribute("height");
    console.log(size);
    LINE_CTX.lineWidth = size;
}

function clickBrushColor(event){
    const COLOR = event.target.style.backgroundColor;
    LINE_CTX.strokeStyle = COLOR;
}

//draw-functions
function startDrawMode(event){
    backUpData();
    drawMode = true;
    X = event.offsetX;
    Y = event.offsetY;
    LINE_CTX.beginPath();
}

function stopDrawMode(event){
    LINE_CTX.closePath();
    drawMode = false;
}

function onDrawMode(event){
    if(!drawMode) return;
    let lineToX = event.offsetX; 
    let lineToY = event.offsetY;
    LINE_CTX.moveTo(X, Y);
    LINE_CTX.lineTo(lineToX, lineToY);
    LINE_CTX.stroke();
    X = lineToX;
    Y = lineToY;
}

function backUpData(){
    const LINE_DATA = LINE_CTX.getImageData(0, 0, LINE_LYAER.width, LINE_LYAER.height);
    const BACKGROUND_DATA = BACKGROUND_CTX.getImageData(0, 0, BACKGROUND_LAYER.width, BACKGROUND_LAYER.height);
    backUp = [BACKGROUND_DATA, LINE_DATA];
    console.log(backUp);
}

function backOneStep(event){
    cleanCanvas(event);
    console.log("backOneStep");
    BACKGROUND_CTX.putImageData(backUp[0], 0, 0);
    LINE_CTX.putImageData(backUp[1], 0, 0);
}

//initilize function
function cleanCanvas(event){
    BACKGROUND_CTX.fillStyle="white";
    BACKGROUND_CTX.fillRect(0,0,BACKGROUND_LAYER.width, BACKGROUND_LAYER.height);
    LINE_CTX.clearRect(0,0,LINE_LYAER.width, LINE_LYAER.height);
    LINE_CTX.beginPath();
}

//photo-events
PHOTO_UPLOADER.addEventListener("input", uploadPhoto);

//paintMode-events
BACKGROUND_BTN.addEventListener("click", clickBackgroundMode);
BRUSH_BTN.addEventListener("click", clickBrushMode);
//background-events
BACKGROUND_COLOR.addEventListener("input", inputBackgroundColor);
//brush-events
Array.from(BRUSH_SIZES).forEach(size => {
    size.addEventListener("click", clickBrushSize);
})
Array.from(BRUSH_COLORS).forEach(brush => {
    brush.addEventListener("click", clickBrushColor);
})
//canvas-events
CLEAN_BTN.addEventListener("click", cleanCanvas);
BACK_BTN.addEventListener("click",backOneStep);

//mouse events - stroke
if(LINE_LYAER){
    LINE_LYAER.addEventListener("mousedown", startDrawMode);
    LINE_LYAER.addEventListener("mouseup", stopDrawMode);
    LINE_LYAER.addEventListener("mousemove", onDrawMode);
    LINE_LYAER.addEventListener("mouseleave", stopDrawMode);
}
