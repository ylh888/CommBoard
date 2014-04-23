
/**
 * Created by ylh on 14-03-13.
 */

var CB2 = ( function CB2() {
	
  var menu1 = [
  { t: "qu", kind: "Alpha" },
	{ t: "besoins", kind: "Alpha" },
	{ t: "succion", kind: "SayAlt", t_alt: "I need suction" },
	{ t: "position", kind: "SayAlt", t_alt: 'I need to change position' }, 
	{ t: "bassin", kind: "SayText", t_alt: 'I need the bed pan' },
  { t: "suivant", kind: "NextMenu" },
	{ t: "sentir", kind: "Alpha" },
	{ t: "avide", kind: "SayAlt", t_alt: 'I am hungry' }, 
  { t: "suivant", kind: "NextMenu" },
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

