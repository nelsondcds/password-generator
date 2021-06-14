// Assignment Code
var generateBtn = document.querySelector("#generate");

var charset = "";
var charsetKey = 0;
var lowercaseCharset = "abcdefghijklmnopqrstuvwxyz";
var uppercaseCharset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var numericCharset = "0123456789";
var specialCharset = " " + "!" + "\"" + "#" + "$" + "%" + "&" + "'" + "(" + ")" + "*" + "+" + "," + "-" + "." + "/" +
":" + ";" + "<" + "=" + ">" + "?" + "@" + "[" + "\\" + "]" + "^" + "_" + "`" + "{" + "|" + "}" + "~";

var resetCharset = function() {

  charset = "";

};

var passwordLength = function () {

  var passLength = window.prompt("What length would you like your password to be?" + 
  " Please enter a number between 8 and 128 to indicate how many characters you would like your password.")

  if (passLength === "" || passLength === null || isNaN(passLength)) {
    window.alert("You need to provide a valid number! Please try again.");
    return passwordLength();
  } 
  
  passLength = parseInt(passLength);

  if (8 > passLength || passLength > 128) {
    window.alert("You need to provide a number within the valid range! Please try again.");
    return passwordLength();
  }

  return passLength;
}

var generatePassword = function () {

  tempPassword = ""

  var criteria = {
    length: passwordLength(),
    lowercase: window.confirm("Would you like to include lowercase letters?"),
    uppercase: window.confirm("Would you like to include uppercase letters?"),
    numeric: window.confirm("Would you like to include numbers?"),
    specialCharacters: window.confirm("Would you like to include special characters?")
  }

  if (!criteria.lowercase && !criteria.uppercase && !criteria.numeric && !criteria.specialCharacters) {
    window.alert("With the criteria you have chosen, no characters would be valid for use to generate your password. Please begin again.");
    return generatePassword();
  }

  var possibleCriteria = [
    criteria.lowercase && criteria.uppercase && criteria.numeric && criteria.specialCharacters,
    criteria.lowercase && criteria.uppercase && criteria.numeric,
    criteria.lowercase && criteria.uppercase && criteria.specialCharacters,
    criteria.lowercase && criteria.numeric && criteria.specialCharacters,
    criteria.uppercase && criteria.numeric && criteria.specialCharacters,
    criteria.lowercase && criteria.uppercase,
    criteria.lowercase && criteria.numeric,
    criteria.lowercase && criteria.specialCharacters,
    criteria.uppercase && criteria.numeric,
    criteria.uppercase && criteria.specialCharacters,
    criteria.numeric && criteria.specialCharacters,
    criteria.lowercase,
    criteria.uppercase,
    criteria.numeric,
    criteria.specialCharacters,
  ];

  for (var i = 0; i < possibleCriteria.length; i++) {
    if (possibleCriteria[i]) {
      charsetKey = i;
      break;
    }
  }

  switch (charsetKey) {
    case 0:
      charset += lowercaseCharset + uppercaseCharset + numericCharset + specialCharset;
      break;
    case 1:
      charset += lowercaseCharset + uppercaseCharset + numericCharset;
      break;
    case 2:
      charset += lowercaseCharset + uppercaseCharset + specialCharset;
      break;
    case 3:
      charset += lowercaseCharset + numericCharset + specialCharset;
      break;
    case 4:
      charset += uppercaseCharset + numericCharset + specialCharset;
      break;
    case 5:
      charset += lowercaseCharset + uppercaseCharset;
      break;
    case 6:
      charset += lowercaseCharset + numericCharset;
      break;
    case 7:
      charset += lowercaseCharset + specialCharset;
      break;
    case 8:
      charset += uppercaseCharset + numericCharset;
      break;
    case 9:
      charset += uppercaseCharset + specialCharset;
      break;
    case 10:
      charset += numericCharset + specialCharset;
      break;
    case 11:
      charset += lowercaseCharset;
      break;
    case 12:
      charset += uppercaseCharset;
      break;
    case 13:
      charset += numericCharset;
      break;
    case 14:
      charset += specialCharset;
      break;
  }

  for (var i = 0, j = charset.length; i < criteria.length; i++) {
    tempPassword += charset.charAt(Math.floor(Math.random() * j));
  }

  resetCharset();

  return tempPassword;
};

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
  
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
