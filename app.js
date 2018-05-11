(function () {

    const game = {
        numberArray: [1, 1, 2, 2, 3, 3, 4, 4, 5],
        revealedSquares: [],
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
                        setTimeout(function(){
                            game.checkForMatch()
                        }, 500);                        
                    }                   
                }
              


        },
        checkForMatch: function(){
            if(this.revealedSquares[0].dataShown === this.revealedSquares[1].dataShown){
                console.log("same");
               return this.revealedSquares = [];
            }
            else{
                console.log("different");
                console.log($("." + this.revealedSquares[0].dataValue)[0].children);

                for(let i = 0; i < this.revealedSquares.length; i++) {
                    $("." + this.revealedSquares[i].dataValue)[0].children[0].hidden = true;
                    $("." + this.revealedSquares[i].dataValue).css("background-color", "white");
                }

               return this.revealedSquares = [];
                
            }

            
        }
    }
    $(".square").on("click", function () {
        //    alert("hello");

        console.log($(this)[0].children[0].dataset.value);
        console.log($(this)[0].children[0].dataset.shown);
        // console.log($(this)[0].children)
        // console.log($(this)[0].children[0].hidden);


        // $(this)[0].children[0].attr("hidden", "false");



        // if($(this)[0].children[0].hidden){
        //     $(this)[0].children[0].hidden = false;
        // }
        // else{
        //     $(this)[0].children[0].hidden = true;
        // }



        game.revealHidden($(this));


    })

    game.generateHiddenNumbers(game.shuffle(game.numberArray));

   

})();
