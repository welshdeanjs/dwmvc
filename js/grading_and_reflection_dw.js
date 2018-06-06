// PROCESS:
// 1. What does it return?
// 2. Is there any additional observable behaviour?
// 3. Grading and reflection (were you right or wrong, 
// then explain why you're right and why you're wrong.) 

// Revisit point 2. ANY change, e.g. B can now run because of A, A was defined etc.
// Create a new set of examples that show return values instead of just console.log.
// Review the return statement everywhere it's referenced in Practical JS.


// A -----------------------------
function deanStuff() {
  console.log(this);
  return "experiment";
}

// A1. It will return undefined.
// A2. function deanStuff() will be set.
// A3. Correct. The function is defined but not called.


// AB -----------------------------
var dean = function deanStuff() {
  console.log(this);
  return "experiment";
}

// AB1. It returns 'undefined'. 
// AB2. the dean variable is now set to the function itself.
// AB3. Correct. 'Undefined', because again, the function is still not called. 
// If you run dean, you should see the function return. 


// B -----------------------------
deanStuff

// B1. It will return the function only, but nothing will be called. 
// I expect to see `f deanStuff() {....`
// B2. Nothing additional.
// B3. Correct, because there are no parenthesis used, so the function will not be called
// despite being returned.


// BA -----------------------------
var dean = deanStuff

// BA1. Undefined. Nothing is returnd.
// BA2. dean is still set to the function being returned. 
// I can only set this to deanStuff because deanStuff already exists.
// BA3. Correct because I've merely set a variable, so nothing is returned.
// If I were to enter `dean` into the console after setting the variable, THEN it would return the function. 


// C -----------------------------
deanStuff()

// C1. It will call the function, and return "experiment".
// C2. The window object will be logged. 
// C3. Correct. This is right because 'this' it refers to case 1, where inside a standard function, 'this'
// logs the window object. The string will be returned as part of the function call.


// D -----------------------------
deanStuff.apply()

// D1. It will call the function, and return the "experiment" string. 
// D2. Window object will be logged. There is no 'this' which makes this function a little pointless.
// D3. Correct. This is right because 'apply' doesn't return a copy of the function to be called later
// as bind does Instead it calls it right away. The reason it's the window object is because this' is still case 1.
// "experiment" string is called because it's part of the function call.
 

// E -----------------------------
deanStuff.call()

// E1. I expect this will do the same thing as Apply. 
// E2. Nothing additional.
// E3. Correct. Call works almost the same as Apply.


// F -----------------------------
deanStuff.bind()

// F1. This will return the function 'deanStuff'.
// F2. deanStuff will still exist as its own function, but bind means that the 'this' keyword is set.
// F3. Correct. I'm correct because, unlike .call and .apply, bind won't execute the code immediately,
// it just returns a copy which can be called later.


// G -----------------------------
deanStuff.bind()()

// G1. The "experiment" string will be returned.
// G2. The window object will be logged.
// G3. Correct. I'm right because the first parenthesis accept a location for bind, and the second 
// set would call the function. 


// H -----------------------------
function() {
  console.log(this);
}

// H1. Error alert for poor syntax.
// H2. Nothing additional
// H3. Correct. SyntaxError: unexpected token '('. I think I'm right because this would 
// create a function floating in space, and it could never be called seeing as it's anonymous. 


// I -----------------------------
(function() {
  console.log(this);
})()

// I1. This will return "experiment" string, plus a log of the window object.
// I2. The window object will be logged.
// I3. Incorrect. Additional behaviour of 'undefined' was not detected. I do not know why this 
// undefined is being returned. 


// J -----------------------------
(function() {
  console.log(this);
}).bind()

// J1. This will return the function, not call it.
// J2. function will actually produce because it's wrapped in (), enabling it to run immediately.
// J3. Correct. This is right because bind is still attached to the function
// and it's being defined to be called later. Bind returns a copy.


// K -----------------------------
(function() {
  console.log(this);
}).bind()()

// K1. The function will return undefined. The function is being executed but nothing is running. 
// K2. The window object is being logged.
// K3. Correct. I expected undefined because nothing is being returned.
// THe function will be run, hence the logging. But nothing is returned.


// L -----------------------------
(function() {
  console.log(this);
  return "returned this thing";
}).apply()

// L1. Returns "returned this thing".  
// L2. Side effects are the window object is being logged to the console.
// L3. Correct. 


// M -----------------------------
(function() {
  console.log(this);
}).call()

// M1. This will return the window object.
// M2. A single undefined element.
// M3. Correct. But I only knew this because of the previous undefined element
// triggered through L. 


// N -----------------------------
var returnedValue = deanStuff();

// N1. This will return undefined. 
// N2. returnedValue will be set to "experiment". deanStuff is already available from earlier.
// N3. Incorrect. Window object would be logged too, this was missed from N2.
// Q: WHY is the window object logged in this example?

// O
(function() {
  console.log(this);
  return "returned this thing";
}).apply()

// O1. This will return "returned this thing". 
// O2. Window object will be logged. 'this' will not be changed by apply. 
// O3. Correct. 


// P
(function() {
  console.log(this);
  return "returned this thing";
  return "second return";
}).apply()

// O1. This will return "returned this thing". 
// O2. The second return function won't run. Only one thing can be returned from a function.
// Everything else would be a side effect, e.g. window log. 
// O3. Correct. It's the same as calling and running bind, or bind with ()().


// Problem areas: N.

// Gaps of understanding:
// - why is the window object logged here? 
