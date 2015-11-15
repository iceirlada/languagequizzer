require(
["../jslibs/raphael.lonce"],

function () {

    var main = document.getElementById("main"); //main div containing input and quizzer divs
    var inputBox = document.getElementById("input"); //input div on the left

    var quizzerBox = document.getElementById("quizzer"); //quizzer div on the right
    quizzerBox.style.visibility = "hidden"; //hide quizzer div

    var language = document.getElementById("language"); //text to indicate language in quizzer div
    var wordlang = document.getElementById("wordlang"); //text to indicate language in input div
    var lang = prompt("What language do you want to test in this quiz?") || "[language not chosen]"; //input in prompt box is defined as lang, if there is no input, lang is defined as "[language not chosen]"

    //language-indicators in both the input and quizzer divs are defined as lang
    language.innerHTML = lang; 
    wordlang.innerHTML = lang;

    //spans to contain 'havefun' message when user is making the quizzer
    //and 'goodluck' message when user is using the quizzer
    var havefun = document.getElementById("havefun");    
    var goodluck = document.getElementById("goodluck");

    var inputDisplay = document.getElementById("inputdisplayDiv"); //div within input div to display words submitted
    var word = document.getElementById("word"); //textarea in input div to extract the input for 'word'
    var meaning = document.getElementById("meaning"); //textarea in input div to extract the input for 'meaning'
    var inputButton = document.getElementById("submit"); //button for submitting word and its corresponding meaning
    var doneButton = document.getElementById("done"); //button to finish making the quizzer and start using the quizzer

    var quizzerDisplay = document.getElementById("testdisplayDiv"); //div within quizzer div to display random quiz word from the word list
    var answer = document.getElementById("answer"); //textarea in quizzer div to extract the input for 'answer'
    var ansButton = document.getElementById("ansButton"); //button for submitting answer
    var result = document.getElementById("result"); //span to contain result of the answer, whether it's right or wrong
    var nextButton = document.getElementById("nextButton"); //button to continue to the next random quiz word from the word list

    var rightAns = new Audio("resources/correct.wav"); //audio for right answer
    var wrongAns = new Audio("resources/wrong.mp3"); //audio for wrong answer

    var newQuizButton = document.getElementById("newQuiz"); //button to refresh the page to make a new quizzer

    var wordlist = []; //create an empty list
    var x = 0; //variable x to add each new word as an array to the list, starting with the first word, which will be wordlist[0]
    var wordNum = 0; //word number to indicate how many words have been tested in the quizzer div
    var wordNumDisplay = document.getElementById("wordNum"); //span to contain the wordNum
    var totalWords = 0; //total number of words on wordlist, starting with 0 when no words have been submitted
    var totalWordsDisplay = document.getElementById("totalWords"); //span to contain totalWords
    var fintotalWords; //the constant total number of words on wordlist when the wordlist is finalised (user done with input)

    var score = 0; //the number of right answers, starting with 0
    var scoreDisplay = document.getElementById("scoreDisplay"); //span to contain the score

    main.style.position = "relative"; //setting style of main div as relative to set absolute positions for 'havefun' and 'goodluck' spans, since they are both not within either input or quizzer divs
    havefun.innerHTML = "<h3>Start by entering a few words<br>and their meanings.</h3><br><h2>Have fun creating<br>your quizzer! :)</h2>"; //setting innerHTML of 'havefun' span as the instructions and a friendly message to start off
    havefun.style.position = "absolute";
    havefun.style.left = "400px";
    havefun.style.top = "90px";

    inputBox.style.visibility = "visible"; //show input div
    newQuizButton.style.visibility = "hidden"; //hide button to start new quiz

    //event listener to execute block of code if inputButton is clicked
    inputButton.addEventListener("click",function(ev){
        if (word.value==="") { //error message if word textarea is blank
            alert("Error: Submission incomplete. Missing word.");
        } else if (meaning.value==="") { //error message if meaning textarea is blank
            alert("Error: Submission incomplete. Missing meaning.");
        } else { //if there's input for both word and meaning
            //xth array in wordlist initialised with 3 properties with random values: word, meaning, and string
            wordlist[x] = ({
                word: "anyword",
                meaning: "anymeaning",
                string: "anystring"
            });
            wordlist[x].word = word.value; //array's word property set as word input
            wordlist[x].meaning = meaning.value; //array's meaning property set as meaning input
            wordlist[x].string = word.value + " (" + meaning.value + ")"; //array's string property set as a string with both word and meaning inputs (to be displayed in the div displaying word list)
            console.log("wordlist[x].meaning is " + wordlist[x].meaning);
            console.log("wordlist[x].string is " + wordlist[x].string);
            inputDisplay.innerHTML += wordlist[x].string+"<br>"; //array's string property added to inputDisplay div's innerHTML with a line break (to display next array's string property on the next line)
            inputDisplay.scrollTop = inputDisplay.scrollHeight; //set scrollable inputDisplay div to show the bottom-most part of the div (where the most recently added word is shown)
            x++; //increase value of x by 1 to define the next array in wordlist

            totalWords++; //increase totalWords by 1
            console.log("totalWords = " + totalWords);
            totalWordsDisplay.innerHTML = totalWords; //totalWordsDisplay span's innerHTML set as totalWords
            fintotalWords = totalWords; //fintotalWords set as totalWords

            word.value=""; //clear word textarea
            meaning.value=""; //clear meaning textarea
        }               
    });

    //function to get a random integer between 2 numbers
    var getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    var randInt;
    randInt = getRandomInt(0, totalWords); //randInt set as a random number between 0 and totalWords (for first word only)

    //event listener to execute block of code if doneButton is clicked
    doneButton.addEventListener("click",function(ev){
        if (wordlist.length===0) { //error message if no words have been submitted (no arrays in wordlist)
            alert("Error: You can't use the quizzer without any words! Please enter at least one.");
        } else {
            havefun.style.visibility = "hidden"; //hide 'havefun' message
            quizzerBox.style.visibility = "visible"; //show quizzer div
            inputBox.style.visibility = "hidden"; //hide input div
            goodluck.innerHTML = "<h2>Good Luck!</h2>"; //setting innerHTML of 'goodluck' span as a good luck message
            goodluck.style.position = "absolute";
            goodluck.style.left = "120px";
            goodluck.style.top = "140px";
        }
        
        scoreDisplay.innerHTML = score; //scoreDisplay span's innerHTML set as the score
        
        console.log("totalWords is " + totalWords);
        console.log(wordlist[randInt].meaning + " is " + wordlist[randInt].word + " in Spanish");
        quizzerDisplay.innerHTML = wordlist[randInt].meaning; //quizzerDisplay div's innerHTML set as the value of the meaning property of a random array in wordlist

        wordNum++; //wordNum increases by 1
        wordNumDisplay.innerHTML = wordNum; //wordNumDisplay span's innerHTML set as wordNum
        nextButton.style.visibility="hidden"; //hide nextButton to make answering compulsory
    });

    //event listener to execute block of code if ansButton is clicked
    ansButton.addEventListener("click",function(ev){
        //answer is correct if input is the value of the word property of the array (since value of meaning property is quizzed)
        if (answer.value===wordlist[randInt].word) {
            result.innerHTML = "Correct!";
            rightAns.play(); //play right answer sound
            result.style.color = "#00CC00";
            score++; //increases score by 1
            scoreDisplay.innerHTML = score; //displays new score
        }
        //answer is wrong if input is NOT the value of the word property of the array
        if (answer.value!==wordlist[randInt].word) {
            result.innerHTML = "Incorrect! Ans: " + wordlist[randInt].word; //shows correct answer in addition to the result
            wrongAns.play(); //play wrong answer sound
            result.style.color = "#CC0000";
        }
        console.log("randInt is " + randInt);        
        wordlist.splice(randInt, 1); //removes an array at the (randInt)th position in wordlist
        console.log("list now contains " + wordlist);
        console.log("wordlist now has " + wordlist.length);
        nextButton.style.visibility="visible"; //show nextButton
        ansButton.style.visibility="hidden"; //hide ansButton

        if (wordlist.length===0) { //if there are no arrays left in wordlist (all arrays in wordlist have been tested)
            nextButton.style.visibility="hidden"; //hide nextButton
            newQuizButton.style.visibility = "visible"; //show newQuizButton
            alert("Congratulations, you got " + score + " out of " + fintotalWords + " words right!"); //alert box to show score
        }

    });

    //event listener to execute block of code if nextButton is clicked
    nextButton.addEventListener("click",function(ev){     
        result.innerHTML=""; //clear results
        answer.value=""; //clear answer textarea
        totalWords = totalWords-1; //reduce value of totalWords by 1 as one array had been removed from wordlist
        randInt = getRandomInt(0,totalWords); //randInt set as a random number between 0 and totalWords(updated)
        quizzerDisplay.innerHTML = wordlist[randInt].meaning; //quizzerDisplay div's innerHTML set as the value of the meaning property of a random array in wordlist

        wordNum++; //wordNum increases by 1
        wordNumDisplay.innerHTML = wordNum; //wordNumDisplay span's innerHTML set as wordNum

        nextButton.style.visibility="hidden"; //hide nextButton
        ansButton.style.visibility="visible"; //hide ansButton
        console.log("totalWords is " + totalWords);

    });

    //event listener to execute block of code if newQuizButton is clicked
    newQuizButton.addEventListener("click",function(ev){
        location.reload(); //reload page
    });

});

 

