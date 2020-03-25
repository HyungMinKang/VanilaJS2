const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');

const INITAL_COLOR = '#2c2c2c';
const CANVAS_SIZE = 700;
//canvas size
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

//default color / default linebold
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITAL_COLOR;
ctx.fillStyle = INITAL_COLOR;
ctx.lineWidth = 2.5;

//painitng on/off 변수
let painting = false;
let filling = false;

function stopPainting() {
	painting = false;
}

function startPainting() {
	painting = true;
}

function onMouseMove(event) {
	const x = event.offsetX;
	const y = event.offsetY;
	if (!painting) {
		//line 시작점 찾아야함 + painting이 on으로 변할떄까지
		ctx.beginPath();
		ctx.moveTo(x, y);
	} else {
		//찾은 path부터 현재위치까지 drawing

		ctx.lineTo(x, y);
		ctx.stroke();
	}
}

function handleColorClick(event) {
	const color = event.target.style.backgroundColor;
	ctx.strokeStyle = color;
	ctx.fillStyle = color;
}

function handleRangeChange(event) {
	const size = event.target.value;
	ctx.lineWidth = size;
}
function handleModeClick(evnet) {
	if (filling == true) {
		filling = false;
		mode.innerText = 'Fill';
	} else {
		filling = true;
		mode.innerText = 'Paint';
	}
}

function handleCanvasClick() {
	if (filling) {
		ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
	}
}

function handleCM(event) {
	event.preventDefault();
}

function handleSaveClick(event) {
	const image = canvas.toDataURL();
	const link = document.createElement('a');
	link.href = image;
	link.download = 'PaingJS[🎨]';
	link.click();
}

if (canvas) {
	canvas.addEventListener('mousemove', onMouseMove);
	canvas.addEventListener('mousedown', startPainting);
	canvas.addEventListener('mouseup', stopPainting);
	canvas.addEventListener('mouseleave', stopPainting);
	canvas.addEventListener('click', handleCanvasClick);
	canvas.addEventListener('contextmenu', handleCM);
}

Array.from(colors).forEach((color) => color.addEventListener('click', handleColorClick));

if (range) {
	range.addEventListener('input', handleRangeChange);
}

if (mode) {
	mode.addEventListener('click', handleModeClick);
}

if (saveBtn) {
	saveBtn.addEventListener('click', handleSaveClick);
}
