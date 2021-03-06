var body_part;

$.getJSON("data/information.json", function(data)
{
    $("#welcome").append("Welcome " + data.first_name + " " + data.last_name);
});

$('.speech-form').on('submit', function () {
    var speech = $('#speech_text').val();
    speak(speech);
    return false;
});

function callNurse() {
  speak("Calling nurse");
  $("#content").fadeOut( "fast");
  $("#pain_scale").fadeOut("fast");
  $("#pain_panel").fadeOut("fast");
  $( "#call_nurse" ).show(1000, function() {
    $("#nurse_button").attr("aria-hidden","true");
    $(this).delay(5000).fadeOut("slow", function() {
      $("#content").fadeIn();
      $("#nurse_button").attr("aria-hidden","false");
    });
 });
}

function cancelPain(cancel) {
  $("#pain_scale").fadeOut("fast", function() {
    $("#pain_panel").fadeOut("fast", function() {
      $("#content").fadeIn();
    });
  });
}

function pain(part) {
  body_part = part;
  $( "#content" ).fadeOut("fast", function() {
    $("#pain_panel").fadeOut("fast", function() {
        $("#pain_scale").show(1000);
    });
  });
}

function painScale(number) {
  var scaleID = "#pain"+number;
  $("#pain_scale").fadeOut("fast", function() {
    var pain = "<br><br><h1> "+ body_part + " Pain </h1>";
    var scale = "<br><h1> Scale: " + "</h1><br><br>";
    $("#pain_headers").empty();
    $("#pain_headers").append(pain);
    $("#pain_headers").append(scale);
    $(scaleID).show("fast");
    $("#pain_panel").show(1000, function(){
      speak("My " + body_part + " hurts and the pain scale is " + number);
      $(this).delay(4000).fadeOut("slow", function() {
        $(scaleID).hide();
        $("#content").fadeIn();
      });
    });
  });
}

function need(action) {
  var message = "I need " + action;
  $( "#content" ).fadeOut("fast", function() {
    var need = "<h1> "+ message + " </h1>";
    var img = "<br><br><br><img src='../img/callnurse.png'>"
    $("#need_photo").empty();
    $("#need_photo").append(img);
    $("#need_headers").empty();
    $("#need_headers").append(need);
    $("#need_panel").show("slow", function() {
        speak(message);
        $(this).delay(4000).fadeOut("slow", function() {
          $("#content").fadeIn();
        });
    });
  });
}

function feeling(emotion) {
  var message = "I feel " + emotion;
  var picture = emotion + ".png";
  $("#content").fadeOut("fast", function() {
    var feeling = "<h1> "+ message + " </h1>";
    var img = "<br><br><br><img style='width:150px;height:150px' src='../img/" + picture + "'>";
    $("#feeling_photo").empty();
    $("#feeling_photo").append(img);
    $("#feeling_headers").empty();
    $("#feeling_headers").append(feeling);
    $("#feeling_panel").show("slow", function(){
      speak(message);
      $(this).delay(4000).fadeOut("slow", function() {
        $("#content").fadeIn();
      });
    });
  });
}

function control(object) {
  var picture = object.replace(" ", "_")+".png";
  $("#content").fadeOut("fast", function() {
    var action = "<h1> "+ object + " </h1>";
    var img = "<br><br><br><img style='width:150px;height:150px' src='../img/" + picture + "'>";
    $("#control_photo").empty();
    $("#control_photo").append(img);
    $("#control_headers").empty();
    $("#control_headers").append(action);
    $("#control_panel").show("slow", function() {
      console.log("SHOWING");
      $(this).delay(4000).fadeOut("slow", function() {
        $("#content").fadeIn();
      });
    });
  });
}

function speak(message) {
  var msg = new SpeechSynthesisUtterance(message);
  msg.rate = 1;
  window.speechSynthesis.speak(msg);
  var voices = window.speechSynthesis.getVoices();
  // console.log(voices);
}
