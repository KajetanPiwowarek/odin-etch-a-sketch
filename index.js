const DEFAULT_COLOR = '#FFFFFF';
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentSize = DEFAULT_SIZE;

function setCurrentColor(newColor) {
  currentColor = newColor;
}

function setCurrentSize(newSize) {
  currentSize = newSize;
}

const btnColor = document.getElementById('input-color');
const btnClear = document.getElementById('btn-clear');
const slider = document.getElementById('input-size');
const grid = document.getElementById('grid');

btnColor.oninput = (e) => setCurrentColor(e.target.value);
btnClear.onclick = () => reloadGrid();
slider.onchange = (e) => changeSize(e.target.value);

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function changeSize(value) {
  setCurrentSize(value);
  reloadGrid();
}

function reloadGrid() {
  clearGrid();
  setupGrid(currentSize);
}

function clearGrid() {
  grid.innerHTML = '';
}

function setupGrid(size) {
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const gridElement = document.createElement('div');
    gridElement.classList.add('grid-element');
    gridElement.addEventListener('mouseover', changeColor);
    gridElement.addEventListener('mousedown', changeColor);
    grid.appendChild(gridElement);
  }
}

function changeColor(e) {
  if (e.type === 'mouseover' && !mouseDown) return;
  e.target.style.backgroundColor = currentColor;
}

window.onload = () => {
  setupGrid(DEFAULT_SIZE)
}
