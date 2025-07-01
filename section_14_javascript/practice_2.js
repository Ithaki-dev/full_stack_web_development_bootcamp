var name = prompt("Hellow please write your name.");
var name = name.toLowerCase();
var first_letter = name.slice(0,1);

var first_letter = first_letter.toUpperCase();
var update_name = first_letter.concat("",name.slice(1));
alert("Hello, " + update_name);