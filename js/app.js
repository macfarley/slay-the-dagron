//make sure the game loaded properly
console.log('game loaded')

//cached html stuff here
let dagronMsgEl = document.querySelector('#dagronMessage')
let warriorMsgEl = document.querySelector('#warriorMessage')
let dagronHpEl = document.querySelector('#dagronHp')
let villagerCountEl = document.querySelector('#villagerCount')
let warriorHpEl = document.querySelector('#warriorHp')
let resetButtonEl = document.querySelector('#resetButton')

//dice bag
const dTwenty = Math.floor(Math.random() * 20) +1;
const dSix = Math.floor(Math.random() * 6) +1;
const dTen = Math.floor(Math.random() * 10) +1;

//other variables
let incomingDmg = 0;
let warriorDmg = 0;
let dagronCurrentHP = dagron.health
let warriorCurrentHP = warrior.health
let warriorMsg = warriorMsgEl.innerText
let dagronMsg = dagronMsgEl.innerText
let breath = true;
let flying = false;
let playerChoice = '';
let shield = false;
let casualties = 0;
let villagersLeft = warrior.villagers
let gameOver = false;
let dagronChoice = 0;
const actions= [biteAttack(), smashBuilding(), fly(), tailAttack(), dragonFire(), dragonFire()]

//display stuff to the user
function updateMessage (){
    //what you did, what the dragon did
    dagronMsgEl.innerText = dagronMsg
    warriorMsgEl.innerText = warriorMsg
}

function updateGameState(){
    //update the stats
    dagronHpEl.innerText = dagronCurrentHP
    villagerCountEl.innerText = villagersLeft
    warriorHpEl.innerText = warriorCurrentHP
}
//recallable function to change the visible html text
function render(){
    updateMessage()
    updateGameState()
}

//event listeners
//all the buttons
document.querySelectorAll('button').forEach((button)=>{
    button.addEventListener('click', handleClick);
  });
//warrior choices
const getPlayerChoice = (event) => {
    //where event is the click
        playerChoice = event.target.id;
        //the name of the thing you clicked
    };
//if the player chooses attack
function spearAttack(){
    //can't hit a flying dragon
    if(flying != true){
    //test attack roll vs defense, a hit meets or beats, roll damage
        if(warrior.attackRoll+ dTwenty >= dagron.defense){
        warriorDmg = (dTen+dTen)+4
        console.log('hit', warriorDmg)
        warriorMsg = `Your aim is true, your spear pierces the Dagron's hide doing ${warriorDmg} damage to the beast.`} 
        else{
        warriorMsg = "Your spear falls short. Quick, keep throwing!"}
    } else if(flying == true){
        warriorMsg = "The dragon flies out of range, your spears fall short. Quick, keep throwing!"
        flying = false
        }
    dagronCurrentHP = dagronCurrentHP - warriorDmg
}
//shield button
function defend(){
    shield = true;
    warriorMsg = "You hoist your shield and move to protect the villagers."
}
//potion button
function healthPot(){
    //10d6+10
    vitality = (dSix+dSix+dSix+dSix+dSix+dSix+dSix+dSix+dSix+dSix)+10;
    warriorMsg = `You feel a rush of vitality when you quaff a potion and heal for ${vitality} Hit Points`
    warriorCurrentHP = warriorCurrentHP+vitality
}
//flee or boots button
function runAway(){
    gameOver = true
    warriorMsg = `You live to fight another day, but at what cost?  You may have survived, but the Village is lost.`
    dagronMsg = "GAME OVER"
}
//if the player clicks reset
function resetGame(){
    nextTurn()
    gameOver = false;
    dagronCurrentHP = dagron.health;
    warriorCurrentHP = warrior.health;
    villagersLeft = warrior.villagers
    dagronMsg = "A legendary and ferocious Dagron is destroying the village and eating the villagers."
    warriorMsg = "Throw spears until the Dagron is defeated!"
    render()
}

//stuff the dragon does
function actionDie(){
    dagronChoice = dSix
    console.log(dagronChoice)
    actions[dagronChoice]
    }
function biteAttack(){
    if(dTwenty+ dagron.attackRoll >= warrior.defense){
        incomingDmg = (dTen + dTen +6)
        dagronMsg = `The Dagron's mighty jaws close around you in a ferocious bite, dealing ${incomingDmg} damage with tooth and flame.`
    } else{
        dagronMsg = "The Dagron snaps his jaws at you but you narrowly escape."
        }
    if(shield == true){
    warriorCurrentHP = warriorHpEl.innerText - (incomingDmg/2)}
        else{warriorCurrentHP = warriorCurrentHP - incomingDmg}
    }
function smashBuilding(){
    if(shield == true){
        dagronMsg = 'The dagron smashes a nearby building but due to your quick thinking the villagers were able to evacuate.'
    } else{
    casualties = (dSix +dSix)
    dagronMsg = `The dragon smashes a nearby building in a rage and ${casualties} villagers were crushed under the rubble.`
    villagersLeft = villagerCountEl.innerText - casualties
    }}
function fly(){
    flying = true
    dagronMsg = "The draon takes flight and swoops out of range."
}
function tailAttack(){
    if(dTwenty+10 >= warrior.defense){
        incomingDmg = (dSix+dSix+dSix+6)
        casualties = Math.floor(dSix/2)
        dagronMsg = `The Dagron's mighy tail sweeps through the street dealing ${incomingDmg} damage to you and killing ${casualties} innocent villagers in the crossfire.`
        villagersLeft = villagersLeft- casualties
    } else {
        dagronMsg = `You manage to dodge a sweep of the Dagron's tail.  If only the ${casualties} nearby villagers were as nimble as you.`
    }
    if(shield == true){
        warriorCurrentHP = warriorHpEl.innerText - (incomingDmg/2)}
            else{warriorCurrentHP = warriorHpEl.innerText - incomingDmg}
}
function dragonFire(){
    //starts off with true breath, then a 5 or 6 recharges it
    if(breath == true){
    //5d6 fire damage
        incomingDmg = (dSix+ dSix+ dSix+ dSix+ dSix)
        //burnt villagers
        casualties = dSix
        dagronMsg = `A gout of white-hot flame erupts from the Dagron's maw, frying you inside your armor for ${incomingDmg} and scorching ${casualties} unlucky villagers.`
        breath = false
        //player chooses defend, damage is halved
        if(shield == true){
            warriorCurrentHP = warriorHpEl.innerText - (incomingDmg/2)}
                else{warriorCurrentHP = warriorHpEl.innerText - incomingDmg}
    }else {
        //charge up breath, next 5 or 6 on action die breathes fire
            breath = true
            dagronMsg = "The Dagron rears back and a great wind fills its capacious lungs. Beware! The next burst of flame could come at any second."
        }
    }

//if dragon health reaches 0 we win
function checkForWin(){
    if(dagronCurrentHP >= 0){
        return
    } else{
        dagronMsg = 'With that last spear the Dagron is overwhelmed, it falls dead to the ground.'
        gameOver = true
    }
}
//if villagers or HP reaches 0
function checkForLoss(){
    if(warriorCurrentHP > 0 && villagersLeft > 0){
        return
    }
    if(warriorCurrentHP <=0){
        gameOver = true
        const victoryMsg = document.createElement('h2')
        victoryMsg.innerText = `Seeing their most capable warrior lain low by the Dagron, the remaining ${villagersLeft} Villagers flee into the countryside.  Your heroic sacrifice would surely be remembered in song, if the Dagron hadn't burned all the instruments.`
        const tippyTopEl = document.querySelector('#tippyTop')
        tippyTopEl.appendChild('victoryMsg')}
    else{ if(villagersLeft <= 0){
            gameOver = true
            const victoryMsg = document.createElement('h2')
            warriorMsg = `You live to fight another day, but at what cost?  You may have survived, but the Village is lost.`
            victoryMsg.innerText = "GAME OVER"
            victoryMsg.insertAdjacentElement(afterend, h1)
            }
    }
}
 //at the end of the handleClick, set up for next turn
function nextTurn(){
    incomingDmg = 0;
    warriorDmg = 0;
    flying = false;
    shield = false;
    playerChoice = '';
    casualties = 0;
    dagronMsg = ''
    warriorMsg = ''
}

//run through what happens when you click
function handleClick(event){
    getPlayerChoice(event)
//pass the id of the button to tell the computer what the player chose
    if(playerChoice == resetButton){
        resetGame()
        return}
//check if game is already over
    else if(gameOver == true){
        dagronMsg = "GAME OVER"
        warriorMsg = "Would you like to play again?"
        resetButtonEl.innerText = "Play Again?"}
        // warrior has 4 play options: attack, defend, heal, flee
    else if(playerChoice == 'attackButton'){
        spearAttack()}
    else if(playerChoice == 'defendButton'){
        //defend =take cover, halves incoming damage this round
            defend()}
    else if(playerChoice == 'healButton'){
            healthPot()}
    else if(playerChoice == 'fleeButton'){
            runAway()}
    //check to see if the dragon will act
    checkForWin()
    //determine what the dragon is doing this round
    actionDie()
    checkForLoss()
    console.log(dagronCurrentHP, warriorCurrentHP, villagersLeft)
    render()
    nextTurn()
}





