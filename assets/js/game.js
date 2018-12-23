$(document).ready(function(){
    const currentDiv = $("#current-word");
    const currentLabel = $("#current-word-label");
    const lettersGuessedDiv = $("#letters-guessed");
    const guessesLeftDiv = $("#num-guesses-left");
    const announcement = $("#announcement");
    const winsDiv = $("#wins");
    const neigh = new Audio("assets/sounds/neigh.wav");
    const cows = new Audio("assets/sounds/cows.wav");
    const spurs = new Audio("assets/sounds/spurs.wav");
    const ricochet = new Audio("assets/sounds/ricochet.wav");
    const gunshot = new Audio("assets/sounds/gunshot.wav");
    const themeMusic = new Audio("assets/sounds/theme_music.wav");
    const gunFight = new Audio("assets/sounds/gun_fight.wav");
    const GAME = {
        myWord: "",
        current: "",
        wins: 0,
        guessesLeft: 0,
        wordBank: {
            0: 'COWBOY', 1: 'RAGTIME', 2: 'SALOON', 3: 'RUCKUS', 4: 'MUSTANG', 5: 'OUTLAW', 6: 'BUFFALO', 7: 'YODELER', 8: 'BRONCO', 9: 'COW', 10: 'RODEO', 11: 'STEER', 12: 'BUCKAROO', 13: 'SADDLE', 14: 'STEED', 15: 'LASSO', 16: 'STIRRUPS', 17: 'SPURS', 18: 'RANCH', 19: 'PISTOL',20: 'RAILROAD', 21: 'PONCHO', 22: 'REPUBLICAN', 23: 'BULLET'
        },
        newWordArr: function(){
            return this.wordBank[Math.floor(Math.random() * Object.keys(this.wordBank).length)].split("");
        },
        setCharAt: (str, index, chr) => {
            if(index > str.length-1) return str;
            return str.substr(0,index) + chr + str.substr(index+1);
        },
        setDefaults: function(){
            winsDiv.text(`Wins: ${this.wins}`);
        },
        tumbleweedLoop: function(){
            $('#tumbleweed').css({left:0});
            $('#tumbleweed').animate ({
                left: '+=88%',
            }, 5000, 'linear', function() {
                GAME.tumbleweedLoop();
            });
        },
        newGame: function(){
            currentLabel.text("Current Word:");
            lettersGuessedDiv.text("");
            currentDiv.text(""); 
            this.myWord = this.newWordArr();
            this.current = "";
            this.lettersGuessed="";
            this.guessesLeft = 12;
            for (let x = 0; x < this.myWord.length; x++) {
                this.current+="_";
            }
            currentDiv.text(this.current);
            guessesLeftDiv.text(`Guesses left: ${this.guessesLeft}`);
            currentDiv.removeClass("new-game");
            currentDiv.removeClass("lose");
            announcement.text("ALRIGHTY TEX, LETS SEE WHAT YER MADE OF!");
        },
        guess: function(guess){
            this.lettersGuessed+=guess;
            lettersGuessedDiv.text(this.lettersGuessed);
            if(this.myWord.includes(guess)){
                gunshot.play();
                while(this.myWord.includes(guess)){
                    this.current = this.setCharAt(this.current, this.myWord.indexOf(guess), guess);
                    this.myWord[this.myWord.indexOf(guess)] = false;
                }
                currentDiv.text(this.current);
                //When user wins, run code: 
                if(!this.current.includes("_")){
                    if(this.current==="STEED"||this.current==="MUSTANG"||this.current==="BRONCO"){
                        neigh.play();
                    }
                    if(this.current==="COW"||this.current==="COWBOY"||this.current==="STEER"||this.current==="RODEO"){
                        cows.play();
                    }
                    if(this.current==="PISTOL"||this.current==="RUCKUS"||this.current==="SALOON"||this.current==="OUTLAW"||this.current==="BULLET"||this.current==="REPUBLICAN"){
                        gunFight.play();
                    }
                    spurs.play();
                    this.wins++;
                    winsDiv.text(`Wins: ${this.wins}`);
                    currentDiv.addClass("new-game");
                    currentLabel.text("Press any key for a new word.");
                }
                announcement.text("WOOWEE! GOOD SHOOTIN!");
            }else{
                //If the user responds incorrectly
                this.guessesLeft--;
                ricochet.play();
                guessesLeftDiv.text(`Guesses left: ${this.guessesLeft}`);
                if(this.guessesLeft > 0){
                    announcement.text("OUCH! WATCH WHERE YER AIMIN THAT THING, PARTNER!");
                }else{
                    announcement.text("THE JIG IS UP. DARN SHAME TOO, YOU HAD POTENTIAL.");
                    currentDiv.addClass("new-game");
                    this.wins = 0;
                    winsDiv.text(`Wins: ${this.wins}`);
                    for (let x = 0; x < this.myWord.length; x++) {
                        this.current = this.setCharAt(this.current, x, "ø");
                    }
                    currentDiv.text(this.current);
                    currentDiv.addClass("lose");
                }
            }
        }
    };
    GAME.setDefaults();
    GAME.tumbleweedLoop();
    document.onkeyup = function(event){
        themeMusic.play();
        const input = event.key.toUpperCase();
        //Generates a new word
        if(currentDiv.hasClass("new-game")){
            GAME.newGame();  
        }else{
            //Makes sure the letter hasn't been guessed already and is a letter
            if (event.keyCode >= 65 && event.keyCode <= 90 && !GAME.lettersGuessed.includes(input)){
                GAME.guess(input);
            }
        }
    };
});