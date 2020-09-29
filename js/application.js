var max = 10;
var correct;
var operators = ['+']

var score = 0;
var hScore = 0;

var timer = null;
var start = 0;
var seconds = 10;
var duration;

var win = ['Nice!', 'Good job!', 'WOOHOO!!!', 'Aw yeah!', 'Nailed it!', 'Solid!', 'You did it!', 'GENIUS', 'Algebraic!', 'Hyperbolic!', 'Sick Math skillz'];
var warn = ['Hurry up!!!', 'Cuttin\' it close!', 'Watch out!!'];
var lose = ['Oof!', 'Better luck next time!', 'Ouch!', 'Woops!'];

var textPop =  function (state) {
  var text = _.sample(state);
  var color;
  var width = _.sample([(window.innerWidth/3), (window.innerWidth*(2/3))]);
  var height = _.sample([(window.innerHeight/3), (window.innerHeight*(2/3))]);;
  var x = Math.floor(Math.random() * (width));
  var y = Math.floor(Math.random() * (height));

  console.log(x, y);
  switch (state) {
    case (win) : color = 'green'; break;
    case (warn) : color = 'orange'; break;
    case (lose) : color = 'red'; break;
  }
  var element = $('<p class="font-weight-bold d-fixed">'+text+'</p>');
  element.css({
    fontSize: '24px',
    position: 'absolute',
    top: y,
    left: x,
    color: color,
  });
  element = $(element).appendTo('body');
  element.fadeOut(2000);
}

var updateScore = function () {
  var current = $('#score p').first();
  var best = $('#score p').last();
  if (score > hScore) {
    hScore = score;
  }
  current.text('Current Score: '+score);
  best.text('High Score: '+hScore);
}

var newEquation = function () {
  var num1 = _.sample(_.range(1, max));
  var num2 = _.sample(_.range(1, max));
  var op = _.sample(operators);
  correct = eval(num1 + op + num2);
  $('#equation').text(num1 + ' ' + op + ' ' + num2);
  $('#ui input:first-child').val('');
}

var opCheck = function (op) {return _.contains(operators, op);};

var removeOp = function (op) {
  var opIndex = operators.indexOf(op);
  if (opIndex !== 0) {
    operators = operators.slice(0, opIndex).concat(operators.slice(opIndex + 1));
  } else if (opIndex === operators.length - 1) {
    operators.pop();
  } else {
    operators.shift();
  }
};

var startTimer = function () {
  if(!timer) {
    start = Date.now() - duration;
    timer = setInterval(function () {
      duration = Date.now() - start;
      seconds--;
      $('#timer span').text(seconds);
      if (seconds === 5) {
        textPop(warn);
      }
      if (seconds === 0) {
        textPop(lose);
        stopTimer();
        score = 0;
        updateScore();
        newEquation();
      }
    }, 1000);
  }
};

var stopTimer = function () {
  window.clearInterval(timer);
  seconds = 10;
  $('#start, #skip').toggleClass('d-none');
  $('#timer span').text(10);
  start = 0;
  timer = null;
};

$(document).ready(function (){

  newEquation();

  $('#max').mousemove(function(){
    max = $(this).val();
    $(this).next('p').text(max);
  });

  $('#start').click(function(){
    $('#start, #skip').toggleClass('d-none');
    startTimer();
  });

  $('#skip').click(function(){
    newEquation();
  });

  $('#operators input').change(function(){
    var op = $(event.target).prev('label').text();
    if ($(event.target).prop('checked') && !opCheck(op)) {
      operators.push(op);
    } else if (!$(event.target).prop('checked') && opCheck(op)) {
      removeOp(op);
    }
  });

  $('#ui input:first-child').on('input', function(){
    if (start === 0) {
      $(this).val('');
    }
    if (Number($(this).val()) === correct) {
      textPop(win);
      ++score;
      updateScore();
      ++seconds;
      newEquation();
    }
  });

});
