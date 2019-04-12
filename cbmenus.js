
(function($){

  $.extend({
    playSound: function(){
      return $("<embed src='"+arguments[0]+".mp3' hidden='true' autostart='true' loop='false' class='playSound'>" + "<audio autoplay='autoplay' style='display:none;' controls='controls'><source src='"+arguments[0]+".mp3' /><source src='"+arguments[0]+".ogg' /></audio>").appendTo('body');
    }
  });

})(jQuery);


var CB2 = ( function CB2() {

  var menu1 = [
//row 0
  { t: 'A', kind: 'RowHeading', t_announce: 'row eh' },
  { t: 'a', kind: 'Alpha' },
  { t: 'b', kind: 'Alpha' },
  { t: 'c', kind: 'Alpha' },
  { t: 'd', kind: 'Alpha' },
  { t: 'space', kind: 'Subs', substitute: ' ' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },


// row 1
  { t: 'E', kind: 'RowHeading', t_announce: 'row e' },
  { t: 'e', kind: 'Alpha' },
  { t: 'f', kind: 'Alpha' },
  { t: 'g', kind: 'Alpha' },
  { t: 'h', kind: 'Alpha' },
  { t: 'Delete', kind: 'Delete' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },

// row 2
  { t: 'I', kind: 'RowHeading', t_announce: 'row i' },
  { t: 'i', kind: 'Alpha' },
  { t: 'j', kind: 'Alpha' }, 
  { t: 'k', kind: 'Alpha' },
  { t: 'l', kind: 'Alpha' },
  { t: 'm', kind: 'Alpha' },
  { t: 'n', kind: 'Alpha' },
  { t: '', kind: 'Skip' },

// row 3
  { t: 'O', kind: 'RowHeading', t_announce: 'row o' },
  { t: 'o', kind: 'Alpha' },
  { t: 'p', kind: 'Alpha' },
  { t: 'qu', kind: 'Alpha' },
  { t: 'r', kind: 'Alpha' },
  { t: 's', kind: 'Alpha' },
  { t: 't', kind: 'Alpha' },
  { t: '', kind: 'Skip' },

// row 4
  { t: 'U', kind: 'RowHeading', t_announce: 'row u' },
  { t: 'u', kind: 'Alpha' }, 
    { t: 'v', kind: 'Alpha' },
    { t: 'w', kind: 'Alpha' },
    { t: 'x', kind: 'Alpha' },
    { t: 'y', kind: 'Alpha' },
    { t: 'z', kind: 'Alpha' },
  { t: '', kind: 'Skip' },

 // row 5   
  { t: 'Needs', kind: 'RowHeading', t_announce: 'needs' },
  { t: 'Next', kind: 'NextMenu', t_announce: 'next menu'},
  { t: 'Speak', kind: 'SayLine' },
  { t: 'Erase', kind: 'Erase' },
  { t: 'Suction', kind: 'SayAlt', t_alt: 'I need suction' },
  { t: 'Position', kind: 'SayAlt', t_alt: 'I need to change position' }, 
  { t: 'Bed pan', kind: 'SayAlt', t_alt: 'I need the bed pan' },
  { t: 'Stop', kind: 'SayText' },
    
//  { t: '', kind: 'Skip' },
//  { t: '', kind: 'Skip' },
//  { t: '', kind: 'Skip' },
//  { t: '', kind: 'Skip' },
//  { t: '', kind: 'Skip' },
//  { t: '', kind: 'Skip' },
//  { t: '', kind: 'Skip' },
//  { t: '', kind: 'Skip' },
  ];
		
    menu1.name = "english1";
	menu1.nRows = 6;
	menu1.nCols = 8;
  
  var menu2 = [
//row 0
	{ t: 'Feelings', kind: 'RowHeading' },
	{ t: 'Hungry', kind: 'SayAlt', t_alt: 'I am hungry' }, 
	{ t: 'Cold', kind: 'SayAlt', t_alt: 'I am cold' },
	{ t: 'Hot', kind: 'SayAlt', t_alt: 'I am hot' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
    
  { t: 'Next', kind: 'NextMenu', t_announce: 'next menu'},
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
  ];
		
    menu2.name = "english2";
	menu2.nRows = 2;
	menu2.nCols = 8;
  
// french version

  var menu1_fr = [
//row 0
  { t: '1', kind: 'RowHeading', t_announce: 'premiere' },
  { t: 'a', kind: 'Alpha' },
  { t: 'b', kind: 'Alpha' },
  { t: 'c', kind: 'Alpha' },
  { t: 'd', kind: 'Alpha' },
  { t: 'e', kind: 'Alpha' },
  { t: 'f', kind: 'Alpha' },
  { t: 'g', kind: 'Alpha' },

// row 1
  { t: '2', kind: 'RowHeading', t_announce: 'deuxieme' },
  { t: 'h', kind: 'Alpha' },
  { t: 'i', kind: 'Alpha' },
  { t: 'j', kind: 'Alpha' }, 
  { t: 'k', kind: 'Alpha' },
  { t: 'l', kind: 'Alpha' },
  { t: 'm', kind: 'Alpha' },
  { t: 'n', kind: 'Alpha' },

// row 2
	{ t: '3', kind: 'RowHeading', t_announce: 'troisieme' },
  { t: 'o', kind: 'Alpha' },
  { t: 'p', kind: 'Alpha' },
  { t: 'qu', kind: 'Alpha' },
  { t: 'r', kind: 'Alpha' },
  { t: 's', kind: 'Alpha' },
  { t: 't', kind: 'Alpha' },
	{ t: 'espace', kind: 'Subs', substitute: ' ' },

// row 3
	{ t: '4', kind: 'RowHeading', t_announce: 'quatrieme' },
	{ t: 'u', kind: 'Alpha' }, 
	{ t: 'v', kind: 'Alpha' },
	{ t: 'w', kind: 'Alpha' },
	{ t: 'x', kind: 'Alpha' },
	{ t: 'y', kind: 'Alpha' },
	{ t: 'z', kind: 'Alpha' },
	{ t: 'effacer', kind: 'Delete' },

// row 4
  { t: 'besoins', kind: 'RowHeading' },
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
		
    menu1_fr.name = "french1";
	menu1_fr.nRows = 6;
	menu1_fr.nCols = 8;
  
  var menu2_fr = [
//row 0
  { t: 'sentir', kind: 'RowHeading' },
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
  { t: '', kind: 'Skip' }
  
  ];
  
    menu2_fr.name = "french2";
  	menu2_fr.nRows = 2;
	menu2_fr.nCols = 8;
 
// spanish version
	
  var menu1_sp = [
//row a
  { t: 'A', kind: 'RowHeading', t_announce: 'a' },
  { t: 'a', kind: 'Alpha' },
  { t: 'b', kind: 'Alpha' },
  { t: 'c', kind: 'Alpha' },
  { t: 'd', kind: 'Alpha' },
  { t: 'espace', kind: 'Subs', substitute: ' ' },
  { t: 'borrar', kind: 'Delete' },
  { t: '', kind: 'Skip' },

// row e
  { t: 'E', kind: 'RowHeading', t_announce: 'e' },
  { t: 'e', kind: 'Alpha' },
  { t: 'f', kind: 'Alpha' },
  { t: 'g', kind: 'Alpha' },
  { t: 'h', kind: 'Alpha' },
  { t: 'Si', kind: 'SayText' },
  { t: 'No', kind: 'SayText' },
  { t: '', kind: 'Skip' },
      
// row i
  { t: 'I', kind: 'RowHeading', t_announce: 'i' },   
  { t: 'i', kind: 'Alpha' },
  { t: 'j', kind: 'Alpha' }, 
  { t: 'k', kind: 'Alpha' },
  { t: 'l', kind: 'Alpha' },
  { t: 'm', kind: 'Alpha' },
  { t: 'n', kind: 'Alpha' },
  { t: 'ñ', kind: 'Alpha' },   // &ntilde; | &#241;

// row oh
  { t: 'O', kind: 'RowHeading', t_announce: 'o' },
  { t: 'o', kind: 'Alpha' },
  { t: 'p', kind: 'Alpha' },
  { t: 'qu', kind: 'Alpha' },
  { t: 'r', kind: 'Alpha' },
  { t: 's', kind: 'Alpha' },
  { t: 't', kind: 'Alpha' },
  { t: '', kind: 'Skip' },

// row u
  { t: 'U', kind: 'RowHeading', t_announce: 'u' },
  { t: 'u', kind: 'Alpha' }, 
  { t: 'v', kind: 'Alpha' },
  { t: 'w', kind: 'Alpha' },
  { t: 'x', kind: 'Alpha' },
  { t: 'y', kind: 'Alpha' },
  { t: 'z', kind: 'Alpha' },
  { t: '', kind: 'Skip' },

// row 6
  { t: 'acciónes', kind: 'RowHeading' },
  { t: 'decir', kind: 'SayLine' },
  { t: 'limpiar', kind: 'Erase' },
  { t: 'succión', kind: 'SayAlt', t_alt: 'necesito succión' },
  { t: 'posición', kind: 'SayAlt', t_alt: 'necesito cambiar posición' }, 
  { t: 'calentador', kind: 'SayAlt', t_alt: 'necesito calentador de cama' },
  { t: 'parar', kind: 'SayText' },
  { t: '', kind: 'Skip' },
    
 // row 7   
  { t: 'próximo', kind: 'NextMenu' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
  ];
		
    menu1_sp.name = "spanish1";
	menu1_sp.nRows = 7;
	menu1_sp.nCols = 8;
  
  var menu2_sp = [
//row 0
  { t: 'sentir', kind: 'RowHeading' },
  { t: 'hambred', kind: 'SayAlt', t_alt: 'Tengo hambred' }, 
  { t: 'frío', kind: 'SayAlt', t_alt: 'Tengo frío' },
  { t: 'calor', kind: 'SayAlt', t_alt: 'Tengo calor' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
    
  { t: 'próximo', kind: 'NextMenu' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' },
  { t: '', kind: 'Skip' }
  
  ];
  
  menu2_sp.name = "spanish2";
  menu2_sp.nRows = 2;
  menu2_sp.nCols = 7;
 
// menu0 NOT USED
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
    
	return {
    //menu0: menu0,
		menu1: menu1,
		menu2: menu2,
        menu1_fr: menu1_fr,
        menu2_fr: menu2_fr,
        menu1_sp: menu1_sp,
        menu2_sp: menu2_sp
    };
		
}());