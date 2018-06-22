$(document).ready(function () {
  
  var marvelQuestion = [{
    question: "Dr. Bruce Banner is also known as waht hero?",
    choices: ["The Hulk", "Thor", "Dr. Strange", "Deadpool" ],
    validAnswer: 0
    }, {
    question:"What is Thor's weapon of choice?",
    choices: ["An Axe", "A Hammer", "A Cane", "Rocket Launcher"],
    validAnswer: 1
    
    }, {
    question:"Captain America fought in what war?",
    choices: ["World War 1", "Civil War", "Vietnam War" , "World War 2"],
    validAnswer: 3
    
    }, {
    question:"How many Infinity Stones are there?",
    choices: ["2", "5", "7", "9"],
    validAnswer: 1
    
    }, {
    question:"Scarlet Witch is in a relationshop with what hero?",
    choices: ["Vision", "Star Lord", "Hawkeye", "Falcon"],
    validAnswer: 0
    
     }, {
    question:"Groot is a member of what group?",
    choices: ["The Avengers", "Hydra", "The Gurdians of the Galaxy", "The Defenders"],
    validAnswer: 2
    
    }, {
    question:"What color is the Power Stone?",
    choices: ["Yellow", "Blue", "Purple", "White"],
    validAnswer: 2
    
    }, {
    question:"Who is Loki's adopted father?",
    choices: ["Thor", "Heimdall", "Surtur", "Odin"],
    validAnswer: 3
    }];
  
  var correctCount = 0;
  var wrongCount = 0;
  var unanswerCount = 0;
  var timer = 20;
  var intervalId;
  var userGuess ="";
  var running = false;
  var qCount = marvelQuestion.length;
  var pick;
  var index;
  var newArray = [];
  var holder = [];
  
  
  
  $("#reset").hide();
  
  $("#start").on("click", function () {
      $("#start").hide();
      displayQuestion(Math.floor(Math.random() * 7) + 0 );
      runTimer();
      for(var i = 0; i < marvelQuestion[i].choices.length; i++) {
    holder.push(marvelQuestion[i].choices);
  }
    })
  
  function runTimer(){
    if (!running) {
    intervalId = setInterval(decrement, 1000); 
    running = true;
    }
  }
  
  function decrement() {
    $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
    timer --;
  
    
    if (timer === 0) {
      unanswerCount++;
      stop();
      $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
      hidepicture();
    }	
  }
  
  
  function stop() {
    running = false;
    clearInterval(intervalId);
  }
  
  function displayQuestion(i) {
  
    index = Math.floor(Math.random()*marvelQuestion[i].choices.length);
    pick = marvelQuestion[index];
  
  
      $("#questionblock").html("<h2>" + pick.question + "</h2>");
      for(var i = 0; i < pick.choices.length; i++) {
        var userChoice = $("<div>");
        userChoice.addClass("answerchoice");
        userChoice.html(pick.choices[i]);
        
        userChoice.attr("data-guessvalue", i);
        $("#answerblock").append(userChoice);
  //		}
  }
  
  
  
  
  $(".answerchoice").on("click", function () {
    
    userGuess = parseInt($(this).attr("data-guessvalue"));
  
    
    if (userGuess === pick.answer) {
      stop();
      correctCount++;
      userGuess="";
      $("#answerblock").html("<p>Correct!</p>");
      hidepicture();
  
    } else {
      stop();
      wrongCount++;
      userGuess="";
      $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choices[pick.answer] + "</p>");
      hidepicture();
    }
  })
  }
  
  
  function hidepicture () {
    $("#answerblock").append("<img src=" + pick.photo + ">");
    newArray.push(pick);
    marvelQuestion[index].choices.splice(index,1);
  
    var hidpic = setTimeout(function() {
      $("#answerblock").empty();
      timer= 20;
  
    
    if ((wrongCount + correctCount + unanswerCount) === qCount) {
      $("#questionblock").empty();
      $("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
      $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
      $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
      $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
      $("#reset").show();
      correctCount = 0;
      wrongCount = 0;
      unanswerCount = 0;
  
    } else {
      runTimer();
      displayQuestion();
  
    }
    }, 3000);
  
  
  }
  
  $("#reset").on("click", function() {
    $("#reset").hide();
    $("#answerblock").empty();
    $("#questionblock").empty();
    for(var i = 0; i < holder.length; i++) {
      choices.push(holder[i]);
    }
    runTimer();
    displayQuestion();
  
  })
  
  })