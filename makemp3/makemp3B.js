
/**
 * Created by ylh on 14-03-13.
 */

var CB2 = ( function CB2() {
	
  var menu1 = [
  { t: "premiere", kind: "Alpha" },
  { t: "quatrieme", kind: "NextMenu" },
	{ t: "troisieme", kind: "Alpha" },
  { t: "deuxieme", kind: "NextMenu" },
  ];
		
	return {
		menu1: menu1,
		};
		
}());


buttonText = CB2.menu1;

for ( var i=0; i< buttonText.length; i++ ) {
  console.log('curl -A "Mozilla" "http://translate.google.com/translate_tts?tl=fr&q=' +
  buttonText[i].t +
  '" > fr_' +
  buttonText[i].t +
  ".mp3");

  if(buttonText[i].t_alt) {
  console.log('curl -A "Mozilla" "http://translate.google.com/translate_tts?tl=en&q=' +
  buttonText[i].t_alt.replace(/ /g,'+')  +
  '" > en_' +
  buttonText[i].t_alt.replace(/ /g,'+')  +
  ".mp3");
  }
}

