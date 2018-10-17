export class Hangman {
    constructor(targetWord) {
        this.targetWord = targetWord;
        this.life = 7;
        this.guess = [];
        this.matchedIndice = [];
    }

    guessLetter(letter) {
        //target word = "Hello"
        //letter = "l"
        // this.guess = ["l"]
        // this.matchedIndice = [2, 3];
        // letter = "a"
        // this.guess = ["l", "a"]
        //this.matchedIndice = [2, 3];
        let regex = RegExp(letter, 'g');
        let matchedIndiceTemp = [];
        this.guess.push(letter);
        while (returnedArr = regex.exec(this.targetWord) !== null) {
            matchedIndiceTemp.push(regex.lastIndex-1);
        }
        if(!matchedIndiceTemp.length === 0) {
            matchedIndiceTemp.forEach(function(index) {
                this.matchedIndice.push(index);
            });
            return true;
        }
        else {
            this.life--;
            return false;
        }
    }
}

