// Global scope variables

let whoPlays = Math.random() < 0.5 ? 'x' : 'o';
let occupied = {};
let vsComputer = false;
let audioMuted = true;

// Setting up start screen after DOM loaded
document.addEventListener('DOMContentLoaded', function() {

    let mainMenu = document.getElementById('main-menu');
    let mainMenuBtn = document.getElementById('main-menu-btn');
    let gameSection = document.getElementById('game-section');
    let startBtn = document.getElementById('start-btn');
    let settingsSection = document.getElementById('settings-section');

    // Adding event listeners to buttons

    document.getElementById('reload-page').addEventListener('click', function(){ // Refresh icon
        location.reload();
    })

    document.getElementById('sounds-btn').addEventListener('click', function(){ // Sounds button
        if(audioMuted === true){
            this.style.border = '1px solid black';
            this.innerHTML = 'Sounds(On)';
            audioMuted = false;
        }
        else if(audioMuted === false){
            this.style.border = 'none';
            this.innerHTML = 'Sounds(Off)';
            audioMuted = true;
        }
    })

    startBtn.addEventListener('click', function(){ // "Start" / "Rematch" button
        if (mainMenu.style.display === 'block' && occupied !== {}){
            mainMenu.style.display = 'none';
            mainMenuBtn.style.display = 'block';
            gameSection.style.display = 'flex';
            settingsSection.style.display = 'block';
            document.getElementById('game-heading').innerHTML = `${whoPlays.toUpperCase()} plays!`;
            startBtn.innerHTML = 'rematch';
        }
        else {
            document.getElementById('game-heading').style.animation = 'none'; // Reset blink animation
            runGame();
        }
    })
    gameSection.style.display = 'none';
    mainMenuBtn.style.display = 'none';

    mainMenuBtn.addEventListener('click', function(){ // "?" button
        mainMenu.style.display = 'block';
        gameSection.style.display = 'none';
        mainMenuBtn.style.display = 'none';
        settingsSection.style.display = 'none';
        document.getElementById('game-heading').innerHTML = 'Tic Tac Toe';
        startBtn.innerHTML = 'continue';
    })

    document.getElementById('vs-computer-btn').addEventListener('click', function(){ // "VS computer" button
        this.style.border = '1px solid black'
        document.getElementById('two-player-btn').style.border = 'none'
        vsComputer = true;
        resetScore();
        runGame();
    });

    document.getElementById('two-player-btn').style.border = '1px solid black';
    document.getElementById('two-player-btn').addEventListener('click', function(){ // "2 Player" button
        this.style.border = '1px solid black'
        document.getElementById('vs-computer-btn').style.border = 'none'
        vsComputer = false;
        resetScore();
        runGame();
    });
});


/**
 * Resets the scores to
 * 0 and sets their styling to black
 */
function resetScore(){
    document.getElementById('x-score').innerHTML = '0';
    document.getElementById('x-score').style.color = 'black';
    document.getElementById('o-score').innerHTML = '0';
    document.getElementById('o-score').style.color = 'black';
}

/**
 * The main function of the game which invokes
 * all other functions
 */
function runGame(){
    // Displaying game section and hiding main menu
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('main-menu-btn').style.display = 'block';
    document.getElementById('game-section').style.display = 'flex';
    document.getElementById('settings-section').style.display = 'block';
    occupied = {};

    let grid = document.getElementsByClassName('cell');
    document.getElementById('game-heading').innerHTML = `${whoPlays.toUpperCase()} starts!`

    document.getElementById('start-btn').innerHTML = 'rematch';

    // Adding event listeners to grid cells
    for(let cell of grid){

        cell.innerHTML = '';

        cell.removeEventListener('click', placeMarker);
        cell.addEventListener('click', placeMarker);
    }
}

/**
 * Places the current players marker in the grid,
 * invokes computerPlays() if vsComputer === true,
 * invokes checkWin()
 */
function placeMarker(){

    if (this.innerHTML === 'x' || this.innerHTML === 'o'){ // Handle player clicking occupied cell

        if(audioMuted === false){ // Play error sound
            document.getElementById('error').play();
        }

        alert('That cell is busy! Please pick another one');
        return;
    }
    this.innerHTML = whoPlays;

    if(audioMuted === false){ // Play scribble sound
        document.getElementById('scribble').play();
    }

    occupied[this.id] = whoPlays;

    whoPlays = whoPlays === 'x' ? 'o' : 'x';

    document.getElementById('game-heading').innerHTML = `${whoPlays.toUpperCase()} plays!`;

    if (checkWin() === true){ // Aborting if there is a winner
        if (vsComputer === true){
            whoPlays = whoPlays === 'x' ? 'o' : 'x';
        }
        return;
    }

    if (vsComputer === true){ // Computer plays if chosen
        computerPlays();
    }
}

/**
 * Handles computer players turn
 * using Math.random()
 */
function computerPlays(){
    let occupiedArray = [];
    let cellToPlace;

    for (let cell in occupied){
        occupiedArray.push(parseInt((cell[cell.length - 1])));
    }
    while(true){

        if (occupiedArray.length === 9){ // Aborting if game end in draw
            break;
        }

        cellToPlace = Math.floor(Math.random() * 9) + 1; // Choosing a cell to place marker
        if (!occupiedArray.includes(cellToPlace)){ // Breaking when unoccupied cell chosen
            break;
        }
    }

    // Placing marker in cell and checking for win
    document.getElementById(`index-${cellToPlace}`).innerHTML = whoPlays;
    occupied[document.getElementById(`index-${cellToPlace}`).id] = whoPlays;
    whoPlays = whoPlays === 'x' ? 'o' : 'x';
    document.getElementById('game-heading').innerHTML = `${whoPlays.toUpperCase()} plays!`;
    checkWin();
}

/**
 * Checks if a player has won the game
 * @returns true if there is a winner
 * Handles case of game ending in a draw
 */
function checkWin(){
    // Define winning combinations
    let winCombos = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ];
    
    let x = [];
    let o = [];

    // Making array of occupied cells for easy matching
    for (let key in occupied){
        if (occupied[key] === 'x') {
            x.push(parseInt(key[key.length - 1]));
        }
        else if (occupied[key] === 'o') {
            o.push(parseInt(key[key.length - 1]));
        }
    }

    // Handles game won
    function handleWin(winner){

        let grid = document.getElementsByClassName('cell');

        if(winner === 'draw'){ // Handle game end in draw
            document.getElementById('game-heading').innerHTML = "It's a draw! D:";
            for(let cell of grid){
                cell.removeEventListener('click', placeMarker)
            }
            return;
        }

        if(audioMuted === false){ // Play wingame sound
            document.getElementById('wingame').play();
        }

        document.getElementById('game-heading').innerHTML = `${winner.toUpperCase()} won this game! :D`;
        document.getElementById('game-heading').style.animation = 'blink 5s'; // Start blink animation

        incrementScore(winner);
        
        for(let cell of grid){
            cell.removeEventListener('click', placeMarker)
        }

    }
    // Checking if occupied cells match winning combinations (for player X)
    for (let combo of winCombos){
        let result = combo.every(num => x.includes(num));
        if (result === true) {
            handleWin('x');
            return true;
        }
    }
    // Checking if occupied cells match winning combinations (for player O)
    for (let combo of winCombos){
        let result = combo.every(num => o.includes(num));
        if (result === true) {
            handleWin('o')
            return true;
        }
    }
    // Checking if game end in draw
    if(x.length + o.length === 9){
        handleWin('draw');
    }

}

/**
 * Increments the winning players score and
 * adjusts the styling of score headings
 */
function incrementScore(winner){
    // Increment score of winner
    let score = winner === 'x' ? document.getElementById('x-score') : document.getElementById('o-score');
    let oppScore = winner === 'x' ? document.getElementById('o-score') : document.getElementById('x-score');
    scoreNum = parseInt(score.innerHTML);
    oppScoreNum = parseInt(oppScore.innerHTML);
    scoreNum += 1;
    score.innerHTML = scoreNum;

    // Adjust styling based on highest score
    if (scoreNum > oppScoreNum){
        score.style.color = 'green';
        oppScore.style.color = 'red';
    } else if (scoreNum < oppScoreNum){
        score.style.color = 'red';
        oppScore.style.color = 'green';
    } else {
        score.style.color = 'black';
        oppScore.style.color = 'black';
    }
}