//variables - js friendly
var randIndex;
var randItem;
var targetWord;
var colorNames = ["red", "darkorange", "limegreen", "dodgerblue", "rebeccapurple", "hotpink"]
var classBank = ["red", "blue", "purple", "green", "orange", "pink"];
var textBank = ["Red", "Blue", "Purple", "Green", "Orange", "Pink"];
var className = [];
var textName = [];
var randClassName;
var randTextName;
var classNameUsed;
var textNameUsed;
var correctAnswers = 0;
var secondsLeft = 15;
var timer;
var hardMode = false;

//get random index number - js friendly
function getRandIndexOf(array){
    randIndex = Math.floor(Math.random() * array.length);
      console.log('getRandIndexOf: set var "randIndex" to: ' + randIndex)
}

//get random item number - js friendly
function getRandItemOf(array){
    randItem = array[Math.floor(Math.random() * array.length)];
      console.log('getRandItemOf: set var "randItem" to: ' + randItem)
}

//populate or refresh working arrays from array bank - js friendly
function refreshArrays(){
    className = classBank.slice();
    textName = textBank.slice();
}

//Set target word function - js friendly
function setTargetWord(){
    //set target word variable and inner html
    getRandIndexOf(textName);
    targetWord = textName[randIndex]
      console.log('Set var "targetWord" to ' + targetWord);
    document.getElementById("target").innerHTML = targetWord;
      console.log('Changed Target Word inner html to ' + targetWord);

    //set target word class
    getRandIndexOf(className);
    document.getElementById("target").className = className[randIndex];
      console.log('Changed Target Word class (color) to ' + className[randIndex]);

    //redo function if target word text matches color to ensure they don't match
    if(document.getElementById("target").className === document.getElementById("target").innerHTML.toLowerCase()){
    setTargetWord();
    }
}

//Set up Variables - js friendly
function setButtonVariables(){
    //Set random class name from class array
    getRandIndexOf(className);
    randClassName = className[randIndex];
      console.log('Set var "randClassName" to ' + className[randIndex]);
    classNameUsed = randIndex;
      console.log('Set var "classNameUsed" to ' + randIndex);
    //Set random text from text array
    getRandIndexOf(textName);
    randTextName = textName[randIndex];
      console.log('Set var "randTextName" to ' + textName[randIndex]);
    textNameUsed = randIndex;
      console.log('Set var "textNameUsed" to ' + randIndex);
}

//create color button - js friendly
function createColorButtons(){
    var div = document.createElement("div");
    div.className = randClassName
    div.innerHTML = randTextName
    if(hardMode){
        getRandItemOf(colorNames);
        var boxShadowValue = '0px 5px 0px ' + randItem;
        div.style.borderColor = randItem;
        div.style.boxShadow = boxShadowValue
    }
    document.getElementById("colors").appendChild(div);
}

//removed Used array values - js friendly
function removeUsedValues(){
    className.splice(classNameUsed, 1);
    textName.splice(textNameUsed, 1);
}

function newRound(){
    refreshArrays();
    setTargetWord();
    //Remove previous buttons
    var colors = document.getElementById('colors')
    while(colors.firstChild) {
    colors.removeChild(colors.firstChild);
    }

    if(hardMode){
        hardModeBackground();
    }
    for(i=0; i<6; i+=1){
        setButtonVariables();
        //Check to make sure they aren't the same
        if(randClassName === randTextName.toLowerCase()){
            newRound();
        }else{
            createColorButtons();
            removeUsedValues();
        }
    }
}

//for testing, delete for proper usage
refreshArrays();
