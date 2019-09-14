//-----------------------
// set global variables
//-----------------------

// define secCounter and secStart for masterTimer here so calcScore works when time runs out and with button
// secStart sets number of seconds for masterTimer; secCounter is one second counter
var secCounter;
var secStart = 0;
// cnt keeps track of 'pages'
var cnt = 0;
// answerSummary stores correct and incorrect responses
var answerSummary = [];

console.log("answerSummary @ start = " + answerSummary)
// variables for calculating number of correct, incorrect, and non-answered questions
var numberCorrect = 0;
var numberInCorrect = 0;
var numberNoAnswer = 0;
// set number_questions to number of question asked
var number_questions = 8;

// timer used on each 'page'
function masterTimer( ){
  // secStart = 20;
  secStart = 10;
  secCounter = setInterval(timer , 1000);
  // one second timer
  function timer() {
    secStart -= 1;
    // when timer reaches 0, reset one second timer, add one to page counter (cnt), and call nextPage to show next 'page'
    if (secStart <= 0) {
      clearInterval(secCounter);
      cnt++;
      console.log(cnt);
      console.log("---------------");
      document.getElementById("message").style.display = "none";
      nextPage();
    }
    document.getElementById("timer").innerHTML = (secStart + " seconds left");
  }
}

// determine if question on a 'page' was answered correctly, add response to answerSummary,
//  and display message saying so after hiding question 'page'
function correctAns(qName, coran) {
  var ident = qName;
  var correct = coran;
  answerSummary.push("correct");
  document.getElementById("message").style.display = "block";
  document.getElementById("choice").innerHTML = "correct!";
  document.getElementById("coran").innerHTML = correct;
  document.getElementById(ident).style.display = "none";
}

// determine if question on a 'page' was answered incorrectly, add response to answerSummary,
// and display message saying so after hiding question 'page'
function incorrectAns(qName, coran) {
  var ident = qName;
  var correct = coran;
  answerSummary.push("incorrect");
  document.getElementById("message").style.display = "block";
  document.getElementById("choice").innerHTML = "incorrect.";
  document.getElementById("coran").innerHTML = correct;
  document.getElementById(ident).style.display = "none";
}

// calculate number of correct and incorrect responses using loop and determine number of unanswered question
function calcScore() {
  secStart = 0;
  numberCorrect = 0;
  numberInCorrect = 0;
  numberNoAnswer = 0;
  clearInterval(secCounter);
  console.log("end " + secStart);
  
  if (answerSummary.length === 0) {
    answerSummary = ["a"];
  }
  for (var l = 0; l < answerSummary.length; l++) {
    console.log("l = " + l + " answerSummary{" +l + "} = "+ answerSummary[l]);
    if (answerSummary[l] === "correct") {
      numberCorrect++;
    }
    if (answerSummary[l] === "incorrect") {
      numberInCorrect += 1;
    }
    numberNoAnswer = number_questions - (numberCorrect + numberInCorrect);
  }
  document.getElementById("right").innerHTML = numberCorrect;
  document.getElementById("wrong").innerHTML = numberInCorrect;
  document.getElementById("none").innerHTML = numberNoAnswer;
  }


// sets first question 'page', hiding start 'page', and calls masterTimer
function startMe() {
  cnt = 0;
  answerSummary = [];

  document.getElementById("start").style.display = "none";
  document.getElementById("Q1").style.display = "block";
  document.getElementById("timerDiv").style.display = "block";
  document.getElementById("start-image").style.display = "none";
  document.getElementById("end-image").style.display = "none";
  document.getElementById("heresMagic").style.display = "none";
  document.getElementById("replay").style.display = "none";

  masterTimer();
}

// sets next 'page' based on page count; when last page completed, call score calculator and display results
function nextPage() {
  clearInterval(secCounter);
  masterTimer();
  if (cnt === 1) {
    document.getElementById("Q1").style.display = "none";
    document.getElementById("Q2").style.display = "block";
  }
  else if(cnt === 2) {
    document.getElementById("Q2").style.display = "none"
    document.getElementById("Q3").style.display = "block";
  }
  else if(cnt === 3) {
    document.getElementById("Q3").style.display = "none"
    document.getElementById("Q4").style.display = "block";
  }
  else if(cnt === 4) {
    document.getElementById("Q4").style.display = "none"
    document.getElementById("Q5").style.display = "block";
  }
  else if(cnt === 5) {
    document.getElementById("Q5").style.display = "none"
    document.getElementById("Q6").style.display = "block";
  }
  else if(cnt === 6) {
    document.getElementById("Q6").style.display = "none"
    document.getElementById("Q7").style.display = "block";
  }
  else if(cnt === 7) {
    document.getElementById("Q7").style.display = "none"
    document.getElementById("Q8").style.display = "block";
  }
  else {
    document.getElementById("Q8").style.display = "none"
    document.getElementById("timerDiv").style.display = "none";
    document.getElementById("heresMagic").style.display = "block";
    document.getElementById("end-image").style.display = "block";
    document.getElementById("replay").style.display = "block";
    calcScore();
  }
}