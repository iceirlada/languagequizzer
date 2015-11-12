require(
["../jslibs/raphael.lonce"],

function () {

    var language = document.getElementById("language");
    var lang = prompt("What language do you want to test in this quiz?");
    var lang = lang || "[language not chosen]";

    var main = document.getElementById("main");
    var goodluck = document.getElementById("goodluck");
    var havefun = document.getElementById("havefun");

    var inputBox = document.getElementById("input");
    var inputDisplay = document.getElementById("inputdisplayDiv");
    var word = document.getElementById("word");
    var meaning = document.getElementById("meaning");
    var inputButton = document.getElementById("submit");
    var doneButton = document.getElementById("done");

    var quizzerBox = document.getElementById("quizzer");
    var quizzerDisplay = document.getElementById("testdisplayDiv");
    var result = document.getElementById("result");
    var answer = document.getElementById("answer");
    var ansButton = document.getElementById("ansButton");
    var nextButton = document.getElementById("nextButton");

    var newQuizButton = document.getElementById("newQuiz");

    language.innerHTML = lang;
    wordlang.innerHTML = lang;

    var wordlist = [];
    var x = 0;
    var wordNum = 0;
    var wordNumDisplay = document.getElementById("wordNum");
    var totalWords = 0;
    var totalWordsDisplay = document.getElementById("totalWords");

    var score;
    score = 0;
    var scoreDisplay = document.getElementById("scoreDisplay");

    quizzerBox.style.visibility = "hidden";

    main.style.position = "relative";
    havefun.innerHTML = "<h2>Have fun creating<br>your quizzer! :)</h2>";
    havefun.style.position = "absolute";
    havefun.style.left = "425px";
    havefun.style.top = "110px";

    inputBox.style.visibility = "visible";
    newQuizButton.style.visibility = "hidden";

    inputButton.addEventListener("click",function(ev){
        if (word.value==="") {
            alert("Error: Submission incomplete. Missing word.");
        } else if (meaning.value==="") {
            alert("Error: Submission incomplete. Missing meaning.");
        } else {
            wordlist[x] = ({
                word: "anyword",
                meaning: "anymeaning",
                string: "anystring"
            });
            wordlist[x].word = word.value;
            wordlist[x].meaning = meaning.value;
            wordlist[x].string = word.value + " (" + meaning.value + ")";
            console.log("wordlist[x].meaning is " + wordlist[x].meaning);
            console.log("wordlist[x].string is " + wordlist[x].string);
            inputDisplay.innerHTML += wordlist[x].string+"<br>";
            x++;

            totalWords++;
            console.log("totalWords = " + totalWords);
            totalWordsDisplay.innerHTML = totalWords;

            word.value="";
            meaning.value=""; 
        }               
    });

    var getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    var randInt;
    randInt = getRandomInt(0, totalWords);

    doneButton.addEventListener("click",function(ev){
        if (wordlist.length===0) {
            alert("You can't use the quizzer without any words! Please enter at least one.");
        } else {
            havefun.style.visibility = "hidden";
            quizzerBox.style.visibility = "visible";
            inputBox.style.visibility = "hidden";
            goodluck.innerHTML = "<h2>Good Luck!</h2>";
            goodluck.style.position = "absolute";
            goodluck.style.left = "120px";
            goodluck.style.top = "140px";
        }
        
        scoreDisplay.innerHTML = score;
        
        console.log("totalWords is " + totalWords);
        console.log(wordlist[randInt].meaning + " is " + wordlist[randInt].word + " in Spanish");
        quizzerDisplay.innerHTML = wordlist[randInt].meaning;

        wordNum++;
        wordNumDisplay.innerHTML = wordNum;
        nextButton.style.visibility="hidden";
    });

    ansButton.addEventListener("click",function(ev){
        if (answer.value===wordlist[randInt].word) {
            result.innerHTML = "Correct!";
            result.style.color = "#00CC00";
            score++;
            scoreDisplay.innerHTML = score;
        }
        if (answer.value!==wordlist[randInt].word) {
            result.innerHTML = "Incorrect! Ans: " + wordlist[randInt].word;
            result.style.color = "#CC0000";
        }
        console.log("randInt is " + randInt);        
        wordlist.splice(randInt, 1);
        console.log("list now contains " + wordlist);
        console.log("wordlist now has " + wordlist.length);
        nextButton.style.visibility="visible";
        ansButton.style.visibility="hidden"; 

        if (wordlist.length===0) {
            nextButton.style.visibility="hidden"; 
            newQuizButton.style.visibility = "visible";
        }

    });

    nextButton.addEventListener("click",function(ev){     
        result.innerHTML="";
        answer.value="";
        totalWords = totalWords-1;
        randInt = getRandomInt(0,totalWords);
        quizzerDisplay.innerHTML = wordlist[randInt].meaning;

        wordNum++;
        wordNumDisplay.innerHTML = wordNum;

        nextButton.style.visibility="hidden";
        ansButton.style.visibility="visible"; 
        console.log("totalWords is " + totalWords);

    });

    newQuizButton.addEventListener("click",function(ev){
        location.reload();
    });

});

 

