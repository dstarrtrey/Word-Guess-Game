$(document).ready(function(){
    let myWord;
    let current="";
    let wins = 0;
    let guessesLeft;
    let lettersGuessed = "";
    const wordBank = {0: 'COWBOY', 1: 'RAGTIME', 2: 'SALOON', 3: 'BARFIGHT', 4: 'MUSTANG', 5: 'OUTLAW', 6: 'BUFFALO', 7: 'YODELER', 8: 'BRONCO', 9: 'COW', 10: 'RODEO', 11: 'STEER', 12: 'BUCKAROO', 13: 'SADDLE', 14: 'STEED', 15: 'LASSO', 16: 'STIRRUPS', 17: 'SPURS', 18: 'RANCH', 19: 'PISTOL',20: 'RAILROAD'};
    const newWordArr = () => wordBank[Math.floor(Math.random() * Object.keys(wordBank).length)].split("");    
    const setCharAt = (str,index,chr) => {
        if(index > str.length-1) return str;
        return str.substr(0,index) + chr + str.substr(index+1);
    }
    $("#wins").text(`Wins: ${wins}`);
    document.onkeyup = function(event){
        const input = event.key.toUpperCase();
        //Generates a new word
        if($("#current-word").hasClass("new-game")){
            $("#current-word-label").text("Current Word:");
            $("#letters-guessed").text("");
            $("#current-word").text(""); 
            myWord = newWordArr();
            current = "";
            lettersGuessed="";
            guessesLeft = 12;
            for (let x = 0; x < myWord.length; x++) {
                current+="_";
            }
            $("#current-word").text(current);
            $("#num-guesses-left").text(`Guesses left: ${guessesLeft}`);
            $("#current-word").removeClass("new-game");
            $("#current-word").removeClass("lose");
            $("#announcement").text("ALRIGHTY TEX, LET'S SEE WHAT YER MADE OF!");
            console.log(myWord);
        }else{
            //Makes sure the letter hasn't been guessed already and is a letter
            if (event.keyCode >= 65 && event.keyCode <= 90 && !lettersGuessed.includes(input)){
                lettersGuessed+=input;
                $("#letters-guessed").text(lettersGuessed);
                if(myWord.includes(input)){
                    while(myWord.includes(input)){
                        current = setCharAt(current, myWord.indexOf(input), input);
                        myWord[myWord.indexOf(input)] = false;
                    }
                    $("#current-word").text(current);
                    //When user wins, run code: 
                    if(!current.includes("_")){
                        wins++;
                        $("#wins").text(`Wins: ${wins}`);
                        $("#current-word").addClass("new-game");
                        $("#current-word-label").text("Press any key for a new word.");
                    }
                    $("#announcement").text("WOOWEE! GOOD SHOOTIN!");
                }else{
                    //If the user responds incorrectly
                    guessesLeft--;
                    $("#num-guesses-left").text(`Guesses left: ${guessesLeft}`);
                    if(guessesLeft > 0){
                        $("#announcement").text("OUCH! WATCH WHERE YER AIMIN THAT THING, PARTNER!");
                    }else{
                        $("#announcement").text("THE JIG IS UP. DARN SHAME TOO, YOU HAD POTENTIAL.");
                        $("#current-word").addClass("new-game");
                        wins = 0;
                        console.log(wins);
                        $("#wins").text(`Wins: ${wins}`);
                        for (let x = 0; x < myWord.length; x++) {
                            current = setCharAt(current, x, "ø");
                        }
                        $("#current-word").text(current);
                        $("#current-word").addClass("lose");
                    }
                }
            }
        }
    };
});