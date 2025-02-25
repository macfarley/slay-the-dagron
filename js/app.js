//make sure the game loaded properly
console.log('game loaded')

//cached html stuff here
const dagronMsgEl = document.querySelector('#dagronMessage')
const warriorMsgEl = document.querySelector('#warriorMessage')
const playerOptions = document.querySelector('#playerOptions')
const buttons = playerOptions.querySelectorAll('button')
const dagronHpEl = document.querySelector('#dagronHp')
const villagerCountEl = document.querySelector('#villagerCount')
const warriorHpEl = document.querySelector('#warriorHp')

//dice bag
const dTwenty = Math.floor(Math.random() * 20) +1;
const dSix = Math.floor(Math.random() * 6) +1;
const dTen = Math.floor(Math.random() * 10) +1;

//other variables
let incomingDmg = 0;
let breath = true
let flying = false
let playerChoice = 'attack'
let casualties = 0
const actions= [biteAttack(), smashBuilding(), fly(), tailAttack(), dragonFire(), dragonFire()]

//display stuff to the user
function updateMessage (){
    //what you did, what the dragon did
    dagronMsgEl.innerText = dagronMsg
    warriorMsgEl.innerText = warriorMsg
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
function actionDie(){
    actions[dSix]
    }
function biteAttack(){
    if(dTwenty+10 >= warrior.defense){
        incomingDmg = (dTen + dTen +6)
        dagronMsg = `The Dagron's mighty jaws close around you in a ferocious bite, dealing ${incomingDmg} damage with tooth and flame.`
    } else{
        dagronMsg = "The Dagron snaps his jaws at you but you narrowly escape."
    }
}
function smashBuilding(){
    casualties = (dSix +dSix)
    dagronMsg = `The dragon smashes a nearby building in a rage and ${casualties} villagers were crushed under the rubble.`
}
function fly(){
    flying = true
    dagronMsg = "The draon takes flight and swoops out of range."
}
function tailAttack(){
    if(dTwenty+10 >= warrior.defense){
        incomingDmg = (dSix+dSix+dSix+6)
        casualties = dSix
        dagronMsg = `The Dagron's mighy tail sweeps through the street dealing ${incomingDmg} damage to you and killing ${casualties} villagers in the crossfire.`
    } else {
        dagronMsg = "You manage to dodge a sweep of the Dagron's tail.  If only the villagers were as nimble as you."
    }
}
function dragonFire(){
    //starts off with true breath, then a 5 or 6 recharges it
        if(dagron.breath == true){
        incomingDmg = (dSix+ dSix+ dSix+ dSix+ dSix)
        //burnt villagers
        casualties = dSix
        dagronMsg = `A gout of white-hot flame erupts from the Dagron's maw, frying you inside your armor for ${incomingDmg} and scorching ${casualties} unlucky villagers.`
        breath = false
        }else {
            breath = true
            dagronMsg = "The Dagron rears back and a great wind fills its capacious lungs. Beware! The next burst of flame could come at any second."
        }
    }

//run through what happens when you click
function handleClick(){
    const getPlayerChoice = (event) => {
        //where event is the click
            playerChoice = event.target.id;
            console.log(playerChoice)
            //the name of the thing you clicked
        };
//determine what the dragon is doing this round
    actionDie()
// warrior has 3 options: spear, shield, potion
    getPlayerChoice()
    if(playerChoice == 'attack'){
        spearAttack()
    }else if(playerChoice == 'defend'){
        //defend =take cover, halves incoming damage this round
        takeCover()
    }else if(playerChoice == 'potion'){
        healthPot()
    }
    render()
}




