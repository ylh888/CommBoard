/**
 * Created by ylh on 14-03-13.
 */
var debugMessage = "",
    clientTxt="",
    inc = 0,
    nRows= 6,
    nCols= 6,
    nStates= 2,
    pauseState= 0,
    highlightRow=-1,
    selectedRow=-1,
    highlightButton=-1,
    state= 0,
    selectPressed=0;
// state:: 0=cycle row, 1=cycle column, 2= action on button (row,col)

var buttonText=
    [   {"t":"a", kind:"Alpha"},
        {"t":"b", kind:"Alpha"},
        {"t":"c", kind:"Alpha"},
        {"t":"d", kind:"Alpha"},
        {"t":"Oui", kind:"SayIt"},
        {"t":"Non", kind:"SayIt"},

        {"t":"e", kind:"Alpha"},
        {"t":"f", kind:"Alpha"},
        {"t":"g", kind:"Alpha"},
        {"t":"h", kind:"Alpha"},
        {"t":"Parler", kind:"SayAll"},
        {"t":"Rayer", kind:"Erase"},


        {"t":"i", kind:"Alpha"},
        {"t":"j", kind:"Alpha"},
        {"t":"k", kind:"Alpha"},
        {"t":"l", kind:"Alpha"},
        {"t":"m", kind:"Alpha"},
        {"t":"n", kind:"Alpha"},

        {"t":"o", kind:"Alpha"},
        {"t":"p", kind:"Alpha"},
        {"t":"q", kind:"Alpha"},
        {"t":"r", kind:"Alpha"},
        {"t":"s", kind:"Alpha"},
        {"t":"t", kind:"Alpha"},

        {"t":"u", kind:"Alpha"},
        {"t":"v", kind:"Alpha"},
        {"t":"w", kind:"Alpha"},
        {"t":"x", kind:"Alpha"},
        {"t":"y", kind:"Alpha"},
        {"t":"z", kind:"Alpha"},

        {"t":"espace", kind:"Subs", substitute:" "},
        {"t":"effacer", kind:"Delete"},
        {"t":"arreter", kind:"SayIt"},
        {"t":"succion", kind:"SayIt"},
        {"t":"position", kind:"SayIt"},
        {"t":"bassin", kind:"SayIt"},
    ];


function startTime()
{
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();
    // add a zero in front of numbers<10
    m=m<10? "0"+m : m;
    s=s<10? "0"+s : s;
    document.getElementById('clientTxt').innerHTML="["+h+":"+m+":"+s+ "] "+ clientTxt;
    document.getElementById('debug').innerHTML=debugMessage;

    t=setTimeout(function(){startTime();},500);
}

function playmp3(i) {
    document.getElementById("audio"+i).play();
    return;

    (function () {
        audioElement2 = document.createElement('audio');
        audioElement2.setAttribute('src', 'img/fr_' + buttonText[i].t.replace(/ /g,"+") + '.mp3' );
        audioElement2.controls = true;
        audioElement2.loop = false;
        audioElement2.load();
        audioElement2.play();
    }());
}

function makeAudio(t){

    (function () {
        audioElement2 = document.createElement('audio');
        audioElement2.setAttribute('src', 'http://translate.google.com/translate_tts?tl=fr&q=' +
            t );
        audioElement2.controls = true;
        audioElement2.loop = false;
        audioElement2.load();
        audioElement2.play();
    }());
    /*
     document.getElementById("SayIt").innerHTML='<audio controls autoplay ' +
     'src="http://translate.google.com/translate_tts?tl=fr&q=' +
     t.toLowerCase() +
     '" type="audio/mpeg"> </audio>';
     */
}

function keyReceived() {

    var x;
    if(window.event) // IE8 and earlier
    {
        x=event.keyCode;
    }
    else if(event.which) // IE9/Firefox/Chrome/Opera/Safari
    {
        x=event.which;
    }
    var keychar=String.fromCharCode(x);

    //alert("Key " + keychar + " was pressed down");

    //var keychar = e.keyChar;

    switch (keychar) {
        case 's':
        case 'S':
            debugMessage+=" 's' ";
            selected();
            break;
        case 'p':
        case 'P':
            debugMessage+=" 'p'";
            pauseIt();
            break;
    }
    //Allow alphabetical keys, plus BACKSPACE and SPACE
    //return (keyunicode>=65 && keyunicode<=122 || keyunicode==8 || keyunicode==32)? true : false
}

function pauseIt() {
    pauseState =1-pauseState;
    if(pauseState) {
        document.getElementById('pauseButton').value="RUN";
        doVideoSetUp();
        //debugMessage = "Paused.";
    }
    else {
        document.getElementById('pauseButton').value="PAUSE";
        endVideoSetUp();
        //debugMessage = "Running ...";
    }
}

function selected() {
    if (pauseState) return;
    selectPressed=1;
    stateChanged();
}
function buttonClicked(i) {
   if (pauseState) {
       if( buttonText[highlightButton].kind == "SayIt" ) {
           pauseIt();
       }
    return;
   }
   selectPressed=1;
   stateChanged();

}

function doButton(i) {
    debugMessage = "do " + i + " ";

    switch (buttonText[i].kind ) {
        case "Alpha":
            clientTxt += buttonText[i].t.toLowerCase();
            playmp3(i);
        break;

        case 'SayIt':
            //clientTxt += buttonText[i].t;   //for now
            playmp3(i);
        break;

        case 'SayAll':
            makeAudio( clientTxt.replace(/ /g,"+") );
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
            clientTxt = clientTxt.substring(0,clientTxt.length>0? clientTxt.length-1 : 0);
         break;
    }
}

function testMe() {
    inc=1-inc;

    if( inc ) {
        document.getElementById("row0").setAttribute("class","rowOn");
        document.getElementById("row4").setAttribute("class","rowOff");
    }
    else {
        document.getElementById("row0").setAttribute("class","rowOff");
        document.getElementById("row4").setAttribute("class","rowOn");

    }

    debugMessage = "clicked " + (inc);
}

function stateChanged()
{
    // select pressed  - state transition

    if(state==0) {
        selectedRow = highlightRow;
        setRowButtons(selectedRow, "Off");

        highlightButton=selectedRow*nCols;

        playmp3(highlightButton);

        setButton(highlightButton,'On');
        document.getElementById("btn"+highlightButton).focus();
        state=1;
        setTimeout(function() { selectPressed=0; }, 2200);
    }
    else if(state==1) {
        setRow(selectedRow, "Off");

        setButton(highlightButton,'Off');

        if(buttonText[highlightButton].kind != "SayAll") {
            playmp3(highlightButton);
        }

        doButton(highlightButton);

        if(buttonText[highlightButton].kind == 'SayIt') {
            pauseIt();
        }

        state=0;
        setTimeout(function() { selectPressed=0; }, 2200);

    } else if(state==2){
        // state=0;
    }

    //setTimeout(function() { selectPressed=0; }, 2500);
}

function setRow(r,OnOff)  {
    document.getElementById("row" + r).setAttribute("class","row"+OnOff);
    if(OnOff=="On") {
        document.getElementById("btn" + r*nCols).focus();
    }
}

function setRowButtons(r,OnOff) {
    return;
    for( var i=r*nCols; i<(r+1)*nCols; i++) {
        setButton(i,OnOff);
    }
}

function setButton(r,OnOff)  {
    document.getElementById("btn" + r).focus();
    document.getElementById("btn" + r).setAttribute("class","btn"+OnOff);
}

function checkState() {
    //debugMessage +=" altS" + state + " sp?" + selectPressed;

    if( pauseState ){   // paused
        setTimeout( function(){checkState()}, 300);
    } else {
        if( selectPressed==0 ) {  // no key activity - steady state
            if(state==0) {
                //alert("state 0 and no press")
                setRow(highlightRow, "Off");
                highlightRow=(++highlightRow)%nRows;
                //playmp3( highlightRow*nCols);
                setRow(highlightRow, "On");
                document.getElementById("btn"+(highlightRow*nCols)).focus();
                //setTimeout( function(){checkState()}, 1000);
            }
            else if(state==1) {
                setButton(highlightButton,'Off');
                highlightButton=(++highlightButton)%nCols + selectedRow*nCols;
                //playmp3(highlightButton);
                document.getElementById("btn"+highlightButton).focus();
                setButton(highlightButton,'On');
               // setTimeout( function(){checkState()}, 1000);
            } else if(state==2){
                //setTimeout( function(){checkState()}, 200);
            }
        } else {  // under state pressed
        }

        setTimeout( function(){checkState()}, 2200);
    }

}

function altSetTable() {

    var t="<div id='menuTable'>";

    for (var i=0; i<nRows; i++) {
        t+="<div class='rowOff' id='row" + i + "'>";

        for (var j=i*nCols; j<(i+1)*nCols; j++) {

            t+="<div> <input type='button' class='btnOff' " +
                "onclick ='buttonClicked(" + j + ");' id='btn" + j +
                "' value=" + buttonText[j].t +
                "></input></div> " +
                "<div class='audioclass'> <audio id='audio" + j +
                "' preload='auto' src='img/fr_" + buttonText[j].t.toLowerCase() +
                ".mp3'></audio> </div>";
        }
        t+="</div>";
    }
    t+= "</div>";

    //t+="<script>document.getElementById('btn" + highlightButton + "').focus();</script>";

    document.getElementById("content").innerHTML = t;
}

function getStarted() {

    altSetTable();
    doTabIndexOnce();

    highlightRow=nRows-1; pauseState=1;

    doVideoSetUp();

    checkState(); // kick it off!!
    document.getElementById("pauseButton").focus();
    document.getElementById("pauseButton").select();
}

function myDelay (del) {
    return;

    var untilwhen = Date.now() + del;
    while(untilwhen>Date.now())
    {  }
}


function tmpplaymp3(i) {
      playmp3(i);
      // simulatedClick(document.getElementById("tmpB"+i),"click");
      if( i<nCols*nRows-1)
          document.getElementById("tmpB"+(i+1)).focus();
      else
          document.getElementById("pauseButton").focus();
}

function doVideoSetUp(){
    var t="";
    for (var j=0; j<nRows*nCols; j++) {
        t+="<input type='button' id='tmpB" +j+ "' onclick='tmpplaymp3(" + j +
            ");' " +
            " value=" + buttonText[j].t +
            " ></input>";
    }
    document.getElementById("videoSetUp").innerHTML=t;

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
function endVideoSetUp(){
    document.getElementById("videoSetUp").innerHTML="";
}

function doTabIndexOnce() {

    // to implement - set tabindex=-1 in the rest of the nodes

    for (var j=0; j<nRows*nCols; j++) {
        document.getElementById("btn"+j).setAttribute("tabindex", j+1);
        //setTimeout(function() { playmp3(j) }(), j*800+10);
       //simulatedClick(document.getElementById("audio"+j),"click");
    }
}


// external code
function simulatedClick(target, options) {

    var event = target.ownerDocument.createEvent('MouseEvents'),
        options = options || {};

    //Set your default options to the right of ||
    var opts = {
        type: options.type                  || 'click',
        canBubble:options.canBubble             || true,
        cancelable:options.cancelable           || true,
        view:options.view                       || target.ownerDocument.defaultView,
        detail:options.detail                   || 1,
        screenX:options.screenX                 || 0, //The coordinates within the entire page
        screenY:options.screenY                 || 0,
        clientX:options.clientX                 || 0, //The coordinates within the viewport
        clientY:options.clientY                 || 0,
        ctrlKey:options.ctrlKey                 || false,
        altKey:options.altKey                   || false,
        shiftKey:options.shiftKey               || false,
        metaKey:options.metaKey                 || false, //I *think* 'meta' is 'Cmd/Apple' on Mac, and 'Windows key' on Win. Not sure, though!
        button:options.button                   || 0, //0 = left, 1 = middle, 2 = right
        relatedTarget:options.relatedTarget     || null,
    }

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
