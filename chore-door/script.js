// DOM-elements

const doorImage1 = document.getElementById('door1');
const doorImage2 = document.getElementById('door2');
const doorImage3 = document.getElementById('door3');
const startButton = document.getElementById('start');

// Image resources
const closedDoorPath = 'https://content.codecademy.com/projects/chore-door/images/closed_door.svg';
const botDoorPath = 'https://content.codecademy.com/projects/chore-door/images/robot.svg';
const beachDoorPath = 'https://content.codecademy.com/projects/chore-door/images/beach.svg';
const spaceDoorPath = 'https://content.codecademy.com/projects/chore-door/images/space.svg';

// Gameplay variables

let openDoor1;
let openDoor2;
let openDoor3;

let numClosedDoors = 3;

let currentlyPlaying = true;


// Randomly assign the images behind each door 
const randomChoreDoorGenerator = () => {
     const choreDoor = Math.floor(Math.random() * numClosedDoors);
     if(choreDoor === 0) {
        openDoor1 = botDoorPath;
        openDoor2 = beachDoorPath;
        openDoor3 = spaceDoorPath;
     } else if(choreDoor === 1) {
        openDoor1 = spaceDoorPath;
        openDoor2 = botDoorPath;
        openDoor3 = beachDoorPath;
     } else if(choreDoor === 2) {
        openDoor1 = beachDoorPath;
        openDoor2 = spaceDoorPath;
        openDoor3 = botDoorPath;
     }
}

// Handle a user's interaction with a door
const playDoor = (door) => {
    numClosedDoors--;
    
    if(numClosedDoors === 0) {
        gameOver('win');
    } else if (isBot(door)) {
        gameOver();
    }

    
}

// Check if choreBot hides behind a clicked door (which will result in a loss)
const isBot = (door) => {
    if(door.src === botDoorPath) {
        return true;
    } else {
        return false;
    }
}

// Checks if a door has already been clicked (to prevent further interaction in this case)
const isClicked = (door) => {
    if(door.src === closedDoorPath) {
        return false;
    } else {
        return true;
    }
}

// Handle door clicks

doorImage1.onclick = () => {
    if(currentlyPlaying && !isClicked(doorImage1)) {
        doorImage1.src = openDoor1;
        playDoor(doorImage1);
    }
};

doorImage2.onclick = () => {
    if(currentlyPlaying && !isClicked(doorImage2)) {
        doorImage2.src = openDoor2;
        playDoor(doorImage2);
    }
};

doorImage3.onclick = () => {
    if(currentlyPlaying && !isClicked(doorImage3)) {
        doorImage3.src = openDoor3;
    playDoor(doorImage3);
    }
};

// Handle start-button clicks
startButton.onclick = ()  => {
    if(!currentlyPlaying) {
        startRound()
    }
};

// Reset the game and start a new round
const startRound = () => {
    numClosedDoors = 3;

    doorImage1.src = closedDoorPath;
    doorImage2.src = closedDoorPath;
    doorImage3.src = closedDoorPath;

    startButton.innerHTML = 'Good Luck!';

    currentlyPlaying = true;

    randomChoreDoorGenerator();
}

// Handle game behaviour when all doors have been opened
const gameOver = (status) => {
    if(status === 'win') {
        startButton.innerHTML = 'You win! Play again?';
    } else {
        startButton.innerHTML = 'Game Over! Play again?';
    }

    currentlyPlaying = false;

}

startRound();