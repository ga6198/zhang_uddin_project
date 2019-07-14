//hold user's decks
var userDecks = []; // list of user deck objects

//get user id from session
var user_id = getUserId();

$(document).ready(function () {
    $("#add-deck-btn").click(function () {
        var deckname = $("#deckname").val();
        var description = $("#description").val();
        var clan = $("#clan").val();
        if ($.trim(deckname).length > 0) {
            $.ajax({
                type: "POST",  //Request type
                url: platform + "zhang_kevin_project2/adddeck.php",
                data: { user_id: user_id, deckname: deckname, description: description, clan: clan },
                //dataType: text, // for debugging
                crossDomain: true,
                beforeSend: function (xhr) {
                    xhr.withCredentials = true;
                },
                cache: false,
                error: function (jqxhr, status, exception) {
                    alert('Exception:', exception);
                },
                success: function (result) {
                    if (result === "added deck") {
                        location.href = "build.html";
                        document.getElementById("added-deck").innerHTML = "Added deck: " + deckname;
                        //$("added-deck").innerHTML = "Added deck: " + deckname;
                    }
                    else if (result === "failed") {
                        alert("error happened");
                    }
                }
            })
        }
        else {
            alert('Need deck name');
        }
    })

    var getUserDecksUrl = platform + "zhang_kevin_project2/getUserDecks.php";
    $.post(getUserDecksUrl, { user_id: user_id }, function (data, textStatus) {
        //alert(JSON.stringify(data)); //for debugging

        var decks = data.decks;
        var ratings = data.ratings;

        //for each deck, print contents
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
            //push each deck into user deck array
            //alert(JSON.stringify(deck)); //for debugging
            userDecks.push(deck);

            var serverImageSource = platform + "zhang_kevin_project2/" + clanImageDir;
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

                //button to edit deck
                "<div class='form-group'>" +
                "<button type='submit' name='set-deck-btn' id='set-deck-" + i + "' class='btn btn-primary btn-block btn-sm set-deck-btn'>Edit Deck</button>" +
                "</div>" +

                "<div class='form-group'>" +
                "<button type='submit' name='delete-deck-btn' id='delete-deck-" + i + "' class='btn btn-primary btn-block btn-sm delete-deck-btn'>Delete Deck</button>" +
                "</div>" +

                "</div>");
        });

        //alert("User Decks: " + JSON.stringify(userDecks)); //for debugging
    }, "json");
})

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

    //use id as index of userDeck array
    //alert("selected deck: " + JSON.stringify(userDecks[currentDeckId]));

    //save view deck info into session variables
    //alert(JSON.stringify(userDecks[currentDeckId]));
    sessionStorage.setItem('viewdeck', JSON.stringify(userDecks[currentDeckId]));

    location.href = "viewdeck.html";
});

// command for the edit deck button
$(document).on("click", ".set-deck-btn", function () {
    var currentDeckId = this.id;
    //currentDeckId = currentDeckId[currentDeckId.length - 1]; //get last character of array (the number)
    currentDeckId = currentDeckId.split('-')[2]; //get last number in id
    //convert id string to int
    currentDeckId = parseInt(currentDeckId);

    //save view deck info into session variables
    //alert(JSON.stringify(userDecks[currentDeckId]));
    sessionStorage.setItem('setdeck', JSON.stringify(userDecks[currentDeckId]));

    location.href = "search.html";
});

$(document).on("click", ".delete-deck-btn", function () {
    //alert("Clicking on dynamic view button works");
    //check the id
    //alert(this.id);
    var currentDeckId = this.id;
    //currentDeckId = currentDeckId[currentDeckId.length - 1]; //get last character of array (the number)
    currentDeckId = currentDeckId.split('-')[2]; //get last number in id
    //convert id string to int
    currentDeckId = parseInt(currentDeckId);

    var r = confirm("Are you sure you want to delete this deck?");
    if (r == true) {
        // user_id currentDeckId
        $.ajax({
            type: "POST",  //Request type
            url: platform + "zhang_kevin_project2/deletedeck.php",
            data: { user_id: user_id, deckId: currentDeckId },
            //dataType: text, // for debugging
            crossDomain: true,
            /* beforeSend: function (xhr) {
                 xhr.withCredentials = true;
             },
             cache: false,
             error: function (jqxhr, status, exception) {
                 alert('Exception:', exception);
             },*/
            success: function (result) {
                if (result === "Success") {
                    alert("Delete was successful");
                    location.href = "build.html";
                }
                else if (result === "Error") {
                    alert("error happened");
                }
                else if (result === "Errors") {
                    alert("more errors happened");
                }
            }
        })
    }
});

//command for author name link
$(document).on("click", ".author-name", function () {
    var currentDeckId = this.id;
    //currentDeckId = currentDeckId[currentDeckId.length - 1]; //get last character of array (the number)
    currentDeckId = currentDeckId.split('-')[2]; //get last number in id
    //convert id string to int
    currentDeckId = parseInt(currentDeckId);

    //save user info into session variables
    sessionStorage.setItem('userinfo', JSON.stringify(userDecks[currentDeckId]));

    location.href = "profile.html";
});