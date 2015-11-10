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

// start a new round - jsfriendly
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

// Bring up time's up overlay and display points - js friendly
function timeUp(){
    var timeup = document.getElementById('timeup');
    timeup.firstChild.innerHTML = "TIME'S UP! You got " + correctAnswers + " points!";
    timeup.style.opacity = 100;
}

// reduce timer by 1 and trigger timeUp function when hitting 0 - js friendly
function tick(){
    secondsLeft -=1;
    document.getElementById('secondsLeft').innerHTML = secondsLeft;
    if(secondsLeft == 0){
        timeUp();
        clearInterval(timer);
    }
}

// Start a new game, resets timer & score, sets tick function to go off every second -js friendly
function newGame(){
    clearInterval(timer);
    correctAnswers = 0;
    document.getElementById('counter-correct').innerHTML = 'Correct answers: ' + correctAnswers;
    secondsLeft = 15;
    document.getElementById('secondsLeft').innerHTML = secondsLeft;
    timer = setInterval(tick, 1000);
    newRound();
}

// Turns some text white for hard mode - js friendly
function hardModeText(){
    if(hardMode){
        document.getElementById('instructions').style.color = 'white'
        document.getElementById('counter-correct').style.color = 'white'
        document.getElementById('hardModeBefore').style.color = 'white'
        document.getElementById('hardModeBox').style.border = '5px solid white'
    }else{
        document.getElementById('instructions').style.color = 'black'
        document.getElementById('counter-correct').style.color = 'black'
        document.getElementById('hardModeBefore').style.color = 'black'
        document.getElementById('hardModeBox').style.border = '5px solid black'
    }
}

// Randomly changes background color for each round during hardmode - js friendly
function hardModeBackground(){
    if(hardMode){
        getRandItemOf(colorNames);
        document.getElementById('wrapper').style.backgroundColor = randItem
        document.getElementById('secondsLeft').style.color = randItem
    }
    else{
        document.getElementById('wrapper').style.backgroundColor = 'black'
        document.getElementById('secondsLeft').style.color = 'black'
    }
}

var tutorialButton = document.getElementById('tutorial').lastChild;
tutorialButton.addEventListener('click', function(){
    console.log('button clicked');
});

//for testing, delete for proper usage
refreshArrays();
