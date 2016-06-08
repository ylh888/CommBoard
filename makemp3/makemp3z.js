
/**
 * Created by ylh on 14-03-13.
 */

var buttonText=
    [   {"t":"該吃飯了吧", kind:"Alpha"},

    ];



for ( var i=0; i< buttonText.length; i++ ) {
  console.log('curl -A "Mozilla" "http://translate.google.com/translate_tts?tl=zh&q=' +
  buttonText[i].t +
  '" > zh_kzfl' +
  ".mp3");
}

