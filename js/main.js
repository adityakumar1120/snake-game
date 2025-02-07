const board = document.querySelector('.board')
let foodX;
let foodY;
let snakeX = 8;
let snakeY = 7;
let velocityX = 0;
let velocityY = 0;


function getRandomPosition(){
    foodX = Math.floor(Math.random()*14) + 1
    foodY = Math.floor(Math.random()*14) + 1
}

getRandomPosition()
function main(){
    snakeX += velocityX
    snakeY += velocityY
    // let setHtml = `<div class="food" style="grid-area: ${foodY}/${foodX};"></div>
    // <div class="snake" style="grid-area: ${snakeY}/${snakeX};"></div>
    // `
    const foodElem = document.createElement('div')
    foodElem.classList.add('food')
    foodElem.style.gridArea = `${foodY}/${foodX}`

    const snakeElem = document.createElement('div')
    snakeElem.classList.add('snake')
    snakeElem.style.gridArea = `${snakeY}/${snakeX}`

    board.append(snakeElem)
    board.append(foodElem)
    
}

function changePosition(){
    snakeX += velocityX
    snakeY += velocityY
    const foodElem = document.querySelector('.food')
    const snakeElem = document.querySelector('.snake')
     foodElem.style.gridArea = `${foodY}/${foodX}`
       snakeElem.style.gridArea = `${snakeY}/${snakeX}`
}

let noOfSnakes = 0
function growBody(){
    const snakeElem = document.createElement('div')
    snakeElem.classList.add('snakes')
    snakeElem.id = `snake-${noOfSnakes}`
    snakeElem.style.gridArea = `${snakeY-noOfSnakes}/${snakeX}`
    board.append(snakeElem)
    
}

let score = 0
function eatFood(){
    const snake = document.querySelector('.snake')
    const food = document.querySelector('.food')
    const scoreElem = document.querySelector('.score')
    if(snake.style.gridArea == food.style.gridArea){
        console.log(true);
        getRandomPosition()
        score++
        scoreElem.innerText = score
        noOfSnakes++
        growBody()
    }

}

main()

function snakeMove(e){
    if(e.key === 'ArrowUp'){
        velocityY = -1
        velocityX = 0
    }
    if(e.key === 'ArrowDown'){
        velocityY= 1
        velocityX = 0
    }
    if(e.key === 'ArrowLeft'){
         velocityY= 0
         velocityX = -1
        }
        if(e.key === 'ArrowRight'){
         velocityY= 0
        velocityX = 1
    }
    changePosition()
    eatFood()

   if(document.querySelectorAll('.snakes')){
    const allSnakes = document.querySelectorAll('.snakes')
    console.log(allSnakes);
    allSnakes.forEach((elem) =>{
        // elem
            document.getElementById(elem.id).style.gridArea = `${snakeY-noOfSnakes}/${snakeX}`
            console.log(`${snakeY-noOfSnakes}/${snakeX}`);
            console.log('hello');
    })
   } 
    // if(document.getElementById('snake-1')){
    //     document.getElementById('snake-1').style.gridArea = `${snakeY-noOfSnakes}/${snakeX}`
    //     console.log(`${snakeY-noOfSnakes}/${snakeX}`);
    // }
    // growBody()
}

document.addEventListener('keydown',snakeMove)
