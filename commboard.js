/**
 * Created by ylh on 14-03-13.
 */
var CB = (function CB() {

  var debugMessage = "(space)=click | s=select | p=pause on/off | v=voice over simulation on/off",
    clientTxt = "",
    inc = 0,
    buttonText = [],
    nRows = 6,
    nCols = 6,
    nStates = 2, // not used
    pauseState = false,
    soundOn = false,
    selectPressed = false,
    inSetup = false,
    highlightRow = -1,
    selectedRow = -1,
    highlightButton = -1,
    state = 0,
    buttonPresented = 0,
    debouncetime = 300,
    timeToNextRow = 1000,
    timeToNextCol = 1000,
    adjustableDelay = 1000,
    rowDoneTimes = 0,
    maxRowDoneTimes = 2,
    nVideoSetup = 0,
    Debugging = false;

  // state:: 0=cycle row, 1=cycle column



  var dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  var today = new Date();
  var theDay = dayOfWeek[(new Date()).getDay()];

  var startTime = function startTime() {
    today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    // add a zero in front of numbers<10
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    document.getElementById('timeDisplay').innerHTML = theDay +
      "<br>" + h + ":" + m + ":" + s;
    document.getElementById('clientTxt').innerHTML = clientTxt;
    document.getElementById('debug').innerHTML = debugMessage;

    setTimeout(function () {
      startTime();
    }, 1000);
  };

  function addDebug(s) {
    if (Debugging) debugMessage += s;
  }
  
  function ding() {
    document.getElementById('ding').play();
  }
  
  function playmp3(i) {
    var el = buttonText[i];

    // use t_announce if available, else use 't'
    var t_name = el.t_announce ?
      el.t_announce.toLowerCase() :
      el.t.toLowerCase();

    document.getElementById("audio" + t_name).play();
    return; // +++++++++++

    (function () {
      var audioElement2 = {};
      audioElement2 = document.createElement('audio');
      audioElement2.setAttribute('src', 'img/fr_' +
        t_name + '.mp3');
      audioElement2.controls = true;
      audioElement2.loop = false;
      audioElement2.load();
      audioElement2.play();
    }());

  }

  function playAlt(i) {
    var el = buttonText[i];
    // add t_alt if available
    var t_alt = el.t_alt ?
      el.t_alt.replace(/ /g, '+') : false;

    if (t_alt) document.getElementById("audioAlt" + t_alt).play();
    return; // +++++++++++

    (function () {
      var audioElement2 = {};
      audioElement2 = document.createElement('audio');
      audioElement2.setAttribute('src', 'img/fr_' + buttonText[i].t.replace(/ /g, "+") + '.mp3');
      audioElement2.controls = true;
      audioElement2.loop = false;
      audioElement2.load();
      audioElement2.play();
    }());
  }

  var makeAudio = function makeAudio(t) {

    (function () {
      var audioElement2 = {};
      audioElement2 = document.createElement('audio');
      audioElement2.setAttribute('src', 'http://translate.google.com/translate_tts?tl=fr&q=' +
        t);
      audioElement2.controls = true;
      audioElement2.loop = false;
      audioElement2.load();
      audioElement2.play();
    }());
    /*
     document.getElementById("SayText").innerHTML='<audio controls autoplay ' +
     'src="http://translate.google.com/translate_tts?tl=fr&q=' +
     t.toLowerCase() +
     '" type="audio/mpeg"> </audio>';
     */
  };

  var makeAltAudio = function makeAltAudio(t) {

    (function () {
      var audioElement2 = {};
      audioElement2 = document.createElement('audio');
      audioElement2.setAttribute('src', 'http://translate.google.com/translate_tts?tl=en&q=' +
        t);
      audioElement2.controls = true;
      audioElement2.loop = false;
      audioElement2.load();
      audioElement2.play();
    }());
  };

  var keyReceived = function keyReceived() {

    var x;
    if (window.event) // IE8 and earlier
    {
      x = event.keyCode;
    } else if (event.which) // IE9/Firefox/Chrome/Opera/Safari
    {
      x = event.which;
    }
    var keychar = String.fromCharCode(x);

    //alert("Key " + keychar + " was pressed down");

    //var keychar = e.keyChar;

    switch (keychar) {
    case 's':
    case 'S':
      addDebug(' "s"');
      selected();
      break;
    case 'p':
    case 'P':
      addDebug(' "p"');
      pauseOnOff();
      break;
    case 'v':
    case 'V':
      addDebug(' "v"');
      soundOnOff();
      break;
    }
    //Allow alphabetical keys, plus BACKSPACE and SPACE
    //return (keyunicode>=65 && keyunicode<=122 || keyunicode==8 || keyunicode==32)? true : false
  };

  var soundOnOff = function soundOnOff() {
    soundOn = !soundOn;
    if (soundOn) {
      document.getElementById('soundButton').value = "SOUND OFF";
      document.getElementById('soundButton').style.color = "red";
    } else {
      document.getElementById('soundButton').value = "SOUND ON";
      document.getElementById('soundButton').style.color = "royalblue";
    }
  };

  function pauseOff() {
    pauseState = false;
    document.getElementById('pauseButton').value = "PAUSE";
    endVideoSetUp();
  }

  function pauseOn() {
    pauseState = true;
    document.getElementById('pauseButton').value = "RUN";

  }

  var pauseOnOff = function pauseOnOff() {
    pauseState = !pauseState;
    if (pauseState) pauseOn();
    else pauseOff();
  };


  var selected = function selected() {
    if (pauseState) return;
    selectPressed = true;
    stateChanged();
  };

  $("btnOff").click(function () {
    //    $(this).slideUp();
    alert($(this));
  });

  var buttonClicked = function buttonClicked(i) {
    if (pauseState) {
      if (buttonText[highlightButton].kind === "SayText" ||
        buttonText[highlightButton].kind === "SayAlt" ||
        buttonText[highlightButton].kind === "SayLine") {
        pauseOff();
      }
      return;
    }
    selectPressed = true;
    stateChanged();
  };

  function nextMenu() {
    // hardcoded!!!!!
    if (buttonText === CB2.menu1) {
      setTable(CB2.menu2);
    } else {
      setTable(CB2.menu1);
    }

    highlightRow = nRows - 1;
    pauseOff();
    selectPressed = false;
    state = 0;
  }

  function doButton(i) {
    addDebug(" do" + i);

    switch (buttonText[i].kind) {
    case "NextMenu": // not reachable here
      nextMenu();
      break;

    case "Alpha":
      clientTxt += buttonText[i].t.toLowerCase();
      playmp3(i);
      break;

    case 'SayText':
      //clientTxt += buttonText[i].t;   //for now
      playmp3(i);
      break;

    case 'SayAlt':
      playmp3(i);
      setTimeout(function () {
//        $.playSound('./img/ding3');
        ding();
      }, 1000);
      setTimeout(function () {
        playAlt(i);
      }, 2000);
      break;

    case 'SayLine':
      setTimeout(function () {
//        $.playSound('./img/ding3');
        ding();
      }, 1000);
      setTimeout(function () {
        makeAudio(clientTxt.replace(/ /g, "+"));
      }, 2000);
      break;

    case 'Subs':
      clientTxt += buttonText[i].substitute;
      playmp3(i);
      break;

    case 'Erase':
      playmp3(i);
      clientTxt = "";
      break;

    case 'Delete':
      playmp3(i);
      clientTxt = clientTxt.substring(0, clientTxt.length > 0 ? clientTxt.length - 1 : 0);
      break;
    case 'Skip':

      break;
    default:
      console.log(":kind not found");
    }
  }

  function testMe() {
    inc = 1 - inc;

    if (inc) {
      document.getElementById("row0").setAttribute("class", "rowOn");
      document.getElementById("row4").setAttribute("class", "rowOff");
    } else {
      document.getElementById("row0").setAttribute("class", "rowOff");
      document.getElementById("row4").setAttribute("class", "rowOn");

    }

    addDebug('clicked ' + (inc));
  }

  function stateChanged() {
    // select pressed  - state transition
    pauseOn();

    if (state === 0) { //from scanning row to scanning col
      //var now = new Date();
      if (((new Date()) - buttonPresented) < debouncetime) {
        // unwind to last button
        addDebug(" -0");
        setRow(highlightRow, 'Off');
        --highlightRow;
        if (highlightRow < 0) highlightRow = nRows - 1;
        selectedRow = highlightRow;
        buttonPresented = new Date();
      }

      selectedRow = highlightRow;
      setRowButtons(selectedRow, "Off");

      highlightButton = selectedRow * nCols;

      if (buttonText[highlightButton].kind === 'NextMenu') {
        nextMenu();
        return;
      }
      playmp3(highlightButton);
      setButton(highlightButton, 'On');
      document.getElementById("btn" + highlightButton).focus();
      state = 1;
      selectPressed = false;
      pauseOff();
      /*
        setTimeout(function () {
            selectPressed = false;

        }, timeToNextCol);
        */
    } else if (state === 1) { // from scanning col to do button
      if (((new Date()) - buttonPresented) < debouncetime) {
        // unwind to last row
        addDebug(" -1");
        setButton(highlightButton, "Off");
        --highlightButton;
        //if (highlightButton < 0) highlightButton = nCols - 1;
        if (highlightButton < selectedRow * nCols) {
          highlightButton = (selectedRow + 1) * nCols - 1;
        }
      }
      setRow(selectedRow, "Off");
      setButton(highlightButton, 'Off');

      //        if (buttonText[highlightButton].kind != "SayLine") {
      //            playmp3(highlightButton);
      //        }

      doButton(highlightButton);

      if (buttonText[highlightButton].kind === 'SayText' ||
        buttonText[highlightButton].kind === 'SayAlt' ||
        buttonText[highlightButton].kind === 'SayLine') {
        pauseOn();
        state = 0;
        selectPressed = false;
        return;
      }

      setTimeout(function () {
        rowDoneTimes = 0;
        state = 0;
        selectPressed = false;
        pauseOff();
      }, timeToNextRow);

    } else {
      // state=0;
      setTimeout(function () {
        selectPressed = false;
      }, timeToNextRow);
    }

    //setTimeout(function() { selectPressed=false; }, timeToNextRow);
  }

  function setRow(r, OnOff) {
    document.getElementById("row" + r).setAttribute("class", "row" + OnOff);
    if (OnOff === "On") {
      document.getElementById("btn" + r * nCols).focus();
    }
    if (OnOff) buttonPresented = new Date();
  }

  function setRowButtons(r, OnOff) {
    //return;
    for (var i = r * nCols, max = (r + 1) * nCols; i < max; i++) {
      setButton(i, OnOff);
    }
  }

  function setButton(r, OnOff) {
    document.getElementById("btn" + r).focus();
    document.getElementById("btn" + r).setAttribute("class", "btn" + OnOff);
    if (OnOff) buttonPresented = new Date();
  }

  function checkState() {
    // addDebug(" st" + state + " sp?" + selectPressed);

    if (pauseState) { // paused
      setTimeout(function () {
        checkState();
      }, 100);
    } else {
      if (selectPressed === false) { // no key activity - steady state
        if (state === 0) {
          //alert("state 0 and no press")
          setRow(highlightRow, "Off");
          highlightRow = (++highlightRow) % nRows;
          if (soundOn) playmp3(highlightRow * nCols);
          setRow(highlightRow, "On");
          document.getElementById("btn" + (highlightRow * nCols)).focus();
          setTimeout(function () {
            checkState();
          }, timeToNextRow);
        } else if (state === 1) {
          setButton(highlightButton, 'Off');
          highlightButton = (++highlightButton) % nCols + selectedRow * nCols;
          while (buttonText[highlightButton].kind === 'Skip') {
            highlightButton = (++highlightButton) % nCols + selectedRow * nCols;
          }
          if (highlightButton === selectedRow * nCols) {
            // repeated more than maxRowDoneTimes times => skip to next rows
            if (++rowDoneTimes >= maxRowDoneTimes) {
              state = 0;
              rowDoneTimes = 0;
              //highlightRow = (++highlightRow)%nRows;
              setTimeout(function () {
                checkState();
              }, timeToNextCol);
              return;
            }
          }


          if (soundOn) playmp3(highlightButton);
          document.getElementById("btn" + highlightButton).focus();
          setButton(highlightButton, 'On');
          setTimeout(function () {
            checkState();
          }, timeToNextCol);
        } else if (state === 2) {
          setTimeout(function () {
            checkState();
          }, 200);
        }
      } else { // under state pressed
        setTimeout(function () {
          checkState();
        }, timeToNextRow);
      }

      //setTimeout( function(){checkState()}, 2000);
    }
  }

  function resetTable(menu) {
    buttonText = menu;
    nRows = buttonText.nRows;
    nCols = buttonText.nCols;

    var i, max;

    for (i = 0, max = nRows * nCols; i < max; i++) {
      document.getElementById('btn' + i).setAttribute('value', buttonText[i].t);

    }
  }

  function setTable(menu) {
    buttonText = menu;
    nRows = buttonText.nRows;
    nCols = buttonText.nCols;

    var i, j, max,
      t = "<div id='menuTable'>";

    for (i = 0; i < nRows; i++) {
      t += "<div class='rowOff' id='row" + i + "'>";

      for (j = i * nCols, max = (i + 1) * nCols; j < max; j++) {
        t += "<div> <input type='button' class='btnOff' " +
          "onclick ='CB.buttonClicked(" + j + ");' id='btn" + j +
          "' value=" + buttonText[j].t +
          "></input></div> ";
        /*
        t += "<div class='btnOff' " +
          "onclick ='CB.buttonClicked(" + j + ");' id='btn" + j +
          "'>" + buttonText[j].t +
          "</div>";
*/
      }
      t += "</div>";
    }
    t += "</div>";
    document.getElementById("content").innerHTML = t;

    // doTabIndexOnce
    // >>>>>>>>>>>>>>>> to implement - set tabindex=-1 in the rest of the nodes
    for (j = 0, max = nRows * nCols; j < max; j++) {
      document.getElementById("btn" + j).setAttribute("tabindex", j + 1);
    }
  }

  function setUpAudio() {
    var t = '<div>';
    t += setUpAudioByMenu(CB2.menu1);
    t += setUpAudioByMenu(CB2.menu2);
    t += '</div>';

    document.getElementById('audioclass').innerHTML = t;
  }

  function setUpAudioByMenu(menu) {
    var j, max,
      t = '';

    for (j = 0, max = menu.length; j < max; j++) {
      //        "<div class='audioclass'>" +
      var t_name = menu[j].t_announce ?
        menu[j].t_announce.toLowerCase() :
        menu[j].t.toLowerCase();
      var t_alt = menu[j].t_alt ?
        menu[j].t_alt.replace(/ /g, '+') : false;

      t +=
      // use t_announce if available, else use 't'
      " <audio id='audio" + t_name +
        "' preload='auto' src='img/fr_" +
        t_name +
        ".mp3'></audio>" +

      // add t_alt if available
      (t_alt ?
        " <audio id='audioAlt" + t_alt +
        "' preload='auto' src='img/en_" +
        t_alt +
        ".mp3'></audio>" : " ");
    }
    t += "</div>";
    return t;
  }

  var getStarted = function getStarted() {


    $("#slider").slider();
    $("#slider").slider({
      min: 5
    });
    $("#slider").slider({
      max: 50
    });
    $("#slider").slider("value", adjustableDelay / 100);

    document.getElementById("slider-value").innerHTML = adjustableDelay / 1000.0;

    $("#slider").slider({
      stop: function (event, ui) {
        adjustableDelay = $("#slider").slider("value");
        document.getElementById("slider-value").innerHTML = adjustableDelay / 10;
        adjustableDelay = adjustableDelay * 100;
        timeToNextCol = adjustableDelay;
        timeToNextRow = adjustableDelay;
        event.preventDefault();
      }
    });

    /*
    setTable(CB2.menu1);
    highlightRow = nRows - 1;
*/
    startTime();
    setUpAudio();

    nextMenu();
    pauseOn();

    doVideoSetUp();

    checkState(); // kick it off!!
    document.getElementById("pauseButton").focus();
    document.getElementById("pauseButton").select();
  };

  var tmpMP3 = function tmpMP3(i) {
    playmp3(i);
    setTimeout(function () {
      playAlt(i);

    }, 1000);

    // simulatedClick(document.getElementById("tmpB"+i),"click");
    if (i < (nVideoSetup - 1)) {
      document.getElementById("tmpB" + (i + 1)).focus();
      document.getElementById("tmpB" + (i + 1)).select();
    } else {
      document.getElementById("pauseButton").focus();
      //setUp();
    }
  };

  var setUp = function setUp() {
    if (inSetup) {
      endVideoSetUp();
      inSetup = false;
    } else {
      if (!pauseState) pauseOn();
      inSetup = true;
      doVideoSetUp();
    }
  };

  function doVideoSetUp() {
    var tt = '<div>';
    nVideoSetup = 0;

    function doV(menu) {
      var t = "";
      /*      var menu;
      menu=CB2.menu1;
      if(w===2) menu=CB2.menu2;*/
      for (var j = 0, max = menu.nRows * menu.nCols; j < max; j++) {
        //        if (menu[j].kind === 'Skip') continue;
        t += "<input type='button' id='tmpB" + nVideoSetup +
        //          "' onclick='CB.tmpMP3(" + '"CB2.menu' + w + '[' + j + 
        "' onclick='CB.tmpMP3(" + nVideoSetup + ");'" +
        //          ']");' + "'" +
        " value=" + menu[j].t +
          " ></input>";
        nVideoSetup++;
      }
      return t;
    }

    /*
    tt += doV(CB2.menu1);
    tt += doV(CB2.menu2);
*/
    tt += doV(buttonText);
    tt += '</div>';

    document.getElementById("videoSetUp").innerHTML = tt;
    document.getElementById("tmpB0").focus();
    document.getElementById("tmpB0").select();
    /*
     for (var i=0; i<nRows*nCols; i++) {
     (function () {
     audioElement2 = document.createElement('audio');
     audioElement2.setAttribute('src', 'img/fr_' + buttonText[i].t.replace(/ /g,"+") + '.mp3' );
     audioElement2.controls = true;
     audioElement2.loop = false;
     audioElement2.load();
     audioElement2.play();
     }());
     // setTimeout( function() { simulatedClick(document.getElementById("tmpB"+j),"click");}, 800);
     }
     */
  }

  function endVideoSetUp() {
    document.getElementById("videoSetUp").innerHTML = "";
    document.getElementById("pauseButton").focus();
  }



  // external code
  function simulatedClick(target, options) {

    var event = target.ownerDocument.createEvent('MouseEvents'),
      options = options || {};

    //Set your default options to the right of ||
    var opts = {
      type: options.type || 'click',
      canBubble: options.canBubble || true,
      cancelable: options.cancelable || true,
      view: options.view || target.ownerDocument.defaultView,
      detail: options.detail || 1,
      screenX: options.screenX || 0, //The coordinates within the entire page
      screenY: options.screenY || 0,
      clientX: options.clientX || 0, //The coordinates within the viewport
      clientY: options.clientY || 0,
      ctrlKey: options.ctrlKey || false,
      altKey: options.altKey || false,
      shiftKey: options.shiftKey || false,
      metaKey: options.metaKey || false, //I *think* 'meta' is 'Cmd/Apple' on Mac, and 'Windows key' on Win. Not sure, though!
      button: options.button || 0, //0 = left, 1 = middle, 2 = right
      relatedTarget: options.relatedTarget || null,
    };

    //Pass in the options
    event.initMouseEvent(
      opts.type,
      opts.canBubble,
      opts.cancelable,
      opts.view,
      opts.detail,
      opts.screenX,
      opts.screenY,
      opts.clientX,
      opts.clientY,
      opts.ctrlKey,
      opts.altKey,
      opts.shiftKey,
      opts.metaKey,
      opts.button,
      opts.relatedTarget
    );

    //Fire the event
    target.dispatchEvent(event);
  }

  return {
    // startTime: startTime,
    getStarted: getStarted,
    setUp: setUp,
    pauseOnOff: pauseOnOff,
    keyReceived: keyReceived,
    soundOnOff: soundOnOff,
    buttonClicked: buttonClicked,
    tmpMP3: tmpMP3,
  };

}());