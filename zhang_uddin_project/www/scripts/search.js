//get user id from session
var user_id = sessionStorage.getItem('user_id');
user_id = parseInt(user_id);

//get set (edit) deck info from session
var setdeck = sessionStorage.getItem('setdeck');
//alert(setdeck);
setdeck = JSON.parse(setdeck);

//get user id from session
var user_id = getUserId();

//save list of card search results
var cardSearchResults = []

$(document).ready(function () {
    //if editing deck, display current deck
    if (setdeck !== null) {
        document.getElementById("editing-deck").innerHTML = "Editing deck: <strong><a href='viewdeck.html' id='move-to-viewdeck'>" + setdeck.deckname + "</a></strong>. Any card added will go to this deck.";
    }

    $("#card-search-btn").click(function () {
        //clear previous search results
        $('.row').html("");

        var cardname = $("#cardname").val();
        var clan = $("#clan").val();
        var grade = $("#grade").val();

        var searchCardsUrl = platform + "zhang_kevin_project2/searchcards.php";
        $.post(searchCardsUrl, { cardname: cardname, clan: clan, grade: grade }, function (data, textStatus) {
            //alert(JSON.stringify(data)); //for debugging

            //clear any current card search results
            cardSearchResults = [];
            //cardSearchResults.length = 0;

            //for each card, print info
            $.each(data, function (i, field) {
                var cards_id = field.cards_id;
                var name = field.name;
                var set = field.set;
                var imageFile = field.imageFile;
                // if image doesn't end in jpg, add jpg
                if (!imageFile.endsWith(".jpg")) {
                    imageFile = imageFile + ".jpg";
                }

                var clan = field.clan;
                var grade = field.grade;
                var type = field.type;

                var imagePath = "vanguardImages/" + imageFile;
                var onErrorPath = "vanguardImages/cfv_back.jpg";

                //push card to search results list
                var card = { cards_id: cards_id, name: name, set: set, imageFile: imageFile, clan: clan, grade: grade, type: type, imagePath: imagePath, onErrorPath: onErrorPath };
                cardSearchResults.push(card);

                var serverImageSource = platform + "zhang_kevin_project2/" + imagePath;
                var serverErrorSource = platform + "zhang_kevin_project2/" + onErrorPath;
                //add cardinfo boxes
                $(".row").append(
                    //card info
                    "<div class='cardinfo'>" +
                    "<img src='" + serverImageSource + "' id='card-image-" + i + "' class='card-image rounded' alt='" + name + "' onerror=this.src='" + serverErrorSource + "' style='width:100%'>" +

                    //modal div
                    "<div id= 'card-modal-" + i + "' class='modal' >" +
                    "<span class='close'>&times;</span>" +
                    "<img id='modal-image-" + i + "' class='modal-content'>" +
                    "</div>" +

                    "<div class='deckinfo-text'>" +
                    "<p>" +
                    "<strong>Name: </strong>" + name + "<br>" +
                    "<strong>Clan: </strong>" + clan + "<br>" +
                    "<strong>Grade/Skill: </strong>" + grade + "<br>" +
                    "</p>" +
                    "</div>" +

                    //add-cards selection
                    "<div class='form-group'>" +
                    "<p><strong>Number to Add: </strong>" +
                    "<select name='numberOfCards' id='num-cards-" + i + "'>" +
                    "<option value='1'>1</option>" +
                    "<option value='2'>2</option>" +
                    "<option value='3'>3</option>" +
                    "<option value='4'>4</option>" +
                    "</select>" +
                    "</p>" +
                    "</div>" +

                    //submission button
                    "<div class='form-group'>" +
                    "<button type='submit' name='add-card-btn' id='add-card-" + i + "' class='btn btn-primary btn-block btn-sm add-card-btn'>Add Cards</button>" +
                    "</div>" +

                    "</div>");
            });
        }, "json");
    })

    // command for the add card button
    $(document).on("click", ".add-card-btn", function () {
        var currentCardId = this.id;
        //currentCardId = currentCardId[currentCardId.length - 1]; //get last character of array (the number)
        currentCardId = currentCardId.split('-')[2]; //get last number in id
        //convert id string to int
        currentCardId = parseInt(currentCardId);

        var numCardsId = "#num-cards-" + currentCardId;

        var numCards = $(numCardsId).val();

        //alert(numCards);

        var deck_id = setdeck.deck_id;
        var cards_id = cardSearchResults[currentCardId].cards_id;
        var cardname = cardSearchResults[currentCardId].name;
        var deckname = setdeck.deckname;

        //send number and card id to php w/ ajax post
        var addCardsUrl = platform + "zhang_kevin_project2/addcards.php";
        $.post(addCardsUrl, { numCards: numCards, cards_id: cards_id, deck_id: deck_id });
        //print message about adding cards
        if (numCards == 1) {
            alert("Added " + numCards + " copy of " + cardname + " to " + deckname + ".");
        }
        else {
            alert("Added " + numCards + " copies of " + cardname + " to " + deckname + ".");
        }
        //document.getElementById("added-cards").innerHTML = "Added <strong>" + numCards + "</strong> copies of <strong>" + cardname + "</strong> to <strong>" + deckname + ".</strong>";
        //scroll to top
        //$('html, body').animate({ scrollTop: 0 }, 'fast');
    });

    $(document).on("click", "#move-to-viewdeck", function () {
        //save view deck info into session variables
        sessionStorage.setItem('viewdeck', JSON.stringify(setdeck));

        location.href = "viewdeck.html";
    });
})