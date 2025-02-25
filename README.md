# slay-the-dagron
#### Project Unit 1 General Assembly, a java game

## How to play
Choose an action
    + Attack
    + Tuck and Roll
    + Drink a Healing Potion
    + Flee

### How to Win
Bring the Dagron to 0HP before yours run out, and before the Dagron kills all the villagers.  The surviving villagers becomes your score.

## How it works
Each round 'click', the dragon performs a random action
it might damage the player, and/or kill some villagers
Attack throws a spear, damages the Dagron
Defend halves incoming damage this round
Heal restores some player HP
Fleeing is only for cowards
the game displays if the game is over or continues

## How it was built
I want to build a combat turn-based game with an art style like a vintage text-based adventure computer game, styled after Dungeons and Dragons.
1. Upon Loading it should display a message to the player "A terrifying Dagron has beset the village, is smashing buildings and eating villagers."
And then a short how to play "ATTACK with spears to Slay the Dagron, Take Cover behind your shield to DEFEND against incoming damage, or Drink a Vitality Potion to HEAL."
2. Below the messages will be 4 buttons: a spear labeled ATTACK, a shield labeled DEFEND, a bottle labeled HEAL, and a winged foot labeled FLEE.
3. To win, the player must bring the Dagron's HP to 0 or lower, at which point the game displays "That last spear pierces the heart of the beast, and it falls dead to the ground. VICTORY! You have slain the mighty Dagron and save the Village.  The (number) remaining villagers will surely immortalize your name in song, just as soon as they extinguish their homes."
4. There are 3 losing conditions: 
    + If the player chooses FLEE they're treated to warrior message for their cowardice.  "You live to fight another day, but at what cost?  You may have survived, but the Village is lost.
    GAME OVER", set gameOver = true
    + If the Player's HP reaches 0 or below the player receives the warrior message "Seeing their most capable warrior lain low by the Dagron, the remaining (number) Villagers flee into the countryside.  Your heroic sacrifice would surely be remembered in song, if the Dagron hadn't burned all the instruments.", set gameOver = true
    + If the player survives but the last villager is killed, the FLEE message displays as the player has nobody left to defend., set gameOver = true
5. The winning/losing state is determined by 3 counters displayed to the user: Player HP, Dagron HP, Villagers remaning. A function will check each counter against <=0 after each click on any of the 4 buttons.
6. The function handleClick() will trigger each time the buttons are clicked,
it will fire off other functions based on which button the player chose.  If gameOver = true, dragonMsg = "GAME OVER", set the reset button text to "PLAY AGAIN?" with bigger text, darken the choice buttons
    1. FLEE= skip down to display a defeat message
    1. HEAL= random dragon action(random amount of damage and casualties, check shield=true/false, update dragonMsg), check for loss (cuts out, update message), add health, warriorMsg = "You healed for (number)"
    1. ATTACK= random dragon acion, check for loss, warrior attack(check if flying=true, attack roll, damage roll), subtract damage from dagron.health
    1. DEFEND= set shield= true, random dragon action, if you survive warrior message= "But due to your quick thinking your shield protects you and you take only (number) damage.", check for loss
    1. update the counters
    1. check for victory(update message)
        display "The battle rages, choose again."
    1. At the bottom is a "Reset Game" button that changes

> If there's time I'll add a high score list, a classic 3 letter arcade style. on a victory it offers the player a dialog box, post alongside the "score" of villagers saved.

> If there's time I'll also add a spear counter, if the player runs out they're forced to flee