// Guessing game between the computer and a human player.
// Both have to guess a random number between 0 and 9.
// Whoever is closer to the random target number, wins the game.

// Game variables
let humanScore = 0;
let computerScore = 0;
let currentRoundNumber = 1;

//Randomly generate a new secret target number between 0 and 9
function generateTarget() {
    return Math.floor(Math.random() * 10);
}

// Validate the user's input (has to be a digit between 0 and 9)
const validateInput = (humanGuess) => humanGuess >= 0 && humanGuess <= 9 ? true : alert('invalid input');

// Guess the absolute distance between two values
const getAbsoluteDistance = (guess, target) => Math.abs(guess - target);

//Determine, who's guess was closer to the target number
function compareGuesses(humanGuess, computerGuess, target) {

    validateInput(humanGuess);
    
    //Save the "distance" of both guesses from the target value in variables
    let humanDistance = getAbsoluteDistance(humanGuess, target);
    let computerDistance = getAbsoluteDistance(computerGuess, target);
    
    if(humanDistance === computerDistance) { //A tie -> the human wins
        return true;
    } else if(humanDistance < computerDistance) { //the human's guess was closer to the target -> the human wins
        return true;
    } else if(humanDistance > computerDistance) { // the computer's guess was closer to the target -> the computer wins
        return false;
    }
}

// Update the players' scores according to who won last
const updateScore = winner => winner === 'human' ? humanScore++ : computerScore++;

//Increment the round counter
function advanceRound() {
    currentRoundNumber++;
}