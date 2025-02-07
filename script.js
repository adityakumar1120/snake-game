//Game constants && Variables
const board = document.querySelector('.board')
const scoreElem = document.querySelector('.score')
const highScoreElem = document.querySelector('.high-score')
let velocity  = {x: 0, y: 0}
const foodSound = new Audio('./music/food.mp3')
const gameOverSound = new Audio('./music/gameover.mp3')
const moveSound = new Audio('./music/move.mp3')
const musicSound = new Audio('./music/music.mp3')


const keys = document.querySelector('.keys')
const selectLevel = document.querySelector('#select-level')

let speed = 5
let highScore = 0
let score = 0
let lastPaintTime = 0
let snakeArr = [
    {x: 7, y: 7},
    // {x: 8, y: 9},
    // {x: 3, y: 9},
]
let a = 2;
let b = 12;
food = {x: Math.round(a+ (b - a) * Math.random()) ,y: Math.round(a+ (b - a) * Math.random())}

//setting highscore

if(localStorage.getItem('highscore') !== null){
    console.log('highscore');

    highScore = JSON.parse(localStorage.getItem('highscore'))
    highScoreElem.innerText = `High score: ${localStorage.getItem('highscore')}`
    
} else{
    highScoreElem.innerText = `score: 0`
    
}
//Game Functions

function main(ctime){
    window.requestAnimationFrame(main)
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return
    } else{
        // console.log((ctime - lastPaintTime)/1000);
        lastPaintTime = ctime
        // console.log(ctime);
        gameEngine()
    }
    
}

function isCollide(snakeArr){

    //if you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y)
            return true
    }
    
    //if you bump into wall
    if(snakeArr[0].x >= 14 || snakeArr[0].x <= 0 || snakeArr[0].y >= 14 || snakeArr[0].y < 0){
        return true
    }
    
}

function gameEngine(){
    //Part 2 : updating the snake and array
    if(isCollide(snakeArr)){
        // musicSound.pause()
        gameOverSound.play()
        velocity  = {x: 0, y: 0}
        score = 0
        scoreElem.innerHTML = `score : ${score}`
        alert('Game over press any to start again')
        snakeArr = [{x: 7, y: 6},]
        musicSound.play()
    }
    //if you have eaten the food increment the score and regenerate the fod
    if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){
        foodSound.play()
        snakeArr.unshift({x: snakeArr[0].x + velocity.x, y: snakeArr[0].y + velocity.y })
        let a = 2;
        let b = 12;
        score++
        if(score > highScore){
            highScore = score
            console.log(score,highScore);
            localStorage.setItem('highscore' , highScore)
        }
        scoreElem.innerHTML = `score : ${score}`
        food = {x: Math.round(a+ (b - a) * Math.random()) ,y: Math.round(a+ (b - a) * Math.random())}
    }


    //moving the snake
    for (let i = snakeArr.length - 2 ; i >= 0 ; i--) {
        snakeArr[i+1] = {...snakeArr[i]} 
        // console.log(i );
    }
    
    snakeArr[0].x += velocity.x
    snakeArr[0].y += velocity.y


    //Part 2 : Displaying the snake and food 
    //Displaying the snake 
    board.innerHTML = ""
    snakeArr.forEach((elem,i) =>{
        snakeElement = document.createElement('div')
        // console.log(elem.y + velocity.x);
        snakeElement.style.gridRowStart = elem.y 
        snakeElement.style.gridColumnStart = elem.x
        if(i == 0) {
            snakeElement.classList.add('head')
        } else{
            snakeElement.classList.add('snake')
        }
        board.append(snakeElement)
    })
    //Displaying the food
    foodElement = document.createElement('div')
        foodElement.style.gridRowStart = food.y
        foodElement.style.gridColumnStart = food.x
        foodElement.classList.add('food')
        foodElement.innerText = '🍎'
        board.append(foodElement)
}

window.addEventListener('keydown' ,(e)=>{
    velocity = {x:0, y:1}
    moveSound.play()
    if(e.key == 'ArrowUp'){
        velocity.y = -1
        velocity.x = 0
    }
    if(e.key == 'ArrowDown'){
        velocity.y = 1
        velocity.x = 0
    }
    if(e.key == 'ArrowLeft'){
        velocity.y = 0
        velocity.x = -1
    }
    if(e.key == 'ArrowRight'){
        velocity.y = 0
        velocity.x = 1
    }
})

selectLevel.addEventListener('change', (e)=>{
    console.log(e.target.value);
    if(e.target.value === 'easy'){
        speed = 2
        console.log(speed);
    } else if(e.target.value === 'medium'){
        speed = 5
        console.log(speed);       
    } else if(e.target.value === 'medium'){
        speed = 8
        console.log(speed);       
    } else{
        speed = 20
        console.log(speed); 
    }
})

keys.addEventListener('click' , (e)=>{
    document.write(e.target.dataset.key);
    velocity = {x:0, y:1}
    moveSound.play()
    if(e.target.dataset.key == 'ArrowUp'){
        velocity.y = -1
        velocity.x = 0
    }
    if(e.target.dataset.key == 'ArrowDown'){
        velocity.y = 1
        velocity.x = 0
    }
    if(e.target.dataset.key == 'ArrowLeft'){
        velocity.y = 0
        velocity.x = -1
    }
    if(e.target.dataset.key == 'ArrowRight'){
        velocity.y = 0
        velocity.x = 1
    }
})







// Game logic
// debugger
window.requestAnimationFrame(main)
