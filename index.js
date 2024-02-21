// ************** DOCUMENT READY WRAPPER **************

$(document).ready(function() {
  // ************** EQUATION GENERATOR **************
  var currentEquation;

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