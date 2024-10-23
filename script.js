let index = 0;
let attempt = 0;
let score = 0;
let wrong = 0;
let numberQuestion = 0;
let totalQuestion = quiz.length;
let questions = quiz.sort(function () {
  return 0.5 - Math.random();
});

$(function () {
  //timer start//
  let totalTime = 1500;
  let min = 0;
  let sec = 0;
  let counter = 0;
  let timer = setInterval(function () {
    counter++;
    min = Math.floor((totalTime - counter) / 60);
    sec = totalTime - min * 60 - counter;

    $(".timerBox span").text(min + ":" + sec);
    //console.log("min = " + min);
    //console.log("sec = "+ sec);

    if (counter == totalTime) {
      clearInterval(timer);
    }
  }, 1000);
  //timer end//

  //untuk pertanyaan//
  printQuestion(index);
});

//fungsi to print question start//
function printQuestion(I) {
  numberQuestion++;
  console.log("nQ = " + numberQuestion);
  $("#nQuestion").text(numberQuestion + "/" + totalQuestion);
  console.log(questions[I].type);
  $(".questionBox").text(questions[I].question);
  if (questions[I].type == "pilihan-ganda") {
    $(".optionBox").removeClass("d-none");
    $(".optionIsian").addClass("d-none");
    $("#span1").text(questions[I].option[0]);
    $("#span2").text(questions[I].option[1]);
    $("#span3").text(questions[I].option[2]);
    $("#span4").text(questions[I].option[3]);
  } else if (questions[I].type == "isian") {
    $(".optionBox").addClass("d-none");
    $(".optionIsian").removeClass("d-none");
    $("#jawabanIsian").focus();
  }
}
//fungsi to print question end//

//check jawaban awal//
function checkAnswer(option) {
  attempt++;

  let optionClicked = $(option).data("opt");

  console.log(optionClicked);

  //console.log(questions[index]);

  if (optionClicked == questions[index].answer) {
    $(option).addClass("right");
    score++;
  } else {
    $(option).addClass("wrong");
    wrong++;
  }

  $(".scoreBox span").text(score);

  $(".optionBox span").attr("onclick", "");
}

function checkAnswerIsian() {
  console.log($("#jawabanIsian").val());

  if ($("#jawabanIsian").val() == "") {
    $("#alert").removeClass("d-none");
  } else {
    attempt++;
    $(".optionIsian").removeClass("input-group");
    $("#checkButton").addClass("d-none");
    $("#alert").addClass("d-none");
    if ($("#jawabanIsian").val() == questions[index].answer) {
      $($("#jawabanIsian")).removeClass("btn-danger");
      $($("#jawabanIsian")).removeClass("btn-light");
      $($("#jawabanIsian")).addClass("btn-success");
      score++;
    } else {
      $($("#jawabanIsian")).addClass("btn-danger");
      $($("#jawabanIsian")).removeClass("btn-light");
      $($("#jawabanIsian")).removeClass("btn-success");
      wrong++;
    }
  }

  $(".scoreBox span").text(score);

  $(".optionBox span").attr("onclick", "");
}

//check jawaban akhir//

//function for next button awal//

function showNext() {
  $("#jawabanIsian").val("");
  $("#jawabanIsian").removeClass("btn-danger");
  $("#jawabanIsian").removeClass("btn-success");
  $("#jawabanIsian").addClass("btn-light");
  $("#jawabanIsian").focus();
  $("#alert").addClass("d-none");
  $("#checkButton").removeClass("d-none");
  $(".optionIsian").addClass("input-group");
  if (index >= questions.length - 1) {
    showResult(0);
    return;
  }
  index++;

  $(".optionBox span").removeClass();
  $(".optionBox span").attr("onclick", "checkAnswer(this)");
  printQuestion(index);
}

//function for next button akhir//
function showResult(j) {
  if (
    j == 1 &&
    index < questions.length - 1 &&
    !confirm(
      "Sorry You haven't completed your answer. Press OK to skip your placement test."
    )
  ) {
    return;
  }

  $("#questionScreen").hide();
  $("#resultScreen").show();

  $("#totalQuestion").text(totalQuestion);
  $("#attemptQuestion").text(attempt);
  $("#correctAnswer").text(score);
  $("#wrongAnswer").text(wrong);
}

//function for result awal//
