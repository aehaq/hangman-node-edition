var Letter = require("./Letter.js");

var Word = function(arg) {
    this.answer = arg;
    this.characters = [];
    var letters = arg.split('');
    for (let i = 0; i < letters.length; i++) {
        this.characters.push(new Letter(letters[i]));
    }
    this.disp = function() {
        var string = '';
        for (let i = 0; i < this.characters.length; i++) {
            var chara = this.characters[i];
            string += chara.display();
        }
        return string
    }
    this.check = function(guess) {
        for (let i = 0; i < this.characters.length; i++) {
            var chara = this.characters[i];
            chara.verify(guess);
        }
    }
}

module.exports = Word;