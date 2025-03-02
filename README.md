# slay-the-dagron
#### Project Unit 1 General Assembly, a java game
![screenshot](/img/slay-the-dagron-deployment1.png "Screenshot of game on local host")
## How to play
Choose an action
* Attack (Spear)
* Defend (Shield)
* Heal (Potion)
* Flee (boots)
* Reset Game (this also runs on page reload)
### How to Win
There are 3 counters in the center of the screen:
    1. Dagron HP, you win when you bring the dragon to 0 or below health. VICTORY will display.
    1. Warrior HP, this is you, the player.  If your health drops to 0 or below you lose. GAME OVER
    1. Villagers Left, they are the reason you fight.  Without anybody to defend, you are lost and GAME OVER.

## How it works
The game renders a new round every time the player makes a choice, a 'click' on the action buttons or icons.
* Spear Attack damages the Dagron if it hits.
* Defend halves incoming damage this round, protects villagers from collapsing buildings.
* Heal restores some warrior HP.
* Fleeing is only for cowards.
The warrior's action resolves, then the Dagron performs a random action.
* Bite Attack only damages the player.
* Tail Attack damages the player and any villagers in the way.
* Flying takes the Dagron out of spear range for the next round.
* Dagron smashing buildings does not hurt the warrior but can cause a lot of casualties.
* Fire breath causes a lot of damage to the Warrior and random villagers, but the dragon must take time to breathe in deeply before it can use fire again.
The game displays the consequences of the player and Dagron actions in the text window, and updates the game state on the counters.  When any of the 3 counters reaches 0 the game is done, whether in victory or defeat.

## How it was built
I wanted to build a combat turn-based game with an art style like a vintage text-based adventure computer game, styled after Dungeons and Dragons using OGL mechanics like attack rolls.
HTML will display the state of the game to the player, arranged with CSS styles that display the text adventure on a background image of the Dagron.
Javascript supplies the interactive language for the game to respond to user input.
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
    2. HEAL= random dragon action(random amount of damage and casualties, check shield=true/false, update dragonMsg), check for loss (cuts out, update message), add health, warriorMsg = "You healed for (number)"
    3. ATTACK= random dragon acion, check for loss, warrior attack(check if flying=true, attack roll, damage roll), subtract damage from dagron.health
    4. DEFEND= set shield= true, random dragon action, if you survive warrior message= "But due to your quick thinking your shield protects you and you take only (number) damage.", check for loss
    5. update the counters
    6. check for victory(update message)
        display "The battle rages, choose again."
    7. At the bottom is a "Reset Game" button that changes
Finally I added a fun easter egg: if you hover over the Dagron picture text displays telling you to click for a sound, and the game plays a Dagron Roar .wav file.
## Accessability Concerns
    1. Checked the background hue vs. font of the least contrasting areas (dark red on tan) into a contrast checking site and achieved 5.7, which exceeds AA compliance to The W3C Web Content Accessibility Guidelines 2.0 [Contrast Test](https://webaim.org/resources/contrastchecker/?fcolor=8B0000&bcolor=DEBF92)
    2. Action buttons for the player: each action button and icon image which are clickable are at least 44pixels on the shortest size, which satisfies
    3. Website functionality is operable by keyboard.

