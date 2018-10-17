import {Hangman} from "../src/dino-hangman.js";

describe("Hangman class test", function() {
    let targetWord;
    let hangman;

    beforeEach(function() {
        targetWord = "Hello world";
        hangman = new Hangman(targetWord);
    });

    it("should return the result of guessing.", function() {
        let result = hangman.guessLetter("e");
        expect(result).toEqual(true);
    });

    it("should decrease the number of lives if entered letter is not in the target word", function() {
        let result = hangman.guessLetter("z");
        expect(result).toEqual(false);
        expect(hangman.life).toEqual(6);
    });

    it("should return false if user enters same letter again", function(){
        let result1 = hangman.guessLetter("e");
        expect(result1).toEqual(true);
        let result2 = hangman.checkDuplicate("e");
        expect(result2).toEqual(false);
    });

    // it("should replace blanks with actual letters if user guessed correctly.", function() {

    // });

    // it("If user tries entering duplicate letters, program will tell user to try again.", function() {

    // });
});