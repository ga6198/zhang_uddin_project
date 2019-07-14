$(document).ready(function () {
    $("#login-btn").click(function () {
        var username = $("#username").val();
        var password = $("#password").val();
        if ($.trim(username).length > 0 & $.trim(password).length > 0) {
            $.ajax({
                type: "POST",  //Request type
                url: platform + "/zhang_kevin_project2/login.php",
                //url: "login.php",
                data: { username: username, password: password },
                crossDomain: true,
                beforeSend: function (xhr) {
                    xhr.withCredentials = true;
                    $("#login-btn").val('Connecting...');
                },
                cache: false,
                //error: alert("some error"),
                error: function () {
                    alert("Login failed. Current ip is: " + platform);
                },
                success: function (result) {
                    //alert(result); // for debugging

                    if (result === "logged in") {
                        //alert("login successful");

                        //get json for userinfo and save in session
                        // save user info to session
                        var url = platform + "/zhang_kevin_project2/getUserInfo.php";
                        var id;
                        var currentUsername;
                        var email;
                        var verified;
                        var token;
                        var currentPassword;
                        // get user data
                        $.post(url, { username: username }, function (data, textStatus) {
                            //alert(JSON.stringify(data)); //for debugging
                            id = data.id;
                            currentUsername = data.username;
                            email = data.email;
                            verified = data.verified;
                            token = data.token;
                            currentPassword = data.password;

                            //session variables
                            sessionStorage.setItem("user_id", id.toString(10));
                            sessionStorage.setItem("username", currentUsername);

                            //if both session variables set
                            if (sessionStorage.getItem("user_id") !== null && sessionStorage.getItem("username") !== null) {
                                location.href = "browse.html";
                            }
                            else {
                                alert("session variables not being set");
                            }
                        }, "json");

                        //location.href = "browse.html";
                    }
                    else if (result === "failed") {
                        alert("password_verify in login.php failed");
                    }
                    else {
                        //location.href = "index.html";
                        alert("Login failed");
                    }
                }
            })
        }
        else {
            alert('Input fields are empty');
        }
    })
})