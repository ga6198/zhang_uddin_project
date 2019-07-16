//get user id from session
var user_id = sessionStorage.getItem('user_id');
user_id = parseInt(user_id);

//get view deck info from session
var viewdeck = sessionStorage.getItem('viewdeck');
//alert(viewdeck);
viewdeck = JSON.parse(viewdeck);

//get user id from session
var user_id = getUserId();

$(document).ready(function () {

    //title and creator information
    document.getElementById("added-deck").innerHTML = viewdeck.deckname;
    document.getElementById("desc").innerHTML = viewdeck.description;

    var creator = viewdeck.creator;
    var serverProfile = platform + "zhang_kevin_project2/profileImages/" + viewdeck.creator_pic;
    $(".profile-picture").append("<img src='" + serverProfile + "' alt='" + creator + "' id='prof-pic' class='avatar center'>");
    document.getElementById("creator-name").innerHTML = creator;

    var viewDeckRatingsUrl = platform + "zhang_kevin_project2/viewDeckRating.php";
    $.post(viewDeckRatingsUrl, { deck_id: viewdeck.deck_id }, function (data, textStatus) {
        var ratings = data.rating;

        // print each rating
        if (ratings.length > 0) {
            $(".row").append("<ul>");

            $.each(ratings, function (i, field) {
                var serverImageSource = platform + "zhang_kevin_project2/" + field.profile_picture;

                $(".row").append("<li>" + field.username + " said " + field.message + " rating: " + field.rating + "</li>");
            });
            $(".row").append("</ul>");
        }
    }
        , "json");
})