var inquirer = require('inquirer')
var Word = require('./Word.js')
var options = ['game of thrones', 'friends', 'the simpsons', 'breaking bad', 'the walking dead', 'seinfeld', 'the x files','the office', 'doctor who', 'the sopranos', 'cheers','mad men','adventure time','stranger things'];
var alphabet = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z';
alphabet = alphabet.split(',');
var prevGuess = [];
var guessesLeft;

var target;

// Functions for the game

// Selects a random word from the list of options, then calls the Word constructor on it.
var wordSelect = function() {
    var num = Math.floor(Math.random()*options.length);
    target = new Word(options[num]);
}

// Cycles through the characters in the word object and checks if each one has been guessed.
var wordComplete = function() {
    // we set a variable stating that the word is completely guessed.
    var complete = true;
    var characters = target.characters;
    for (let i = 0; i < characters.length; i++) {
        // If any characters have not been guessed, we change the variable defined above to false
        if (!characters[i].guessed) {
            complete = false;
        }
    }
    // We return whether or not the word has been completely guessed.
    return complete
}

// We call this function when the game ends, to ask if the user would like to play again.
var playAgain = function () {
    inquirer.prompt([
        {
            name: "replay",
            message: "Play Again?",
            type: "confirm"
        }
    ]).then(function(res){
        if (res.replay) {
            initialize();
        } else {
            console.log("Thanks for Playing!\n")
        }
    })
}

// This initializes the game, creating a new word object, setting trackers back to default and beginning the first round.
var initialize = function() {
    console.log("Try to guess the TV Show!\n")
    prevGuess = [];
    wordSelect();
    guessesLeft = 12;
    round();
}

// This function is called once at the beginning of the game, and it calls itself every time a guess has been made but the game is not over.
var round = function() {
    console.log("\n");
    console.log(target.disp());
    console.log("Guesses Remaining: "+ guessesLeft);
    inquirer.prompt([
        {
            name: "guess",
            message: "Guess a letter:"
        }
    ]).then(function(res){
        var userGuess = res.guess;
        // Checks the users guess to see if it is invalid, or if it has already been guessed.
        // If so, we move to the next round.
        if (prevGuess.includes(userGuess) || !alphabet.includes(userGuess)) {
            console.log("invalid input, try again\n")
            round()
        } else {
            prevGuess.push(userGuess);
            target.check(userGuess);
            if (wordComplete()) {
                console.log(target.disp());
                console.log("Congratulations, you figured it out!\n");
                playAgain();
            } else {
                guessesLeft -= 1;
                if (guessesLeft <= 0) {
                    console.log("Sorry, you are out of guesses!\n");
                    console.log("The answer was: " + target.answer +"\n");
                    playAgain();
                } else {
                    round();
                }
            }
        }
    })
}

initialize();