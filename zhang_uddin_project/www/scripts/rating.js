//get user id from session
var user_id = sessionStorage.getItem('user_id');
user_id = parseInt(user_id);

//get view deck info from session
var viewdeck = sessionStorage.getItem('viewdeck');
//alert(viewdeck);
viewdeck = JSON.parse(viewdeck);

//get user id from session
var user_id = getUserId();

var allRatings = [];

$(document).ready(function () {

    //title and creator information
    document.getElementById("added-deck").innerHTML = viewdeck.deckname;
    document.getElementById("desc").innerHTML = viewdeck.description;

    var creator = viewdeck.creator;
    //var serverProfile = platform + "zhang_kevin_project2/profileImages/" + viewdeck.creator_pic;
    var serverProfile = platform + "zhang_kevin_project2/profileImages/" + viewdeck.creator_pic + "?t=" + new Date().getTime();
    $(".profile-picture").append("<img src='" + serverProfile + "' alt='" + creator + "' id='prof-pic' class='avatar center'>");
    document.getElementById("creator-name").innerHTML = creator;

    var viewDeckRatingsUrl = platform + "zhang_kevin_project2/viewDeckRating.php";
    $.post(viewDeckRatingsUrl, { deck_id: viewdeck.deck_id }, function (data, textStatus) {
        if (data != "No Ratings") {
            var ratings = data.rating;
            // print each rating
            if (ratings.length > 0) {
                $.each(ratings, function (i, field) {
                    //var creator_pic_dir = platform + "zhang_kevin_project2/profileImages/" + field.profile_picture;
                    var creator_pic_dir = platform + "zhang_kevin_project2/profileImages/" + field.profile_picture + "?t=" + new Date().getTime();

                    $(".row").append("<div class='ratinginfo'>" +
                        "<strong>Creator: <img src='" + creator_pic_dir + "' class='avatar-small'> </strong><a href='#' id='author-name-" + i + "' class='author-name'>" + field.username + "</a><br>" +
                        "<strong>Rating: </strong>" + field.rating + " <strong>out of 5</strong><br>" +
                        "<p>" + field.message + "</p>" +
                        "</div>");

                    var rate = { creator_id: field.user_id, creator: field.username, creator_pic: field.profile_picture, creator_pic_dir: creator_pic_dir, deck_id: 0, deckname: 0, description: 0, clan: 0, rating: 0 };
                    //push each deck into deck array
                    allRatings.push(rate);
                });
            }
        }
        else {
            $(".no-ratings").append("<h5>No ratings posted for this deck</h5>");
        }
    }
        , "json");
})

$(document).on("click", ".author-name", function () {
    var currentDeckId = this.id;

    //currentDeckId = currentDeckId[currentDeckId.length - 1]; //get last character of array (the number)
    currentDeckId = currentDeckId.split('-')[2]; //get last number in id
    //convert id string to int
    currentDeckId = parseInt(currentDeckId);
    //save user info into session variables
    sessionStorage.setItem('userinfo', JSON.stringify(allRatings[currentDeckId]));

    location.href = "profile.html";
});