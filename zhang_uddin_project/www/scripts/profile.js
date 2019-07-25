//get user id from session
var user_id = getUserId();

//get user info from session
var userinfo = sessionStorage.getItem('userinfo');
userinfo = JSON.parse(userinfo);

//hold user's decks
var userDecks = []; // list of user deck objects

$(document).ready(function () {
	//author name
	if (userinfo !== null) {
		document.getElementById("author-page").innerHTML = userinfo.creator;
	}

	//get profile user id from session var
	var profile_creator_id = userinfo.creator_id;

	// display user's decks
	var getUserDecksUrl = platform + "zhang_kevin_project2/getUserDecks.php";
	$.post(getUserDecksUrl, { user_id: profile_creator_id }, function (data, textStatus) {
		//alert(data);
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

			var deck = { creator_id: creator_id, creator: creator, creator_pic: creator_pic, deck_id: deck_id, deckname: deckname, description: description, clan: clan, rating: rating };
			//push each deck into user deck array
			//alert(JSON.stringify(deck)); //for debugging
			userDecks.push(deck);

			var serverImageSource = platform + "zhang_kevin_project2/" + clanImageDir;

			// if the person viewing the profile is the same as whom the profile is about
			if (profile_creator_id == user_id) {
				$(".row").append(
					"<div class='deckinfo'>" +
					"<img src='" + serverImageSource + "' class='rounded' alt='" + clan + "' style='width:100%'>" +
					"<div class='deckinfo-text'>" + 
					"<p>" +
					"<strong>Deck Name: </strong>" + deckname + "<br>" +
					"<strong>Clan: </strong>" + clan + "<br>" +
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

					"</div>");
			}
			else {
				$(".row").append(
					"<div class='deckinfo'>" +
					"<img src='" + serverImageSource + "' class='rounded' alt='" + clan + "' style='width:100%'" +
					"<p>" +
					"<strong>Deck Name: </strong>" + deckname + "<br>" +
					"<strong>Clan: </strong>" + clan + "<br>" +
					"<strong>Rating (AVG): </strong>" + rating + "<br>" +
					"</p>" +

					//button to view deck
					"<div class='form-group'>" +
					"<button type='submit' name='view-any-btn' id='view-any-" + i + "' class='btn btn-primary btn-block btn-sm view-any-btn'>View Deck</button>" +
					"</div>" +

					"</div>");
			}
		});

		//display profile picture
		if (userDecks.length == 0) { // user has no decks
			var creator = userinfo.creator;

			//profile picture is the form, <user_id>_profileImage.jpeg
			var creator_pic = userinfo.creator_id + "_profileImage.jpeg";
            //var serverProfile = platform + "zhang_kevin_project2/profileImages/" + creator_pic;
            var serverProfile = platform + "zhang_kevin_project2/profileImages/" + creator_pic + "?t=" + new Date().getTime();

			//if unique profile image is not there, use vanguard_blue.jpg as error image
			var onErrorPath = "profileImages/vanguard_blue.jpg";
			var serverErrorSource = platform + "zhang_kevin_project2/" + onErrorPath;
			$(".profile-picture").append("<img src='" + serverProfile + "' alt='" + creator + "' id='prof-pic' class='avatar center' onerror=this.src='" + serverErrorSource + "'>");

			//upload picture
			$(".upload-picture-camera").append("<button type='submit' name='camera-picture-btn' id='camera-picture-btn' class='btn btn-primary btn-block btn-sm'>Take Picture</button>");
			$(".upload-picture-gallery").append("<button type='submit' name='gallery-picture-btn' id='gallery-picture-btn' class='btn btn-primary btn-block btn-sm'>Upload Picture</button>");

			//display that no decks are there
			//$("#deck-message").innerHTML = "No decks";
			document.getElementById("deck-message").innerHTML = "No decks"
		}
		else if (userDecks[0].creator_pic == null || userDecks[0].creator_pic == "") { //if the current profile has no picture
			var creator = userDecks[0].creator;
			var serverDefaultProfile = platform + "zhang_kevin_project2/profileImages/vanguard_blue.jpg"
			$(".profile-picture").append("<img src='" + serverDefaultProfile + "' alt='" + creator + "' id='prof-pic' class='avatar center'>");
		}
		else {
			var creator = userDecks[0].creator;
			var creator_pic = userDecks[0].creator_pic;
			//var serverProfile = platform + "zhang_kevin_project2/profileImages/" + creator_pic;
            var serverProfile = platform + "zhang_kevin_project2/profileImages/" + creator_pic + "?t=" + new Date().getTime();
			$(".profile-picture").append("<img src='" + serverProfile + "' alt='" + creator + "' id='prof-pic' class='avatar center'>");
		}

		//display edit picture buttons if user is the profile user
		if (userDecks[0].creator_id == user_id) {
			$(".upload-picture-camera").append("<button type='submit' name='camera-picture-btn' id='camera-picture-btn' class='btn btn-primary btn-block btn-sm'>Take Picture</button>");
			$(".upload-picture-gallery").append("<button type='submit' name='gallery-picture-btn' id='gallery-picture-btn' class='btn btn-primary btn-block btn-sm'>Upload Picture</button>");
		}

	}, "json");
})

// command for the view deck button
// https://www.sitepoint.com/community/t/jquery-code-doesnt-work-on-dynamic-content-loaded-with-ajax/31758/5
$(document).on("click", ".view-deck-btn", function () {
	var currentDeckId = this.id;
	//currentDeckId = currentDeckId[currentDeckId.length - 1]; //get last character of array (the number)
	currentDeckId = currentDeckId.split('-')[2]; //get last number in id
	//convert id string to int
	currentDeckId = parseInt(currentDeckId);

	//save view deck info into session variables
	//alert(JSON.stringify(userDecks[currentDeckId]));
	sessionStorage.setItem('viewdeck', JSON.stringify(userDecks[currentDeckId]));

	location.href = "viewdeck.html";
});

// command for the view any deck button
// https://www.sitepoint.com/community/t/jquery-code-doesnt-work-on-dynamic-content-loaded-with-ajax/31758/5
$(document).on("click", ".view-any-btn", function () {
	var currentDeckId = this.id;
	//currentDeckId = currentDeckId[currentDeckId.length - 1]; //get last character of array (the number)
	currentDeckId = currentDeckId.split('-')[2]; //get last number in id
	//convert id string to int
	currentDeckId = parseInt(currentDeckId);

	//save view deck info into session variables
	//alert(JSON.stringify(userDecks[currentDeckId]));
	sessionStorage.setItem('viewdeck', JSON.stringify(userDecks[currentDeckId]));

	location.href = "viewanydeck.html";
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