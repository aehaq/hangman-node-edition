var Letter = function(chara) {
    this.chara = chara;
    if (chara === " ") {
        this.guessed = true;
    } else {
        this.guessed = false;
    };
    this.display = function() {
        if (this.guessed) {
            return this.chara
        } else {
            return "_"
        }
    };
    this.verify = function(guess) {
        if (guess === this.chara) {
            this.guessed = true;
        }
    }
}

module.exports = Letter;