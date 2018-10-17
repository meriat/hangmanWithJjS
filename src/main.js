import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Hangman } from "./dino-hangman.js";

$(document).ready(function() {

  let mood = "gameover";
  function callApi() {
    $.ajax({
        url: `https://api.giphy.com/v1/gifs/random?api_key=pq4bbnDfNiufadbSHigllyqkIC228kfb&tag=${mood}&rating=G`,
        type: 'GET',
        data: {
            format: 'json'
        },
        success: function (response) {
            $("#gameover").append(`<img src=${response.data.images.fixed_height_downsampled.url} alt="some random gif">`);

        },
        error: function () {
            $('#errors').text("there was an error processing your request. Please try again!!!!");
        }
    });
}

  let Promise = require('es6-promise').Promise;
  let promise = new Promise(function(resolve, reject){
    let request = new XMLHttpRequest();
    const countParagraph = 1;
    const countWord = 10;
    let url = `http://dinoipsum.herokuapp.com/api/?format=json&paragraphs=${countParagraph}&words=${countWord}`;
    request.onload = function() {
      if(this.status === 200) {
        resolve(request.response);
      } else {
        reject(Error(request.statusText));
      }
    };
    request.open("GET", url, true);
    request.send();
  });
    
  promise.then(function(response) {
    let dinosaurs = JSON.parse(response)[0];
    let targetName = dinosaurs[Math.floor(Math.random()*dinosaurs.length)];
    let hangman = new Hangman(targetName);
    
    for (let i=0; i<targetName.length; i++) {
      $("#letters").append(`<span id='index${i}'>_&nbsp;</span>`);
      //<span id='index0'>_</span>
    }
    update(hangman);
    console.log(targetName);

    $("#guess").submit(function(event) {
      event.preventDefault();
      $('.showError').text("");
      
      let letterInput = $("#guessLetter").val();
      
      if(hangman.checkDuplicate(letterInput) === false){
        $('.showError').text("Duplicate letter.");
      }
      else {
        let letterGuessResult = hangman.guessLetter(letterInput);
        if (letterGuessResult === true) {
          hangman.matchedIndice.forEach(function(correctLetterIndex) {
            $(`#index${correctLetterIndex}`).text(hangman.targetWord.charAt(correctLetterIndex));
          });
        } 
        else {
          if(hangman.life === 0) {
            $('.page').hide();
            callApi();
          }
        }
        update(hangman);
      }
    });
  },  function(error) {
    $('.showError').text(`There was an error processing your request: ${error.message}`);
  });
   
});

function update(hangman) {
  $("#life").text(hangman.life);
  $("#guessedLetters").text(hangman.guess);
}