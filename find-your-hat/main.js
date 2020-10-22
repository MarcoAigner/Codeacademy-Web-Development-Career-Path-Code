const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';



class Field {

    constructor(field) {
        this._field = field;
        this._lastPosition = [0,0];
    }

    //Methods

    printField() { // Print the current state of the board in a formatted way
        this._field.forEach(row => {
           console.log(row.join().replace(/,/g, ''));
        });
    }

    // Move based on an input character along either the x- or the y-Axis
    move(step) {
        switch(step) {
            
            case 'u':
                this._lastPosition =[this._lastPosition[0], this._lastPosition[1] - 1];
                break;
            
            case 'd':
                this._lastPosition = [this._lastPosition[0], this._lastPosition[1] + 1];
                break;
            
            case 'l':
                this._lastPosition = [this.lastPosition[0] - 1, this._lastPosition[1]];
                break;

            case 'r':
                this._lastPosition = [this.lastPosition[0] + 1, this._lastPosition[1]];
        }
    }

    updateField(newPosition) {
        
    }

    

    // Getter

    get field() {
        return this._field;
    }

    get lastPosition() {
        return this._lastPosition;
    }

    // Setter

    set field(newField) {
        this._field = newField;
    }

    set lastPosition(newLastPosition) {
        this._lastPosition = newLastPosition;
    }
}


// Setting up a field to test with

let field = new Field([
    [pathCharacter, fieldCharacter, hole],
    [fieldCharacter, hole, fieldCharacter],
    [fieldCharacter, hat, fieldCharacter],
])



while(true) {
    step = prompt('Where do you want to move? -> ');
    field.move(step);
    console.log(field.lastPosition);
    field.printField();
}