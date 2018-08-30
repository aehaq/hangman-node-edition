var inquirer = require('inquirer')
var Word = require('./Word.js')
var options = ['game of thrones', 'friends', 'the simpsons', 'breaking bad', 'the walking dead', 'saturday night live','seinfeld', 'the x files','the office', 'doctor who', 'the sopranos', 'cheers','mad men','adventure time','stranger things'];
var alphabet = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z';
alphabet = alphabet.split(',');
var prevGuess = [];
var guessesLeft;

var target;
var wordSelect = function() {
    var num = Math.floor(Math.random()*options.length);
    target = new Word(options[num]);
}

var wordComplete = function() {
    var complete = true;
    var characters = target.characters;
    for (let i = 0; i < characters.length; i++) {
        if (!characters[i].guessed) {
            complete = false;
        }
    }
    return complete
}

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
            console.log("Thanks for Playing!")
        }
    })
}

var initialize = function() {
    console.log("Try to guess the TV Show!")
    prevGuess = [];
    wordSelect();
    guessesLeft = 12;
    round();
}

var round = function() {
    console.log(target.disp())
    console.log("Guesses Remaining: "+ guessesLeft)
    inquirer.prompt([
        {
            name: "guess",
            message: "Guess a letter:"
        }
    ]).then(function(res){
        var userGuess = res.guess;
        if (prevGuess.includes(userGuess) || !alphabet.includes(userGuess)) {
            console.log("invalid input, try again")
            round()
        } else {
            prevGuess.push(userGuess);
            target.check(userGuess);
            if (wordComplete()) {
                console.log(target.disp());
                console.log("Congratulations, you figured it out!");
                playAgain();
            } else {
                guessesLeft -= 1;
                if (guessesLeft <= 0) {
                    console.log("Sorry, you are out of guesses!");
                    console.log("The answer was: " + target.answer);
                    playAgain();
                } else {
                    round();
                }
            }
        }
    })
}

// initialize game
// empty previous guesses
/// begin game by running word select function

/// consolelog word display and run inquirer function

/// if user inputs a letter that is already chose, or is not valid, 
//// run inquirer function again

/// else
//// run word check function
//// if word.characters are all set to true
///// console log displayed word
///// 
//// else
///// run inquirer function again

initialize();