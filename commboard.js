/**
 * Created by ylh on 14-03-13.
 */
var CB = (function CB() {

    var debugMessage = "(space)=click | s=select | p=pause on/off | v=voice over simulation on/off",
        clientTxt = "",
        inc = 0,
        nRows = 6,
        nCols = 6,
        nStates = 2, // not used
        pauseState = 0,
        soundOn = 0,
        highlightRow = -1,
        selectedRow = -1,
        highlightButton = -1,
        state = 0,
        buttonPresented = 0,
        debouncetime = 300,
        timeToNextRow = 1600,
        timeToNextCol = 2000,
        adjustableDelay = 2000,
        selectPressed = 0,
        rowDoneTimes = 0,
        maxRowDoneTimes = 2,
        inSetup = 0,
        Debugging = 0;

    // state:: 0=cycle row, 1=cycle column

    var buttonText = [{
            "t": "a",
            kind: "Alpha"
    }, {
            "t": "b",
            kind: "Alpha"
    }, {
            "t": "c",
            kind: "Alpha"
    }, {
            "t": "d",
            kind: "Alpha"
    }, {
            "t": "Oui",
            kind: "SayIt"
    }, {
            "t": "Non",
            kind: "SayIt"
    },

    // row 1
        {
            "t": "e",
            kind: "Alpha"
    }, {
            "t": "f",
            kind: "Alpha"
    }, {
            "t": "g",
            kind: "Alpha"
    }, {
            "t": "h",
            kind: "Alpha"
    }, {
            "t": "Parler",
            kind: "SayAll"
    }, {
            "t": "Rayer",
            kind: "Erase"
    },

    // row 2
        {
            "t": "i",
            kind: "Alpha"
    }, {
            "t": "j",
            kind: "Alpha"
    }, {
            "t": "k",
            kind: "Alpha"
    }, {
            "t": "l",
            kind: "Alpha"
    }, {
            "t": "m",
            kind: "Alpha"
    }, {
            "t": "n",
            kind: "Alpha"
    },

    // row 3
        {
            "t": "o",
            kind: "Alpha"
    }, {
            "t": "p",
            kind: "Alpha"
    }, {
            "t": "q",
            kind: "Alpha"
    }, {
            "t": "r",
            kind: "Alpha"
    }, {
            "t": "s",
            kind: "Alpha"
    }, {
            "t": "t",
            kind: "Alpha"
    },

     // row 4
        {
            "t": "u",
            kind: "Alpha"
    }, {
            "t": "v",
            kind: "Alpha"
    }, {
            "t": "w",
            kind: "Alpha"
    }, {
            "t": "x",
            kind: "Alpha"
    }, {
            "t": "y",
            kind: "Alpha"
    }, {
            "t": "z",
            kind: "Alpha"
    },

     // row 5
        {
            "t": "espace",
            kind: "Subs",
            substitute: " "
    }, {
            "t": "effacer",
            kind: "Delete"
    }, {
            "t": "arreter",
            kind: "SayIt"
    }, {
            "t": "succion",
            kind: "SayIt"
    }, {
            "t": "position",
            kind: "SayIt"
    }, {
            "t": "bassin",
            kind: "SayIt"
    },
];

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
        }, 500);
    };

    function addDebug(s) {
        if (Debugging) debugMessage += s;
    }

    function playmp3(i) {
        document.getElementById("audio" + i).play();
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

    // <JN>
    // 

    // <JN>
    var voice

    window.speechSynthesis.onvoiceschanged = function () {
        voice = getVoice("fr", "fr-CA")
        window.speechSynthesis.onvoiceschanged = null
    }

    function getVoice(fallback, preferred) {
        var voices, voice, fallbackVoices, preferredVoices

        if (!window.speechSynthesis) {
            return false
        }

        voices = window.speechSynthesis.getVoices()

        if (voices.length) {
            voice = voices[0]
            fallbackVoices = voices.filter(function (voice) {
                return voice.lang.substring(0, 2) === fallback
            })

            if (fallbackVoices.length) {
                preferredVoices = fallbackVoices.filter(function (voice) {
                    return voice.lang === preferred
                })

                if (preferredVoices.length) {
                    voice = preferredVoices[0]
                } else {
                    voice = fallbackVoices[0]
                }
            }
        }

        return voice
    }
    // </JN>

    var makeAudio = function makeAudio(t) {

        // <JN>
        if (!voice) {
            return
        }

        var utterance = new SpeechSynthesisUtterance(t);
        utterance.voice = voice
        window.speechSynthesis.speak(utterance);

        // (function () {
        //     var audioElement2 = {};
        //     audioElement2 = document.createElement('audio');
        //     audioElement2.setAttribute('src', 'http://translate.google.com/translate_tts?tl=fr&q=' +
        //         t);
        //     audioElement2.controls = true;
        //     audioElement2.loop = false;
        //     audioElement2.load();
        //     audioElement2.play();
        // }());
        // 
        // </JN>
        /*
     document.getElementById("SayIt").innerHTML='<audio controls autoplay ' +
     'src="http://translate.google.com/translate_tts?tl=fr&q=' +
     t.toLowerCase() +
     '" type="audio/mpeg"> </audio>';
     */
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
        soundOn = 1 - soundOn;
        if (soundOn) {
            document.getElementById('soundButton').value = "SOUND OFF";
            document.getElementById('soundButton').style.color = "red";
        } else {
            document.getElementById('soundButton').value = "SOUND ON";
            document.getElementById('soundButton').style.color = "royalblue";
        }
    };

    function pauseOff() {
        pauseState = 0;
        document.getElementById('pauseButton').value = "PAUSE";
        endVideoSetUp();
    }

    function pauseOn() {
        pauseState = 1;
        document.getElementById('pauseButton').value = "RUN";

    }

    var pauseOnOff = function pauseOnOff() {
        pauseState = 1 - pauseState;
        if (pauseState) pauseOn();
        else pauseOff();
    };


    var selected = function selected() {
        if (pauseState) return;
        selectPressed = 1;
        stateChanged();
    };

    var buttonClicked = function buttonClicked(i) {
        if (pauseState) {
            if (buttonText[highlightButton].kind == "SayIt" ||
                buttonText[highlightButton].kind == "SayAll") {
                pauseOff();
            }
            return;
        }
        selectPressed = 1;
        stateChanged();
    };

    function doButton(i) {
        var alpha // <JN>
        addDebug(" do" + i);

        switch (buttonText[i].kind) {
        case "Alpha":
            // <JN>
            //clientTxt += buttonText[i].t.toLowerCase();
            //playmp3(i);
            alpha = buttonText[i].t.toLowerCase()
            clientTxt += alpha
            makeAudio(alpha)
                // </JN>
            break;

        case 'SayIt':
            //clientTxt += buttonText[i].t;   //for now
            playmp3(i);
            break;

        case 'SayAll':
            makeAudio(clientTxt) // .replace(/ /g, "+"));
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
            if ((Date() - buttonPresented) < debouncetime) {
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

            playmp3(highlightButton);

            setButton(highlightButton, 'On');
            document.getElementById("btn" + highlightButton).focus();
            state = 1;
            selectPressed = 0;
            pauseState = 0;
            /*
        setTimeout(function () {
            selectPressed = 0;

        }, timeToNextCol);
        */
        } else if (state == 1) { // from scanning col to do button
            if (((new Date()) - buttonPresented) < debouncetime) {
                // unwind to last row
                addDebug(" -1");
                setButton(highlightButton, "Off");
                --highlightButton;
                //if (highlightButton < 0) highlightButton = nCols - 1;
                if (highlightButton < selectedRow * nCols) highlightButton = (selectedRow + 1) * nCols - 1;
            }
            setRow(selectedRow, "Off");
            setButton(highlightButton, 'Off');

            //        if (buttonText[highlightButton].kind != "SayAll") {
            //            playmp3(highlightButton);
            //        }

            doButton(highlightButton);

            if (buttonText[highlightButton].kind == 'SayIt' ||
                buttonText[highlightButton].kind == 'SayAll') {
                pauseOn();
                state = 0;
                selectPressed = 0;
                return;
            }

            setTimeout(function () {
                rowDoneTimes = 0;
                state = 0;
                selectPressed = 0;
                pauseOff();
            }, timeToNextRow);

        } else {
            // state=0;
            setTimeout(function () {
                selectPressed = 0;
            }, timeToNextRow);
        }

        //setTimeout(function() { selectPressed=0; }, timeToNextRow);
    }

    function setRow(r, OnOff) {
        document.getElementById("row" + r).setAttribute("class", "row" + OnOff);
        if (OnOff == "On") {
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
            }, 10);
        } else {
            if (selectPressed === 0) { // no key activity - steady state
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
                } else if (state == 1) {
                    setButton(highlightButton, 'Off');
                    highlightButton = (++highlightButton) % nCols + selectedRow * nCols;
                    if (highlightButton == selectedRow * nCols) {
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
                } else if (state == 2) {
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

    function setTable() {
        var i, j, max,
            t = "<div id='menuTable'>";
        for (i = 0; i < nRows; i++) {
            t += "<div class='rowOff' id='row" + i + "'>";

            for (j = i * nCols, max = (i + 1) * nCols; j < max; j++) {

                t += "<div> <input type='button' class='btnOff' " +
                    "onclick ='CB.buttonClicked(" + j + ");' id='btn" + j +
                    //"onclick ='clicked(" + j + ");' id='btn" + j +
                    "' value=" + buttonText[j].t +
                    "></input></div> " +
                    "<div class='audioclass'> <audio id='audio" + j +
                    "' preload='auto' src='img/fr_" + buttonText[j].t.toLowerCase() +
                    ".mp3'></audio> </div>";
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

    var getStarted = function getStarted() {

        startTime();

        $("#slider").slider();
        $("#slider").slider({
            min: 4
        });
        $("#slider").slider({
            max: 40
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


        setTable();

        highlightRow = nRows - 1;
        pauseState = 1;

        doVideoSetUp();

        checkState(); // kick it off!!
        document.getElementById("pauseButton").focus();
        document.getElementById("pauseButton").select();


    };

    var tmpplaymp3 = function tmpplaymp3(i) {
        playmp3(i);
        // simulatedClick(document.getElementById("tmpB"+i),"click");
        if (i < nCols * nRows - 1) {
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
            inSetup = 0;
        } else {
            if (pauseState === 0) pauseOn();
            inSetup = 1;
            doVideoSetUp();
        }
    };

    function doVideoSetUp() {

        var t = "";
        for (var j = 0, max = nRows * nCols; j < max; j++) {
            t += "<input type='button' id='tmpB" + j + "' onclick='CB.tmpplaymp3(" + j +
                ");' " +
                " value=" + buttonText[j].t +
                " ></input>";
        }
        document.getElementById("videoSetUp").innerHTML = t;
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
        //        startTime: startTime,
        getStarted: getStarted,
        setUp: setUp,
        pauseOnOff: pauseOnOff,
        keyReceived: keyReceived,
        soundOnOff: soundOnOff,
        buttonClicked: buttonClicked,
        tmpplaymp3: tmpplaymp3,
        makeAudio: makeAudio // <JN>
    };

}());