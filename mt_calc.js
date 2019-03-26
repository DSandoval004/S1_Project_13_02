"use strict";

/*
   New Perspectives on HTML5, CSS3 and JavaScript 6th Edition
   Tutorial 11
   Case Problem 2

   Author: Diego Sandoval
   Date:   March 14, 2019 (03/14/19)
   
   Filename: mt_calc.js
	
   Functions List:

   init()
      Initializes the contents of the web page and sets up the
      event handlers
      
   buttonClick(e)
      Adds functions to the buttons clicked within the calcutlor
      
   calcKeys(e)
      Adds functions to key pressed within the calculator window 
      
   eraseChar(textStr)
      Erases the last character from the text string, textStr
      
   evalEq(textStr, decimals) 
      Evaluates the equation in textStr, returning a value to the number of decimals specified by the decimals parameter

   lastEq(textStr) 
      Returns the previous expression from the list of expressions in the textStr parameter

*/

// DDOES: Loads the int funtion when the browser window is loaded
window.onload = int;
// DFUNC: The int function
function int() {
      // DVARL: Local variables for this function
      var calcButtons = document.getElementsByClassName('calcButton'),
            calcWindow = document.getElementById('calcWindow');
      // DLOOP: Loops through the calcButton and adds an event listener for when they are clicked on
      for (var i = 0; i < calcButtons.length; i++) {
            calcButtons[i].addEventListener('click', buttonClick);
      }
      // DDOES: Listens for when the keyboard is pressed down and runs the calcKeys funtion when it is
      calcWindow.addEventListener('keydown', calcKeys);
};
// DFUNC: The buttonClick Function
function buttonClick(e) {
      // DVARL: Local variables for this function
      var calcValue = calcWindow.value,
            calcDecimal = document.getElementById('decimals').value,
            buttonValue = e.target.value;
      // DSWCA: Runs when the button are clicked and pases the event through each case
      switch (buttonValue) {
            case 'del':
                  // DDOES: Changes calcValue to an empty string
                  calcValue = "";
                  break;
            case 'bksp':
                  // DDOES: runs the eraseChar function then sets the calcValue to it
                  calcValue = eraseChar(calcValue);
                  break;
            case 'enter':
                  // DDOES: Adds the template String to the calcValue
                  calcValue += ` = ${evalEq(calcValue, calcDecimal)}\n`
                  break;
            case 'prev':
                  // DDOES: addds the value from lastEq to calcValue
                  calcValue += lastEq(calcValue);
                  break;
            default:
                  // DDOES: Adds the buttonValue to the calcValue
                  calcValue += buttonValue;
      }
      // DDOES: change the clacWindow value to equal calcValue
      calcWindow.value = calcValue;
      // DDOES: Changes where the pointer is
      calcWindow.focus()
};
// DFUNC: The calcKeys function
function calcKeys(e) {
      // DVARL: Local variables for this function
      var calcValue = calcWindow.value,
            calcDecimal = document.getElementById('decimals').value,
            eKeyCode = e.keyCode;
      console.log(eKeyCode)
      // DSWCA: Runs when the keys are pressed and pases the event through each case
      switch (eKeyCode) {
            case 8:
                  // DDOES: Changes calcValue to an empty string
                  calcValue = "";
                  break;
            case 13:
                  // DDOES: Adds the template String to the calcValue
                  calcValue += ` = ${evalEq(calcValue, calcDecimal)}`
                  break;
            case 38:
                  // DDOES: addds the value from lastEq to calcValue
                  calcValue += lastEq(calcWindow.value);
                  e.preventDefault()
                  break;
      }
      // DDOES: change the clacWindow value to equal calcValue
      calcWindow.value = calcValue;
}
/* ===================================================================== */

function eraseChar(textStr) {
      return textStr.substr(0, textStr.length - 1);
}

function evalEq(textStr, decimals) {
      var lines = textStr.split(/\r?\n/);
      var lastLine = lines[lines.length - 1];
      var eqValue = eval(lastLine);
      return eqValue.toFixed(decimals);
}

function lastEq(textStr) {
      var lines = textStr.split(/\r?\n/);
      var lastExp = lines[lines.length - 2];
      return lastExp.substr(0, lastExp.indexOf("=")).trim();
}