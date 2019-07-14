//hold decks and ratings
var allDecks = []; // list of user deck objects

//get user id from session
var user_id = getUserId();

//print each deck's info
$(document).ready(function () {
    $("#deck-search-btn").click(function () {
        //clear previous search results
        $('.row').html("");

        var deckname = $("#deckname").val();
        var clan = $("#clan").val();
        var creator = $("#creator").val();

        var url = platform + "zhang_kevin_project2/searchdecks.php";
        $.post(url, { deckname: deckname, clan: clan, creator: creator }, function (data, textStatus) {
            //alert(JSON.stringify(data)); //for debugging

            var decks = data.decks;
            var ratings = data.ratings;

            //clear any current card search results
            allDecks = [];
            //cardSearchResults.length = 0;

            //for each card, print info
            $.each(decks, function (i, field) {
                var deck_id = field.deck_id;
                var deckname = field.deckname;
                var description = field.description;
                // change description if empty
                if (description === "") {
                    description = "N/A";
                }
                var creator_id = field.user_id;
                var creator = field.username;
                var creator_pic = field.profile_picture;
                var creator_pic_dir = platform + "zhang_kevin_project2/profileImages/" + creator_pic;

                var clan = field.clan;
                var clanImageDir = getClanImageDirectory(clan);

                var rating = ratings[i].rating_average;
                // change rating if empty
                if (rating === "" || rating === null) {
                    rating = "N/A";
                }
                else {
                    rating = rating.toPrecision(2);
                }

                var deck = { creator_id: creator_id, creator: creator, creator_pic: creator_pic, creator_pic_dir: creator_pic_dir, deck_id: deck_id, deckname: deckname, description: description, clan: clan, rating: rating };
                //push each deck into deck array
                allDecks.push(deck);

                var serverImageSource = platform + "zhang_kevin_project2/" + clanImageDir;
                //add deckinfo boxes
                $(".row").append(
                    "<div class='deckinfo'>" +
                    "<img src='" + serverImageSource + "' class='rounded' alt='" + clan + "' style='width:100%'>" +
                    "<div class='deckinfo-text'>" +
                    "<p>" +
                    "<strong>Deck Name: </strong>" + deckname + "<br>" +
                    "<strong>Clan: </strong>" + clan + "<br>" +
                    "<strong>Creator: <img src='" + creator_pic_dir + "' class='avatar-small'> </strong><a href='#' id='author-name-" + i + "' class='author-name'>" + creator + "</a><br>" +
                    "<strong>Rating (AVG): </strong>" + rating + "<br>" +
                    "</p>" +
                    "</div>" +

                    //button to view deck
                    "<div class='form-group'>" +
                    "<button type='submit' name='view-deck-btn' id='view-deck-" + i + "' class='btn btn-primary btn-block btn-sm view-deck-btn'>View Deck</button>" +
                    "</div>" +

                    "</div>");
            });

        }, "json");
    })
});

// command for the view deck button
// https://www.sitepoint.com/community/t/jquery-code-doesnt-work-on-dynamic-content-loaded-with-ajax/31758/5
$(document).on("click", ".view-deck-btn", function () {
    //alert("Clicking on dynamic view button works");
    //check the id
    //alert(this.id);
    var currentDeckId = this.id;
    //currentDeckId = currentDeckId[currentDeckId.length - 1]; //get last character of array (the number)
    currentDeckId = currentDeckId.split('-')[2]; //get last number in id
    //convert id string to int
    currentDeckId = parseInt(currentDeckId);

    //save view deck info into session variables
    //alert(JSON.stringify(userDecks[currentDeckId]));
    sessionStorage.setItem('viewdeck', JSON.stringify(allDecks[currentDeckId]));

    location.href = "viewanydeck.html";
});

//command for author name link
$(document).on("click", ".author-name", function () {
    var currentDeckId = this.id;
    //currentDeckId = currentDeckId[currentDeckId.length - 1]; //get last character of array (the number)
    currentDeckId = currentDeckId.split('-')[2]; //get last number in id
    //convert id string to int
    currentDeckId = parseInt(currentDeckId);

    //save user info into session variables
    sessionStorage.setItem('userinfo', JSON.stringify(allDecks[currentDeckId]));

    location.href = "profile.html";
});