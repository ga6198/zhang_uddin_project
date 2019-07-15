//function to getting user_id from session and logging out if not set
function getUserId() {
    //get user id from session
    var user_id = sessionStorage.getItem('user_id');
    user_id = parseInt(user_id);
    //if user id not set, return to login
    if (user_id === null || isNaN(user_id)) {
        location.href = "index.html";
    }

    return user_id;
}

//command for profile link
function goToProfile() {
    var creator_id = sessionStorage.getItem("user_id");
    var creator = sessionStorage.getItem("username");
    var userinfo = { creator: creator, creator_id: creator_id };

    //save user info into session variables
    sessionStorage.setItem('userinfo', JSON.stringify(userinfo));
    location.href = "profile.html";
}

//functions fot the side nav
function openSideMenu() {
    document.getElementById("sideMenu").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeSideMenu() {
    document.getElementById("sideMenu").style.width = "0";
}