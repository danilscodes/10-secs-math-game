// ************** DOCUMENT READY WRAPPER **************

$(document).ready(function() {
  var currentEquation;
  var interval;
  var timeLeft = 10;
  var currentScore = 0;
  var highScore = 0;

  // ************** TIMER COUNTDOWN **************

  var updateTimeLeft = function (amount) {
    timeLeft += amount;
    $('#time-left').text(timeLeft);
  };

  // ************** UPDATE CURRENT SCORE **************

  var updateCurrentScore = function (amount) {
    currentScore += amount;
    $('#current-score').text(currentScore);
  };

  // ************** UPDATE HIGH SCORE **************

  var updateHighScore = function (currentScore) {
    if (currentScore > highScore) {
      highScore = currentScore;
      $('#high-score').text(highScore);
    }
  };

  // ************** START GAME FUNCTION **************

  var startGame = function () {
    if (!interval) {
      if (timeLeft === 0) {
        updateTimeLeft(10);
        updateHighScore(currentScore);
        updateCurrentScore(-currentScore);
      } else {
        interval = setInterval(function() {
          updateTimeLeft(-1);
          if (timeLeft === 0) {
            clearInterval(interval);
            interval = undefined;
            $('#equation').text('GAME OVER');
            $('#answer-input').prop('disabled', true);
          }
        }, 1000);
      }
    }
  };

  // ************** EQUATION GENERATOR **************

  var randomNumberGenerator = function (size) {
    return Math.ceil(Math.random() * size);
  };

  // ***** MULTIPLE Q TYPES *****

  var getSelectedOperators = function () {
    var selectedOperators = [];
    $('#question-types input:checked').each(function() {
      selectedOperators.push($(this).val());
    });
    return selectedOperators;
  };

  var getRandomOperator = function () {
    var operators = getSelectedOperators();
    var randomIndex = Math.floor(Math.random() * operators.length);
    return operators[randomIndex];
  };

  // ****************************

  var equationGenerator = function () {
    var question = {};
    var num1 = randomNumberGenerator(10);
    var num2 = randomNumberGenerator(10);
    var operator = getRandomOperator();

    switch (operator) {
      case '+':
        question.answer = num1 + num2;
        break;
      case '-':
        if (num2 > num1) {
          question.answer = num2 - num1;
        } else {
          question.answer = num1 - num2;
        };
        break;
      case '*':
        question.answer = num1 * num2;
        break;
      case '/':
        num2 = num2 === 0 ? 1 : num2;
        num1 = num1 * num2;
        question.answer = num1 / num2;
        break;
      default:
        break;
    }

    if (operator === '-' && num2 > num1) {
      question.equation = String(num2) + ' ' + operator + ' ' + String(num1);
    } else {
      question.equation = String(num1) + ' ' + operator + ' ' + String(num2);
    }

    return question;
  };

  // ************** RENDER NEW EQUATION FUNCTION **************

  var renderNewEquation = function () {
    currentEquation = equationGenerator();
    $('#equation').text(currentEquation.equation);
  };

  // ************** CHECK ANSWER FUNCTION **************

  var checkAnswer = function (userInput, answer) {
    if (userInput === answer) {
      renderNewEquation();
      $('#answer-input').val('');
      updateTimeLeft(+1);
      updateCurrentScore(+1);
    }
  };

  $('#answer-input').on('keyup', function () {
    startGame();
    checkAnswer(Number($(this).val()), currentEquation.answer);
  });

  // ************** RESTART BUTTON **************

  $('#play-button').on('click', function () {
    renderNewEquation();
    $('#answer-input').prop('disabled', false);
    $('#answer-input').val('');
    updateHighScore(currentScore);
    startGame();
  });

  // ************** REFRESH EQUATION **************

  renderNewEquation();
});