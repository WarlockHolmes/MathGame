var max = 10;
var correct;
var operators = ['+']
var score = 0;
var hScore = 0;

var updateScore = function () {
  var current = $('#score p:first-child');
  var best = $('#score p:last-child');
  if (score > hScore) {
    hScore = score;
  }
  current.text('Score: '+score);
  best.text('High Score: '+hScore);
}

var newEquation = function () {
  var num1 = _.sample(_.range(1, max));
  var num2 = _.sample(_.range(1, max));
  var op = _.sample(operators);
  correct = eval(num1 + op + num2);
  $('#equation').text(num1 + ' ' + op + ' ' + num2);
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

$(document).ready(function (){

  newEquation();

  $('#start').click(function(){
    $('#start, #skip').toggleClass('d-none');
  });

  $('#skip').click(function(){
    newEquation();
    $('#ui input:first-child').val('');
  });

  $('#operators input').change(function(){
    var op = $(event.target).prev('label').text();
    if ($(event.target).prop('checked') && !opCheck(op)) {
      operators.push(op);
    } else if (!$(event.target).prop('checked') && opCheck(op)) {
      removeOp(op);
    }
  });
  $('#ui input:first-child').keypress(function(){
    if (event.key === "Enter" && Number($(this).val()) === correct) {
      ++score;
      updateScore();
      $(this).val('');
      newEquation();
    }
  });

});
