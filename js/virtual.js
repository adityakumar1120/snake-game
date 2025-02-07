const board = document.querySelector('.board')
let foodX;
let foodY;
let snakeBody = []
let snakeX = 7;
let snakeY = 7;
let velocityX = 0;
let velocityY = 0;

function getRandomPosition(){
    foodX = Math.floor(Math.random()*14) + 1
    foodY = Math.floor(Math.random()*14) + 1
}

getRandomPosition()
function main(){

    if(snakeX === foodX && snakeY === foodY){
        getRandomPosition()
        snakeBody.push([foodX,foodY])
        console.log(snakeBody);
    } 
    console.log(snakeBody);

    for (let i = snakeBody.length-1; i > 0; i--){
        snakeBody[i] = snakeBody[i-1]
    //    console.log(snakeBody[0]);
       console.log(snakeBody[i]);

       console.log(snakeBody);
    }

    snakeX += velocityX
    snakeY += velocityY
    let setHtml = `<div class="food" style="grid-area: ${foodY}/${foodX};"></div>`
    snakeBody[0] = [snakeX, snakeY]
    for (let i = 0; i < snakeBody.length; i++){
        setHtml += ` <div class="snake" style="grid-area: ${snakeBody[i][1]}/${snakeBody[i][0]};"></div>`
       
    }
    board.innerHTML = setHtml
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
    main()
}

setInterval(main , 150)

document.addEventListener('keydown',snakeMove)
