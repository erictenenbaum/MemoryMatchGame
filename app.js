(function () {

    const game = {
        numberArray: [1, 1, 2, 2, 3, 3, 4, 4, 5],
        revealedSquares: [], 
        foundMatches: 0,
        
               
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
                    clicked.css("background-color", "#1EABF1")
                    console.log(this.revealedSquares);

                    if(this.revealedSquares.length === 2){
                        console.log("Run checkForMatch()");                      
                        return this.checkForMatch();
                    }                   
                }
              


        },
        checkForMatch: function(){
            if(this.revealedSquares[0].dataShown === this.revealedSquares[1].dataShown && this.revealedSquares[0].dataValue !== this.revealedSquares[1].dataValue){
                console.log("same");                 
                return this.checkForWin();
           
            }
            else{
                console.log("different");
                console.log($("." + this.revealedSquares[0].dataValue)[0].children);

                setTimeout(()=>{
                    for(let i = 0; i < this.revealedSquares.length; i++) {
                        $("." + this.revealedSquares[i].dataValue)[0].children[0].hidden = true;
                        $("." + this.revealedSquares[i].dataValue).css("background-color", "white");
                    }    
                   return this.revealedSquares = [];
                }, 500);                
            }

            
        },

        checkForWin: function(){
            this.foundMatches++
            let totalMatches = ((this.numberArray.length - 1) / 2);
            console.log("************************")
            console.log(totalMatches);
            console.log(totalMatches - this.foundMatches);

            if(totalMatches - this.foundMatches > 0){
                return this.revealedSquares = [];
            }
            else{
                alert("You won the game!");
            }
            
        }
    }
    $(".square").on("click", function () {
        console.log($(this)[0].children[0].dataset.value);
        console.log($(this)[0].children[0].dataset.shown);
        game.revealHidden($(this));
    });

    // Starts the game by generating the hidden numbers behind the squares
    // generateHiddenNumbers takes in an array as a parameter. I pass in a function "shuffle" which returns a randomly shuffled array
    game.generateHiddenNumbers(game.shuffle(game.numberArray));
})();
