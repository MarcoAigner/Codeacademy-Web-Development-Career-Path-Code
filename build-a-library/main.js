class Media {
    
    constructor(title) {
        this._title = title;
        this._isCheckedOut = false;
        this._ratings = [];
    }

    // Getters

    get title() {
        return this._title;
    }

    get isCheckedOut() {
        return this._isCheckedOut;
    }

    get ratings() {
        return this._ratings;
    }

    // Methods

    getAverageRating() {
        return this._ratings.reduce((accumulator, currentValue) => accumulator + currentValue) / this._ratings.length;
    }

    toggleCheckOutStatus() {
        this._isCheckedOut = !this._isCheckedOut;
    }

    addRating(rating) {
       if(1 <= rating && rating <= 5){this._ratings.push(rating);}
    }

}

class Book extends Media {

    constructor(author, title, pages) {
        super(title);
        this._author = author;
        this._pages = pages;
    }

    // Getters

    get author() {
        return this._author;
    }

    get pages() {
        return this._pages;
    }
}

class Movie extends Media {

    constructor(director, title, runTime) {
        super(title);
        this._director = director;
        this._runTime = runTime;
    }

    // Getters

    get director() {
        return this._director;
    }

    get runTime() {
        return this._runTime;
    }
}

class CD extends Media {
    
    constructor(artist, title, songs) {
        super(title);
        this._artist = artist;
        this._songs = songs;
    }

    // Getters

    get artist() {
        return this._artist;
    }

    get songs() {
        return this._songs;
    }
}

// Testing the Book-Class
const historyOfEverything = new Book('Bill Bryson', 'A Short History of Nearly Everything', 544);
historyOfEverything.toggleCheckOutStatus();
console.log(historyOfEverything.isCheckedOut);
historyOfEverything.addRating(4);
historyOfEverything.addRating(5);
historyOfEverything.addRating(5);
console.log(historyOfEverything.getAverageRating());

// Testing the Movie-Class
const speed = new Movie('Jan de Bont', 'Speed', 116);
speed.toggleCheckOutStatus();
speed.addRating(1);
speed.addRating(1);
speed.addRating(5);
console.log(speed.getAverageRating());