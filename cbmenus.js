
(function($){

  $.extend({
    playSound: function(){
      return $("<embed src='"+arguments[0]+".mp3' hidden='true' autostart='true' loop='false' class='playSound'>" + "<audio autoplay='autoplay' style='display:none;' controls='controls'><source src='"+arguments[0]+".mp3' /><source src='"+arguments[0]+".ogg' /></audio>").appendTo('body');
    }
  });

})(jQuery);


var CB2 = ( function CB2() {
  var menu0 = [
//row 0
	{ t: 'a', kind: 'Alpha' },
  { t: 'b', kind: 'Alpha' },
  { t: 'c', kind: 'Alpha' },
  { t: 'd', kind: 'Alpha' },
  { t: 'Oui', kind: 'SayText' },
  { t: 'Non', kind: 'SayText' },

// row 1
  { t: 'e', kind: 'Alpha' },
  { t: 'f', kind: 'Alpha' },
  { t: 'g', kind: 'Alpha' },
  { t: 'h', kind: 'Alpha' },
  { t: 'Parler', kind: 'SayLine' },
  { t: 'Rayer', kind: 'Erase' },

// row 2
  { t: 'i', kind: 'Alpha' },
  { t: 'j', kind: 'Alpha' }, 
  { t: 'k', kind: 'Alpha' },
  { t: 'l', kind: 'Alpha' },
  { t: 'm', kind: 'Alpha' },
  { t: 'n', kind: 'Alpha' },

// row 3
  { t: 'o', kind: 'Alpha' },
  { t: 'p', kind: 'Alpha' },
  { t: 'q', kind: 'Alpha' },
  { t: 'r', kind: 'Alpha' },
  { t: 's', kind: 'Alpha' },
  { t: 't', kind: 'Alpha' },

// row 4
	{ t: 'u', kind: 'Alpha' }, 
	{ t: 'v', kind: 'Alpha' },
	{ t: 'w', kind: 'Alpha' },
	{ t: 'x', kind: 'Alpha' },
	{ t: 'y', kind: 'Alpha' },
	{ t: 'z', kind: 'Alpha' },

// row 5
	{ t: 'espace', kind: 'Subs', substitute: ' ' },
	{ t: 'effacer', kind: 'Delete' },
	{ t: 'arreter', kind: 'SayText' },
	{ t: 'succion', kind: 'SayText' },
	{ t: 'position', kind: 'SayText' }, 
	{ t: 'bassin', kind: 'SayText' },
  ];
	
	menu0.nRows = 6;
	menu0.nCols = 6;
	
  var menu1 = [
//row 0
	{ t: '1', kind: 'Alpha', t_announce: 'premiere' },
	{ t: 'a', kind: 'Alpha' },
  { t: 'b', kind: 'Alpha' },
  { t: 'c', kind: 'Alpha' },
  { t: 'd', kind: 'Alpha' },
  { t: 'e', kind: 'Alpha' },
  { t: 'f', kind: 'Alpha' },
  { t: 'g', kind: 'Alpha' },

// row 1
	{ t: '2', kind: 'Alpha', t_announce: 'deuxieme' },
  { t: 'h', kind: 'Alpha' },
  { t: 'i', kind: 'Alpha' },
  { t: 'j', kind: 'Alpha' }, 
  { t: 'k', kind: 'Alpha' },
  { t: 'l', kind: 'Alpha' },
  { t: 'm', kind: 'Alpha' },
  { t: 'n', kind: 'Alpha' },

// row 2
	{ t: '3', kind: 'Alpha', t_announce: 'troisieme' },
  { t: 'o', kind: 'Alpha' },
  { t: 'p', kind: 'Alpha' },
  { t: 'qu', kind: 'Alpha' },
  { t: 'r', kind: 'Alpha' },
  { t: 's', kind: 'Alpha' },
  { t: 't', kind: 'Alpha' },
	{ t: 'espace', kind: 'Subs', substitute: ' ' },

// row 3
	{ t: '4', kind: 'Alpha', t_announce: 'quatrieme' },
	{ t: 'u', kind: 'Alpha' }, 
	{ t: 'v', kind: 'Alpha' },
	{ t: 'w', kind: 'Alpha' },
	{ t: 'x', kind: 'Alpha' },
	{ t: 'y', kind: 'Alpha' },
	{ t: 'z', kind: 'Alpha' },
	{ t: 'effacer', kind: 'Delete' },

// row 4
	{ t: 'besoins', kind: 'Alpha' },
  { t: 'Parler', kind: 'SayLine' },
  { t: 'Rayer', kind: 'Erase' },
	{ t: 'succion', kind: 'SayAlt', t_alt: 'I need suction' },
	{ t: 'position', kind: 'SayAlt', t_alt: 'I need to change position' }, 
	{ t: 'bassin', kind: 'SayAlt', t_alt: 'I need the bed pan' },
	{ t: 'arreter', kind: 'SayText' },
  { t: '', kind: 'Skip' },
    
 // row 5   
  { t: 'suivant', kind: 'NextMenu' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
  ];
		
	menu1.nRows = 6;
	menu1.nCols = 8;
  
  var menu2 = [
//row 0
	{ t: 'sentir', kind: 'Alpha' },
	{ t: 'avide', kind: 'SayAlt', t_alt: 'I am hungry' }, 
	{ t: 'froid', kind: 'SayAlt', t_alt: 'I am cold' },
	{ t: 'chaud', kind: 'SayAlt', t_alt: 'I am hot' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
    
  { t: 'suivant', kind: 'NextMenu' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
/*
  { t: 'suivant', kind: 'NextMenu' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },

  { t: 'suivant', kind: 'NextMenu' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },

  { t: 'suivant', kind: 'NextMenu' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },

  { t: 'suivant', kind: 'NextMenu' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
*/
  ];
		
	menu2.nRows = 2;
	menu2.nCols = 8;
  
	return {
    menu0: menu0,
		menu1: menu1,
		menu2: menu2
		};
		
}());
