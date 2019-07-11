//command for profile link
function goToProfile() {
    var creator_id = sessionStorage.getItem("user_id");
    var creator = sessionStorage.getItem("username");
    var userinfo = { creator: creator, creator_id: creator_id };

    //save user info into session variables
    sessionStorage.setItem('userinfo', JSON.stringify(userinfo));
    location.href = "profile.html";
}