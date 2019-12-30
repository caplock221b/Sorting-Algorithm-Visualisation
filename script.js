const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
//get DPI
let dpi = window.devicePixelRatio;
// canvas.width = 300, canvas.height = 150
function fix_dpi() {
    //get CSS height
    //the + prefix casts it to an integer
    //the slice method gets rid of "px"
    let style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
    //get CSS width
    let style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
    //scale the canvas
    canvas.setAttribute('height', style_height * dpi);
    canvas.setAttribute('width', style_width * dpi);
}
fix_dpi();

window.addEventListener('resize',
function(e){
    c.clearRect(0, 0, canvas.width, canvas.height);
    onStart();
});

// alert("This project is best visualised in full screen.")
let numberArray = [];
let num;
let passes;
let comparisons;
let swaps;
let i;
let game;
let activeTab = null;

const pass = document.querySelector('.passes');
const compare = document.querySelector('.comparisons');
const swap = document.querySelector('.swaps');

function randomIntFromRange(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const alpha = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
let randomColor;
function randomColorGenerator(){
    randomColor = '#';
    for(let i=0; i<6; i++){
        randomColor += alpha[Math.floor(Math.random() * alpha.length)];
    }
    return randomColor;
}

let unit = { // Defines one square box
    x: canvas.width/50,
    y: canvas.height/50
}

// Bubble Sort
    const bubble = document.querySelector('.bubble');
    bubble.addEventListener('click',
    function(){
        for(let i=0; i<50; i++){
            numberArray[i] = {
                num: randomIntFromRange(1, 48),
                color: randomColorGenerator()
            };
        }
        i = 0;
        passes = 0;
        comparisons = 0;
        swaps = 0;
        pass.innerHTML = '';
        compare.innerHTML = '';
        swap.innerHTML = '';
        activeTab = 'bubble';
        game = setInterval(BubbleSort, 2000);
    });

    function BubbleSort(){
        draw();
        if(i == 49){
            clearInterval(game);
        }
        for(let j=0; j<numberArray.length-i-1; j++){
            if(numberArray[j].num > numberArray[j+1].num){
                let temp1 = numberArray[j].num;
                numberArray[j].num = numberArray[j+1].num;
                numberArray[j+1].num = temp1;

                let temp2 = numberArray[j].color;
                numberArray[j].color = numberArray[j+1].color;
                numberArray[j+1].color = temp2;

                swaps++;
            }
            comparisons++;
        }
        i++;
        passes++;
    }

// Selection Sort
    const selection = document.querySelector('.selection');
    selection.addEventListener('click',
    function(){
        for(let i=0; i<50; i++){
            numberArray[i] = {
                num: randomIntFromRange(1, 48),
                color: randomColorGenerator()
            };
        }
        i = 0;
        passes = 0;
        comparisons = 0;
        swaps = 0;
        pass.innerHTML = '';
        compare.innerHTML = '';
        swap.innerHTML = '';
        activeTab = 'selection';
        game = setInterval(SelectionSort, 2000);
    });

    function SelectionSort(){
        draw();
        if(i == 49)
            clearInterval(game);
        let x = i;
        for(let j=i+1; j<numberArray.length; j++){
            if(numberArray[x].num > numberArray[j].num){
                x = j;
            }
            comparisons++;
        }
        if(x != i){
            let temp1 = numberArray[x].num;
            numberArray[x].num = numberArray[i].num;
            numberArray[i].num = temp1;

            let temp2 = numberArray[x].color;
            numberArray[x].color = numberArray[i].color;
            numberArray[i].color = temp2;

            swaps++;
        }
        passes++;
        i++;
    }

// Insertion Sort
    const insertion = document.querySelector('.insertion');
    insertion.addEventListener('click',
    function(){
        for(let i=0; i<50; i++){
            numberArray[i] = {
                num: randomIntFromRange(1, 48),
                color: randomColorGenerator()
            };
        }
        i = 1;
        passes = 0;
        comparisons = 0;
        swaps = 0;
        pass.innerHTML = '';
        compare.innerHTML = '';
        swap.innerHTML = '';
        activeTab = 'insertion';
        game = setInterval(InsertionSort, 2000);
    });

    function InsertionSort(){
        draw();
        if(i == 50){
            clearInterval(game);
        }
        let j=i-1;
        let x = {
            num: numberArray[i].num,
            color: numberArray[i].color
        }
        while(j>-1 && numberArray[j].num>x.num){
            numberArray[j+1].num = numberArray[j].num;
            numberArray[j+1].color = numberArray[j].color
            j--;
            swaps++;
            comparisons++;
        }
        comparisons++;
        numberArray[j+1].num = x.num;
        numberArray[j+1].color = x.color;
        passes++;
        i++;
    }
function onStart(){
    if(activeTab == null){
        c.fillStyle = "black";
        c.font = "4vh Georgia";
        c.textAlign = "center";
        c.fillText("Click one of the buttons below to start simulating a sorting algorithm!", canvas.width/2, canvas.height/2);
        pass.style.display = "none";
        compare.style.display = "none";
        swap.style.display = "none";
    }
}

onStart();

function draw(){
    pass.style.display = "flex";
    compare.style.display = "flex";
    swap.style.display = "flex";
    pass.innerHTML = `<b>No. of passes = ${passes}</b>`;
    compare.innerHTML = `<b>No. of comparisons = ${comparisons}</b>`;
    swap.innerHTML = `<b>No. of swaps = ${swaps}</b>`;

    c.clearRect(0, 0, canvas.width, canvas.height);
    for(let i=0; i<50; i++){
        num = numberArray[i].num;
        c.fillStyle = `${numberArray[i].color}`;
        c.fillRect(i*unit.x, (50-num)*unit.y, unit.x, num*unit.y);
        c.strokeStyle = 'black';
        c.strokeRect(i*unit.x, (50-num)*unit.y, unit.x, num*unit.y);
        c.fillStyle = "black";
        c.font = "2.5vh Georgia";
        if(num<=9)
            c.fillText(num, i*unit.x+15, (50-num-1)*unit.y);
        else
            c.fillText(num, i*unit.x+15, (50-num-1)*unit.y);
    }
}