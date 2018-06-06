// PROCESS:
// 1. What does it return?
// 2. Is there any additional observable behaviour?
// 3. Grading and reflection (were you right or wrong, 
// then explain why you're right and why you're wrong.) 


// A
function deanStuff() {
  console.log(this);
  return "experiment";
}


// AB
var dean = function deanStuff() {
  console.log(this);
  return "experiment";
}


// B
deanStuff


// BA
var dean = deanStuff


// C
deanStuff()


// D
deanStuff.apply()


// E
deanStuff.call()


// F
deanStuff.bind()


// G
deanStuff.bind()()


// H
function() {
  console.log(this);
}


// I 
(function() {
  console.log(this);
})()


// J
(function() {
  console.log(this);
}).bind()


// K
(function() {
  console.log(this);
}).bind()()


// L
(function() {
  console.log(this);
}).apply()


// M
(function() {
  console.log(this);
}).call()