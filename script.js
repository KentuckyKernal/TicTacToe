$(document).ready(function(){
    var arr = [];
    var score = 0;
    var scoreBoard1 = 0;
    var scoreBoard1b = 0;
    var scoreBoard1c = 0;
    var scoreBoard2 = 0;
    var scoreBoard2b = 0;
    var scoreBoard2c = 0;
    var win = 0;

    $( ".line1" ).hide();
    $( ".line2" ).hide();
    $( ".line3" ).hide();
    $( ".line4" ).hide();
    $( ".line5" ).hide();
    $( ".line6" ).hide();
    $( ".line7" ).hide();
    $( ".line8" ).hide();

    var arraydisplay = $('.arraydisplay');
    arraydisplay.html('Click Reset to start Timer');
    var score1 = $( ".score1" );
    score1.html('Total moves: '+score);

    var modal = document.getElementById('myModal');
    var btn = document.getElementById("myBtn");
    var span = document.getElementsByClassName("close")[0];
    btn.onclick = function() {
        modal.style.display = "block";
    }
    span.onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }


    $(function() {
        var startTime = Date.now();
        var player = 2;
        var table = $('table');
        var messages = $('.messages');
        var turn = $('.turn');
        displayNextPlayer(turn, player);


        //---------------------------

        $('td').click(function() {
            //-------------time
            var endTime = Date.now();
            var difference = endTime - startTime;
            arr.push(difference);
            let x = arr.filter((element, index) => {
                return index % 2 === 0;
        })
            var sum = x.reduce(add, 0)/x.length;

            function add(a, b) {
                return a + b;
            }
            var arraydisplay = $('.arraydisplay');
            arraydisplay.html('Average move time: '+ parseFloat((sum/1000)).toFixed(2) + ' seconds.');
            ///--timer end
            //----------clickCount

            score +=1;
            var score1 = $( ".score1" );
            score1.html('Total moves: '+score);

            //----clickcount end

            td = $(this);
            var state = getState(td);
            if(!state) {
                var pattern = definePatternForCurrentPlayer(player);
                changeState(td, pattern);
                if(checkIfPlayerWon(table, pattern)) {
                    messages.html('Player '+player+' has won.');
                    turn.html('');

                    //--Championship stats


                    var id1 = $( '.id1' );
                    var id2 = $( '.id2' );

                    if(player == 2){
                        scoreBoard1 += 1;
                        scoreBoard2b += 1;
                        id1.html('Player 2 > wins: '+ scoreBoard1 + '   losses:           '+scoreBoard1b);
                        id2.html('Player 1 > wins: '+ scoreBoard2 + '   losses:           '+scoreBoard2b);
                    }
                    if(player == 1){
                        scoreBoard2 += 1;
                        scoreBoard1b += 1;
                        id2.html('Player 1 > Wins: '+ scoreBoard2 + '   Losses:           '+scoreBoard2b+'');
                        id1.html('Player 2 > Wins: '+ scoreBoard1 + '   Losses:           '+scoreBoard1b+'');
                    }

                    //--end

                } else {
                    player = setNextPlayer(player);
                    displayNextPlayer(turn, player);

                }
            } else {
                messages.html('This box is already checked.');
            }
        });

        //---------------------------

        $('.reset').click(function() {
            player = 2;
            messages.html('');
            reset(table);
            displayNextPlayer(turn, player);
            reset1();

        });

        function reset1() {
            arr =[];
            startTime = Date.now();
            score = 0;
            score2 = 0;
            var go = $('.go');
            go.html('GO!');

            var score1 = $( ".score1" );
            score1.html('Total moves: '+score);
        }

    });

//---------------------------

    function getState(td) {
        if(td.hasClass('cross') || td.hasClass('circle')) {
            return 1;
        } else {
            return 0;
        }
    }

//---------------------------

    function changeState(td, pattern) {
        return td.addClass(pattern);
    }

//---------------------------

    function definePatternForCurrentPlayer(player) {
        if(player == 2) {
            return 'cross';
        } else {
            return 'circle';
        }
    }

//---------------------------

    function setNextPlayer(player) {
        if(player == 2) {
            return player = 1;
        } else {
            return player = 2;
        }
    }

//---------------------------

    function displayNextPlayer(turn, player) {
        turn.html('Player turn : '+player);
    }

//--------------------//

    function checkIfPlayerWon(table, pattern) {
        var won = 0;
        if(table.find('.item1').hasClass(pattern) && table.find('.item2').hasClass(pattern) && table.find('.item3').hasClass(pattern)) {
            $( ".line1" ).fadeIn("slow");
            won = 1;
        } else if (table.find('.item1').hasClass(pattern) && table.find('.item4').hasClass(pattern) && table.find('.item7').hasClass(pattern)) {
            $( ".line2" ).fadeIn("slow");
            won = 1;
        } else if (table.find('.item1').hasClass(pattern) && table.find('.item5').hasClass(pattern) && table.find('.item9').hasClass(pattern)) {
            $( ".line3" ).fadeIn("slow");
            won = 1;
        } else if (table.find('.item4').hasClass(pattern) && table.find('.item5').hasClass(pattern) && table.find('.item6').hasClass(pattern)) {
            $( ".line4" ).fadeIn("slow");
            won = 1;
        } else if (table.find('.item7').hasClass(pattern) && table.find('.item8').hasClass(pattern) && table.find('.item9').hasClass(pattern)) {
            $( ".line5" ).fadeIn("slow");
            won = 1;
        } else if (table.find('.item2').hasClass(pattern) && table.find('.item5').hasClass(pattern) && table.find('.item8').hasClass(pattern)) {
            $( ".line6" ).fadeIn("slow");
            won = 1;
        } else if (table.find('.item3').hasClass(pattern) && table.find('.item6').hasClass(pattern) && table.find('.item9').hasClass(pattern)) {
            $( ".line7" ).fadeIn("slow");
            won = 1;
        } else if (table.find('.item3').hasClass(pattern) && table.find('.item5').hasClass(pattern) && table.find('.item7').hasClass(pattern)) {
            $( ".line8" ).fadeIn("slow")
            won = 1;
        }
        return won;
    }

//--------------------------------------//

    function reset(table) {
        table.find('td').each(function() {
            $(this).removeClass('circle').removeClass('cross');
            $( ".line1" ).hide();
            $( ".line2" ).hide();
            $( ".line3" ).hide();
            $( ".line4" ).hide();
            $( ".line5" ).hide();
            $( ".line6" ).hide();
            $( ".line7" ).hide();
            $( ".line8" ).hide();
        });
    }
});