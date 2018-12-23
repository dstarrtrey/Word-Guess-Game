$(document).ready(function(){
    const currentDiv = $("#current-word");
    const currentLabel = $("#current-word-label");
    const lettersGuessedDiv = $("#letters-guessed");
    const guessesLeftDiv = $("#num-guesses-left");
    const announcement = $("#announcement");
    const winsDiv = $("#wins");
    let myWord;
    let current="";
    let wins = 0;
    let guessesLeft;
    let lettersGuessed = "";
    const wordBank = {0: 'COWBOY', 1: 'RAGTIME', 2: 'SALOON', 3: 'BARFIGHT', 4: 'MUSTANG', 5: 'OUTLAW', 6: 'BUFFALO', 7: 'YODELER', 8: 'BRONCO', 9: 'COW', 10: 'RODEO', 11: 'STEER', 12: 'BUCKAROO', 13: 'SADDLE', 14: 'STEED', 15: 'LASSO', 16: 'STIRRUPS', 17: 'SPURS', 18: 'RANCH', 19: 'PISTOL',20: 'RAILROAD', 21: 'PONCHO'};
    const newWordArr = () => wordBank[Math.floor(Math.random() * Object.keys(wordBank).length)].split("");    
    const setCharAt = (str,index,chr) => {
        if(index > str.length-1) return str;
        return str.substr(0,index) + chr + str.substr(index+1);
    }
    winsDiv.text(`Wins: ${wins}`);
    function tumbleweedLoop() {
        $('#tumbleweed').css({left:0});
        $('#tumbleweed').animate ({
            left: '+=88%',
        }, 5000, 'linear', function() {
            tumbleweedLoop();
        });
    }    
    tumbleweedLoop();
    document.onkeyup = function(event){
        const input = event.key.toUpperCase();
        //Generates a new word
        if(currentDiv.hasClass("new-game")){
            currentLabel.text("Current Word:");
            lettersGuessedDiv.text("");
            currentDiv.text(""); 
            myWord = newWordArr();
            current = "";
            lettersGuessed="";
            guessesLeft = 12;
            for (let x = 0; x < myWord.length; x++) {
                current+="_";
            }
            currentDiv.text(current);
            guessesLeftDiv.text(`Guesses left: ${guessesLeft}`);
            currentDiv.removeClass("new-game");
            currentDiv.removeClass("lose");
            announcement.text("ALRIGHTY TEX, LET'S SEE WHAT YER MADE OF!");
            console.log(myWord);
        }else{
            //Makes sure the letter hasn't been guessed already and is a letter
            if (event.keyCode >= 65 && event.keyCode <= 90 && !lettersGuessed.includes(input)){
                lettersGuessed+=input;
                lettersGuessedDiv.text(lettersGuessed);
                if(myWord.includes(input)){
                    while(myWord.includes(input)){
                        current = setCharAt(current, myWord.indexOf(input), input);
                        myWord[myWord.indexOf(input)] = false;
                    }
                    currentDiv.text(current);
                    //When user wins, run code: 
                    if(!current.includes("_")){
                        wins++;
                        winsDiv.text(`Wins: ${wins}`);
                        currentDiv.addClass("new-game");
                        currentLabel.text("Press any key for a new word.");
                    }
                    announcement.text("WOOWEE! GOOD SHOOTIN!");
                }else{
                    //If the user responds incorrectly
                    guessesLeft--;
                    guessesLeftDiv.text(`Guesses left: ${guessesLeft}`);
                    if(guessesLeft > 0){
                        announcement.text("OUCH! WATCH WHERE YER AIMIN THAT THING, PARTNER!");
                    }else{
                        announcement.text("THE JIG IS UP. DARN SHAME TOO, YOU HAD POTENTIAL.");
                        currentDiv.addClass("new-game");
                        wins = 0;
                        winsDiv.text(`Wins: ${wins}`);
                        for (let x = 0; x < myWord.length; x++) {
                            current = setCharAt(current, x, "ø");
                        }
                        currentDiv.text(current);
                        currentDiv.addClass("lose");
                    }
                }
            }
        }
    };
});