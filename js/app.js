//make sure the game loaded properly
console.log('game loaded')

//cached html stuff here
const updateGameEL = document.querySelector('#gameUpdate')
const playerOptions = document.querySelector('#playerOptions')
const buttons = playerOptions.querySelectorAll('button')
const dagronHpEl = document.querySelector('#dagronHp')
const villagerCountEl = document.querySelector('#villagerCount')
const warriorHpEl = document.querySelector('#warriorHp')

//display stuff to the user
function updateMessage (){
    
    //what you did, what the dragon did
    updateGameEL.innerText = "The dragon is still burning the village."
}

function updateGameState(){
    //update the stats
    dagronHpEl.innerText = dagron.health
    villagerCountEl.innerText = warrior.villagers
    warriorHpEl.innerText = warrior.health
}

function render(){
    updateMessage()
    updateGameState()
}

//event listeners
//all the buttons
buttons.forEach(button =>{
    button.addEventListener('click', handleClick);
})

//stuff the dragon does
const actionDie = Math.floor(Math.random() * 5);

const attackRoll = Math.floor(Math.random() * 20)
function dragonFire(){
    warrior.health -= (Math.floor(Math.random() * 6)) *5
    warrior.villagers -= Math.floor(Math.random() * 6)
}


//run through what happens when you click
function handleClick(){
    
    render()

}




