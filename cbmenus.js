var CB2 = ( function CB2() {
  var menu1 = [
//row 0
	{ t: "a", kind: "Alpha" },
  { t: "b", kind: "Alpha" },
  { t: "c", kind: "Alpha" },
  { t: "d", kind: "Alpha" },
  { t: "Oui", kind: "SayIt" },
  { t: "Non", kind: "SayIt" },

// row 1
  { t: "e", kind: "Alpha" },
  { t: "f", kind: "Alpha" },
  { t: "g", kind: "Alpha" },
  { t: "h", kind: "Alpha" },
  { t: "Parler", kind: "SayAll" },
  { t: "Rayer", kind: "Erase" },

// row 2
  { t: "i", kind: "Alpha" },
  { t: "j", kind: "Alpha" }, 
  { t: "k", kind: "Alpha" },
  { t: "l", kind: "Alpha" },
  { t: "m", kind: "Alpha" },
  { t: "n", kind: "Alpha" },

// row 3
  { t: "o", kind: "Alpha" },
  { t: "p", kind: "Alpha" },
  { t: "q", kind: "Alpha" },
  { t: "r", kind: "Alpha" },
  { t: "s", kind: "Alpha" },
  { t: "t", kind: "Alpha" },

// row 4
	{ t: "u", kind: "Alpha" }, 
	{ t: "v", kind: "Alpha" },
	{ t: "w", kind: "Alpha" },
	{ t: "x", kind: "Alpha" },
	{ t: "y", kind: "Alpha" },
	{ t: "z", kind: "Alpha" },

// row 5
	{ t: "espace", kind: "Subs", substitute: " " },
	{ t: "effacer", kind: "Delete" },
	{ t: "arreter", kind: "SayIt" },
	{ t: "succion", kind: "SayIt" },
	{ t: "position", kind: "SayIt" }, 
	{ t: "bassin", kind: "SayIt" },
  ];
	
	menu1.nRows = 6;
	menu1.nCols = 6;
	
  var menu2 = [
//row 0
	{ t: "1", kind: "Alpha" },
	{ t: "a", kind: "Alpha" },
  { t: "b", kind: "Alpha" },
  { t: "c", kind: "Alpha" },
  { t: "d", kind: "Alpha" },
  { t: "e", kind: "Alpha" },
  { t: "f", kind: "Alpha" },
  { t: "g", kind: "Alpha" },

// row 1
	{ t: "2", kind: "Alpha" },
  { t: "h", kind: "Alpha" },
  { t: "i", kind: "Alpha" },
  { t: "j", kind: "Alpha" }, 
  { t: "k", kind: "Alpha" },
  { t: "l", kind: "Alpha" },
  { t: "m", kind: "Alpha" },
  { t: "n", kind: "Alpha" },

// row 2
	{ t: "3", kind: "Alpha" },
  { t: "o", kind: "Alpha" },
  { t: "p", kind: "Alpha" },
  { t: "qu", kind: "Alpha" },
  { t: "r", kind: "Alpha" },
  { t: "s", kind: "Alpha" },
  { t: "t", kind: "Alpha" },
	{ t: "espace", kind: "Subs", substitute: " " },

// row 3
	{ t: "4", kind: "Alpha" },
	{ t: "u", kind: "Alpha" }, 
	{ t: "v", kind: "Alpha" },
	{ t: "w", kind: "Alpha" },
	{ t: "x", kind: "Alpha" },
	{ t: "y", kind: "Alpha" },
	{ t: "z", kind: "Alpha" },
	{ t: "effacer", kind: "Delete" },

// row 4
	{ t: "5", kind: "Alpha" },
  { t: "Oui", kind: "SayIt" },
  { t: "Non", kind: "SayIt" },
  { t: "Parler", kind: "SayAll" },
  { t: "Rayer", kind: "Erase" },
	{ t: "arreter", kind: "SayIt" },
	{ t: "succion", kind: "SayIt" },
	{ t: "position", kind: "SayIt" }, 
		
// row 5
	{ t: "bassin", kind: "SayIt" },
		
		
  ];
		
	menu2.nRows = 5;
	menu2.nCols = 8;

	return {
		menu1: menu1,
		menu2: menu2
		};
		
}());
