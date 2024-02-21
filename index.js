// ************** DOCUMENT READY WRAPPER **************

$(document).ready(function() {
  var currentEquation;
  var timeLeft = 10;

  // ************** EQUATION GENERATOR **************

  var randomNumberGenerator = function (size) {
    return Math.ceil(Math.random() * size);
  }

  var equationGenerator = function () {
    var question = {};
    var num1 = randomNumberGenerator(10);
    var num2 = randomNumberGenerator(10);

    question.answer = num1 + num2;
    question.equation = String(num1) + " + " + String(num2);

    return question;
  }

  // ************** TIMER COUNTDOWN **************

  var interval = setInterval(function() {
    timeLeft--;
    $('#time').text(timeLeft);
    
    if (timeLeft === 0) {
      clearInterval(interval);
    }
  }, 1000);

  // ************** RENDER NEW EQUATION **************

  var renderNewEquation = function () {
    currentEquation = equationGenerator();
    $('#equation').text(currentEquation.equation);
  }

  // ************** CHECK ANSWER FUNCTION **************

  var checkAnswer = function (userInput, answer) {
    if (userInput === answer) {
      renderNewEquation();
      $('#answer-input').val('');
    }
  }

  $('#answer-input').on('keyup', function() {
    checkAnswer(Number($(this).val()), currentEquation.answer);
  });

  renderNewEquation();
});