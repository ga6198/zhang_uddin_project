//get user id from session
var user_id = sessionStorage.getItem('user_id');
user_id = parseInt(user_id);

//get view deck info from session
var viewdeck = sessionStorage.getItem('viewdeck');
//alert(viewdeck);
viewdeck = JSON.parse(viewdeck);

//get user id from session
var user_id = getUserId();

//hold cards in deck
var deckCards = [];

$(document).ready(function () {
    //print deck name

    //title and creator information
    document.getElementById("added-deck").innerHTML = viewdeck.deckname;
    document.getElementById("desc").innerHTML = viewdeck.description;

    var creator = viewdeck.creator;
    var serverProfile = platform + "zhang_kevin_project2/profileImages/" + viewdeck.creator_pic;
    $(".profile-picture").append("<img src='" + serverProfile + "' alt='" + creator + "' id='prof-pic' class='avatar center'>");
    document.getElementById("creator-name").innerHTML = creator;

    var viewUserDeckUrl = platform + "zhang_kevin_project2/viewUserDeck.php";
    $.post(viewUserDeckUrl, { deck_id: viewdeck.deck_id }, function (data, textStatus) {
        //alert(JSON.stringify(data)); //for debugging
        var deck = data.deck;
        var cards = data.cards;

        //alert(JSON.stringify(deck));
        //alert(JSON.stringify(cards));

        //save current cards to session
        sessionStorage.setItem('viewdeckcards', JSON.stringify(cards));

        //populate deck of cards
        $.each(cards, function (i, field) {

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

            var card = { cards_id: cards_id, name: name, set: set, imagePath: imagePath, clan: clan, grade: grade, type: type, onErrorPath: onErrorPath };
            deckCards.push(card);
        });

        // sort cards in deck
        var sortedCards = sortObj(deckCards, 'name');
        sortedCards = sortObj(deckCards, 'grade');

        // dictionary of card counts
        var cardDict = {};

        // print each card
        $.each(sortedCards, function (i, field) {
            //alert(JSON.stringify(field));
            var serverImageSource = platform + "zhang_kevin_project2/" + field.imagePath;
            var serverErrorSource = platform + "zhang_kevin_project2/" + field.onErrorPath;

            $(".row").append(
                "<div class='cardinfo'>" +
                "<img src='" + serverImageSource + "' id='card-image-" + i + "' class='card-image rounded' alt='" + field.name + "' onerror=this.src='" + serverErrorSource + "' style='width:100%'>" +

                //modal div
                "<div id= 'card-modal-" + i + "' class='modal' >" +
                "<span class='close'>&times;</span>" +
                "<img id='modal-image-" + i + "' class='modal-content'>" +
                "</div>" +

                "<div class='deckinfo-text'>" +
                "<p>" +
                "<strong>Name: </strong>" + field.name + "<br>" +
                "<strong>Clan: </strong>" + field.clan + "<br>" +
                "<strong>Grade/Skill: </strong>" + field.grade + "<br>" +
                "</p>" +
                "</div>" +

                //remove card button
                "<div class='form-group'>" +
                "<button type='submit' name='remove-card-btn' id='remove-card-" + i + "' class='btn btn-primary btn-block btn-sm remove-card-btn'>Remove Card</button>" +
                "</div>" +

                "</div>");

            //initialize card count dictionary to 0 for each card
            cardDict[field.name] = 0;
        });

        var cardSet = [];

        // raise card counts
        $.each(sortedCards, function (i, field) {
            cardDict[field.name] += 1;
            //alert(JSON.stringify(field));
            if (!cardSet.includes(field.name)) {
                cardSet.push(field.name);
            }
        });

        // print decklist
        $.each(sortedCards, function (i, field) {
            // if in cardset, then add
            if (cardSet.includes(field.name)) {
                //append to decklist by grade
                if (field.grade.includes("0")) {
                    $("#g0-list").append(
                        "<li>" + cardDict[field.name] + "x " + field.name + "</li>"
                    );
                }
                else if (field.grade.includes("1")) {
                    $("#g1-list").append(
                        "<li>" + cardDict[field.name] + "x " + field.name + "</li>"
                    );
                }
                else if (field.grade.includes("2")) {
                    $("#g2-list").append(
                        "<li>" + cardDict[field.name] + "x " + field.name + "</li>"
                    );
                }
                else if (field.grade.includes("3")) {
                    $("#g3-list").append(
                        "<li>" + cardDict[field.name] + "x " + field.name + "</li>"
                    );
                }
                else if (field.grade.includes("4")) {
                    $("#g4-list").append(
                        "<li>" + cardDict[field.name] + "x " + field.name + "</li>"
                    );
                }

                //remove cardSet first element so if condition fails
                cardSet.shift();
            }
        });
    }, "json");

    // command for the remove card button
    $(document).on("click", ".remove-card-btn", function () {
        var currentCardId = this.id;
        //currentCardId = currentCardId[currentCardId.length - 1]; //get last character of array (the number)
        currentCardId = currentCardId.split('-')[2]; //get last number in id
        //convert id string to int
        currentCardId = parseInt(currentCardId);

        var cards_id = deckCards[currentCardId].cards_id;
        var deck_id = viewdeck.deck_id;
        var cardname = deckCards[currentCardId].name;

        //send number and card id to php w/ ajax post
        var removeCardsUrl = platform + "zhang_kevin_project2/removecards.php";
        $.post(removeCardsUrl, { cards_id: cards_id, deck_id: deck_id });

        //deckCards.splice(currentCardId, 1);
        location.href = "viewdeck.html";
        //document.getElementById("remove-cards").innerHTML = "Removed 1 copy of <strong>" + cardname + ".</strong>";

    });

    // command for the rate button
    $(document).on("click", "#rating-btn", function () {
        var rating = $("#rating :selected").val(); // The value of the selected option
        rating = parseInt(rating);

        var deck_id = viewdeck.deck_id;

        //post rating w/ ajax post
        var postRatingUrl = platform + "zhang_kevin_project2/postrating.php";
        $.post(postRatingUrl, { deck_id: deck_id, rating: rating, user_id: user_id }, function (data, textStatus) {
            document.getElementById("number-rating").style.display = "none";
            if (data === "rating already submitted") {
                document.getElementById("review-score").innerHTML = "You have already submitted a rating for this deck!";
            }
            else {
                document.getElementById("review-score").innerHTML = "Submitted " + rating + " star rating for " + viewdeck.deckname;
            }
        });
    });

    // command for show decklist button
    $(document).on("click", ".decklist-btn", function () {
        $(".decklist").toggle();
    });

    // command for playtest/draw cards button
    $(document).on("click", ".playtest-btn", function () {
        location.href = "playtest.html";
    });

    // command for the edit deck button
    $(document).on("click", ".set-deck-btn", function () {
        //save view deck info into session variables
        sessionStorage.setItem('setdeck', JSON.stringify(viewdeck));

        location.href = "search.html";
    });

    $(document).on("click", ".deck-rating-btn", function () {
        location.href = "rating.html";
    });
})