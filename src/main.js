import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(document).ready(function() {
  let dinosaurs = [];
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
    dinosaurs = JSON.parse(response)[0];
    console.log(dinosaurs);
  },  function(error) {
    $('.showError').text(`There was an error processing your request: ${error.message}`);
  });

//   let targetName = dinosaurs[Math.floor(Math.random()*dinosaurs.length)];    
});
