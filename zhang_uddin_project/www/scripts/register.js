$(document).ready(function () {
    $("#register-btn").click(function () {
        var username = $("#username").val();
        var email = $("#email").val();
        var password = $("#password").val();
        var confirmPassword = $("#confirm-password").val();
        //if all fields full
        if ($.trim(username).length > 0 & $.trim(email).length > 0 & $.trim(password).length > 0 & $.trim(confirmPassword).length > 0) {
            //if password matches confirm password box
            if (password === confirmPassword) {
                $.ajax({
                    type: "POST",  //Request type
                    url: platform + "zhang_kevin_project2/register.php",
                    data: { username: username, email: email, password: password, confirmPassword: confirmPassword },
                    crossDomain: true,
                    beforeSend: function (xhr) {
                        xhr.withCredentials = true;
                        $("#register-btn").val('Connecting...');
                    },
                    cache: false,
                    error: function () {
                        alert("Something went wrong when connecting");
                    },
                    success: function (result) {
                        if (result === "registration success") {
                            //alert("entering registration code");

                            //get json for userinfo and save in session
                            // save user info to session
                            var url = platform + "zhang_kevin_project2/getUserInfo.php";
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

                                if (sessionStorage.getItem("user_id") !== null && sessionStorage.getItem("username") !== null) {
                                    location.href = "browse.html";
                                }
                                else {
                                    alert("session variables not being set");
                                }
                            }, "json");
                        }
                        else if (result === "invalid email") {
                            alert("Please enter a valid email");
                        }
                        else if (result === "username exists") {
                            alert("Username is already taken");
                        }
                        else if (result === "registration failed") {
                            alert("Something went wrong in php request");
                        }
                        else {
                            alert("Registration failed");
                        }
                    }
                })
            }
            else {
                alert('Passwords do not match');
            }
        }
        else {
            alert('Please fill all fields');
        }
    })
})