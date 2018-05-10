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
                        "data-shown": array[i]
                    }
                )
                $("." + i).append(hiddenNumberDiv);
            }
        },
        revealHidden: function (clicked) {
            if (this.revealedSquares.length < 2) {
                this.revealedSquares.push(clicked[0].textContent);
                clicked[0].children[0].hidden = false;
                console.log(this.revealedSquares);
            }
            console.log(clicked);
            console.log(clicked.attributes)


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



        // game.revealHidden($(this));


    })

    game.generateHiddenNumbers(game.shuffle(game.numberArray));

   

})();
