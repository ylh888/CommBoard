
/**
 * Created by ylh on 14-03-13.
 */

var buttonText=
    [   {"t":"A", kind:"Alpha"},
        {"t":"B", kind:"Alpha"},
        {"t":"C", kind:"Alpha"},
        {"t":"D", kind:"Alpha"},
        {"t":"Oui", kind:"SayIt"},
        {"t":"Non", kind:"SayIt"},

        {"t":"E", kind:"Alpha"},
        {"t":"F", kind:"Alpha"},
        {"t":"G", kind:"Alpha"},
        {"t":"H", kind:"Alpha"},
        {"t":"Effacer", kind:"Delete"},
        {"t":"Parler", kind:"SayAll"},

        {"t":"I", kind:"Alpha"},
        {"t":"J", kind:"Alpha"},
        {"t":"K", kind:"Alpha"},
        {"t":"L", kind:"Alpha"},
        {"t":"M", kind:"Alpha"},
        {"t":"N", kind:"Alpha"},

        {"t":"O", kind:"Alpha"},
        {"t":"P", kind:"Alpha"},
        {"t":"Q", kind:"Alpha"},
        {"t":"R", kind:"Alpha"},
        {"t":"S", kind:"Alpha"},
        {"t":"T", kind:"Alpha"},

        {"t":"U", kind:"Alpha"},
        {"t":"V", kind:"Alpha"},
        {"t":"W", kind:"Alpha"},
        {"t":"X", kind:"Alpha"},
        {"t":"Y", kind:"Alpha"},
        {"t":"Z", kind:"Alpha"},

        {"t":"espace", kind:"Subs", substitute:" "},
        {"t":"succion", kind:"SayIt"},
        {"t":"avide", kind:"SayIt"},
        {"t":"froid", kind:"SayIt"},
        {"t":"position", kind:"SayIt"},
        {"t":"bassin", kind:"SayIt"},

    ];



for ( var i=0; i< buttonText.length; i++ ) {
  console.log('curl -A "Mozilla" "http://translate.google.com/translate_tts?tl=fr&q=' +
  buttonText[i].t +
  '" > fr_' +
  buttonText[i].t +
  ".mp3");
}

