(function () {

    const game = {
        numberArray: [1, 1, 2, 2, 3, 3, 4, 4, 5],
        revealedSquares: [],
        matchedPairs: [],
        timerCounter: 0,
        shuffle: function (a) {
            var j, x, i;
            for (i = a.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                x = a[i];
                a[i] = a[j];
                a[j] = x;
            }
            return a;
        },
        generateRows: function(array){
            console.log(array);

            let numOfRows = array.length / 3;

            console.log("num of rows: " + numOfRows);

            for(let i = 0; i < numOfRows; i++){
                let rowDiv = $("<div>");

                rowDiv.attr(
                    {
                        "class": "row r" + i
                    }
                )

                $(".game").append(rowDiv);
            }
        },
        generateSquares: function(array){
            let numOfRow = array.length / 3;
            let currentRow = 0;
            let multOfThree = 0;
            for(let i = 0; i < array.length; i++){
                let squareDiv = $("<div>");
                squareDiv.attr(
                    {
                        "class": "square col-md-4 " + i
                    }
                )
                $(".r" + currentRow).append(squareDiv);

                multOfThree++;
                console.log("Mult of Three: ", multOfThree);

                if(multOfThree === 3){
                    currentRow++;
                    multOfThree = 0;
                    console.log("Current Row: ", currentRow);
                }

            }
        },
        generateHiddenNumbers: function (array) {

            for (let i = 0; i < array.length; i++) {
                let hiddenNumberDiv = $("<div>");
                hiddenNumberDiv.attr(
                    {
                        "class": "hidden",
                        "data-value": i,
                        "data-shown": array[i],
                        "hidden": true
                    }
                );

                hiddenNumberDiv.text(array[i]);
                $("." + i).append(hiddenNumberDiv);
            }
        },
        revealHidden: function (clicked) {
            this.revealedSquares.push(
                {
                    dataValue: clicked[0].children[0].dataset.value,
                    dataShown: clicked[0].children[0].dataset.shown
                }
            );
                if (this.revealedSquares.length < 3) {
                    
                    clicked[0].children[0].hidden = false;
                    clicked.css("background-color", "#1EABF1");

                    if (this.revealedSquares.length === 2) {
                      console.log("Run checkForMatch()");
                      return this.checkForMatch();
                    }                   
                }
        },
        checkForMatch: function(){
            console.log("Matched Pairs: " + this.matchedPairs);
            if(this.revealedSquares[0].dataShown === this.revealedSquares[1].dataShown
                && this.revealedSquares[0].dataValue !== this.revealedSquares[1].dataValue
                && !this.matchedPairs.includes(this.revealedSquares[0].dataShown)){
                console.log("same");
                this.matchedPairs.push(this.revealedSquares[0].dataShown);
                console.log("Matched Pairs: " + this.matchedPairs.length);

                for (let i = 0; i < this.revealedSquares.length; i++) {
                  $("." + this.revealedSquares[i].dataValue)
                    .removeClass("square")
                    .addClass("continueStyle");
                }
                return this.checkForWin();
            }
            else{
                console.log("different");
                // console.log($("." + this.revealedSquares[0].dataValue)[0].children);

                 setTimeout(function() {
                   for (let i = 0; i < game.revealedSquares.length; i++) {
                     $("." + game.revealedSquares[i].dataValue)[0].children[0].hidden = true;
                     $("." + game.revealedSquares[i].dataValue).css("background-color", "white");
                   }

                   return (game.revealedSquares = []);
                 }, 500);                 
            } 
        },
        checkForWin: function(){
            if(this.matchedPairs.length === (this.numberArray.length -1) / 2){
                setTimeout(()=>{
                    this.stopTimer();
                    alert("You won the game! it took this long: " + this.timerCounter);                   
                    this.restartGame();
                }, 250); 
            }
            else{
                this.revealedSquares = [];
            }
        },
        timer: function(){            

            setTimeout(()=>{
                this.timerCounter++;
                console.log("Counter: ", this.timerCounter);
                $(".DOMTimerHolder").text(this.timerCounter);
                this.timer();
            }, 1000);
        },
        stopTimer: function(){
            $(".DOMTimerHolder").removeClass("DOMTimerHolder").addClass("stoppedTimer");
        },
        startGame: function(){
            game.generateRows(game.numberArray);
            game.generateSquares(game.numberArray);
            game.generateHiddenNumbers(game.shuffle(game.numberArray));
            game.timer();
        },
        restartGame: function(){
            console.log("restarting game");
            this.revealedSquares = [];
            this.matchedPairs = [];
            this.timerCounter = 0;           
            for(let i = 0; i < this.numberArray.length; i++){
                $("." + i).empty();
                $("." + i).removeClass("continueStyle").addClass("square");
                $("." + i).css("background-color", "white");
            }

            $(".stoppedTimer").removeClass("stoppedTimer").addClass("DOMTimerHolder");
            

           return this.generateHiddenNumbers(this.shuffle(this.numberArray));
        }
    }
    $(".container").on("click", ".square", function () {
        console.log($(this));
        game.revealHidden($(this));
    });

    // Starts the game by generating the hidden numbers behind the squares
    // generateHiddenNumbers takes in an array as a parameter. I pass in a function "shuffle" which returns a randomly shuffled array
    game.startGame();


    
})();
