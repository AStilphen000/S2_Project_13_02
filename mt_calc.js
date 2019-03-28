"use strict";

/*
   New Perspectives on HTML5, CSS3 and JavaScript 6th Edition
   Tutorial 11
   Case Problem 2

   Author: Angelina Stilphen
   Date:   3.25.19
   
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






/* ===================================================================== */

function eraseChar(textStr) { 
   return textStr.substr(0, textStr.length - 1);
}

function evalEq(textStr, decimals) {
   var lines = textStr.split(/\r?\n/);
   var lastLine = lines[lines.length-1];
   var eqValue = eval(lastLine);
   return eqValue.toFixed(decimals);
}  

function lastEq(textStr) {
   var lines = textStr.split(/\r?\n/);
   var lastExp = lines[lines.length-2];
   return lastExp.substr(0, lastExp.indexOf("=")).trim();
}



// run the init function when the page loads 
window.onload = init; 

// created a block of code inside a function that is designed to preform the particular task assigned to it 
function init() {
      var calcButtons = document.getElementsByClassName("calcButton");

      // created for loop which runs the same code over and over again with different values, inside the for loop targetted the array calcButtons to switch onclick to buttonClick 
      for (var i = 0; i < calcButtons.length; i++) { 
            calcButtons[i].onclick =  buttonClick;
      }
      document.getElementById("calcWindow").onkeydown = calcKeys; 
}

// created another function inside the function are different variables to target to different values. Also inside the buttonClick function is a switch case that changes the buttons value (break ends a case)
function buttonClick(e) {
      var calcValue = document.getElementById("calcWindow").value;
      var calcDecimal = document.getElementById("decimals").value; 
      var buttonValue = e.target.value; 

      switch (buttonValue) {
            case "del":
                  calcValue = "";
                  break; 

                  case "bksp": 
                  calcValue = eraseChar(calcValue);
                  break;

                  case "enter":
                  calcValue = " = " + evalEq(calcValue, calcDecimal) + "\n";
                  break;

                  case "prev":
                  calcValue += " = " + lastEq(calcValue);
                  break;
            default:
                  calcValue += buttonValue; 
                  break;
            }
            document.getElementById("calcWindow").value = calcValue;
            document.getElementById("calcWindow").focus();
      } 

      // created a function named calcKeys that targets the variables calcValue and calcDecimal and creating a switch case to target the keys that the user presses. 
      function calcKeys(e) {
            var calcValue = document.getElementById("calcWindow").value;
            var calcDecimal = document.getElementById("decimals").value; 

            switch (e.key) {
                  case "Delete":
                  calcValue = ""; 
                        break;

                  case "Enter":
                  calcValue += " = " + evalEq(calcValue, calcDecimal);
                  break;

                  case "ArrowUp":
                  calcValue += lastEq(calcWindow.value);
                  break; 
                  default: 
                        break;
                        // this makes sure the switch keys actually work 
                        e.preventDefault();
            }
            document.getElementById("calcWindow").value = calcValue;
      }