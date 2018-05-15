(function () {
    const game = {
        numberArray: [1, 1, 2, 2, 3, 3, 4, 4, 5],
        revealedSquares: [],
        matchedPairs: [],
        timerCounter: 0,
        fastestTime: 0,  
        timerVar: "timerVar",      
        shuffle: function(a){
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
            let numOfRows = array.length / 3;           

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
                );
                $(".r" + currentRow).append(squareDiv);

                multOfThree++;                

                if(multOfThree === 3){
                    currentRow++;
                    multOfThree = 0;                 
                }
            }
        },
        generateHiddenNumbers: function(array) {
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
        revealHidden: function(clicked){
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
                      return this.checkForMatch();
                    }                   
                }
        },
        checkForMatch: function(){            
            if(this.revealedSquares[0].dataShown === this.revealedSquares[1].dataShown
                && this.revealedSquares[0].dataValue !== this.revealedSquares[1].dataValue
                && !this.matchedPairs.includes(this.revealedSquares[0].dataShown)){
                console.log("same");
                this.matchedPairs.push(this.revealedSquares[0].dataShown);    

                for (let i = 0; i < this.revealedSquares.length; i++) {
                  $("." + this.revealedSquares[i].dataValue)
                    .removeClass("square")
                    .addClass("continueStyle");
                }
                return this.checkForWin();
            }
            else{
                console.log("different");        

                 setTimeout(()=> {
                   for (let i = 0; i < this.revealedSquares.length; i++) {
                     $("." + this.revealedSquares[i].dataValue)[0].children[0].hidden = true;
                     $("." + this.revealedSquares[i].dataValue).css("background-color", "white");
                   }

                   return this.revealedSquares = [];
                 }, 250);                 
            } 
        },
        checkForWin: function(){
            if(this.matchedPairs.length === (this.numberArray.length -1) / 2){
                setTimeout(()=>{                  
                    alert(`You won the game! It took you ${this.timerCounter} seconds`);
                    this.stopTimer();
                    this.setFastestTime();                  
                    this.restartGame();
                }, 250); 
            }
            else{
              return this.revealedSquares = [];
            }
        },
        timer: function(){             
           this.timerVar = setTimeout(()=>{
                this.timerCounter++;              
                $(".DOMTimerHolder").text(this.timerCounter);
               return this.timer();
            }, 1000);
        },
        stopTimer: function(){
            // $(".DOMTimerHolder").removeClass("DOMTimerHolder").addClass("stoppedTimer");
            clearTimeout(this.timerVar)
        },
        setFastestTime: function(){
            let currentTime = this.timerCounter;

            if(this.fastestTime > 0 && this.fastestTime < currentTime){
                $(".DOMFastestTime").text(this.fastestTime);
            }
            else{                
                $(".DOMFastestTime").text(currentTime);
                this.fastestTime = currentTime;
            }
        },
        startGame: function(){
            this.generateRows(this.numberArray);
            this.generateSquares(this.numberArray);
            this.generateHiddenNumbers(this.shuffle(this.numberArray));
            this.timer();
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
                $("." + i).hover(function(){
                    $(this).css("background-color", "#83e8f5")
                }, function(){
                    $(this).css("background-color", "white");
                })
            }
            this.timer();
            // $(".stoppedTimer").removeClass("stoppedTimer").addClass("DOMTimerHolder");
            return this.generateHiddenNumbers(this.shuffle(this.numberArray));
        }
    }
    $(".game").on("click", ".square", function() {      
        game.revealHidden($(this));
    });
    
    game.startGame();    
})();
