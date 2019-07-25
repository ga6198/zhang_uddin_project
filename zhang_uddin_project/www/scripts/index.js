// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        var parentElement = document.getElementById('deviceready');
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        alert("testing onDeviceReady");
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };

    //logout events
    document.getElementById("logout").addEventListener("click", logout);
    function logout() {
        //return user to login page
        location.href = "index.html";
        //location.href = "../index.html";

        //clear session variables
        sessionStorage.clear();

        //alert("Your logout function worked");
    };

    //back button event
    document.addEventListener("backbutton", onBackKeyDown, false);
    function onBackKeyDown(e) {
        // suppress default, which is exiting app
        e.preventDefault();
        // go back to previous page
        window.history.go(-1);
    } 


    //camera button event
    document.getElementById("upload-picture-camera").addEventListener("click", cameraTakePicture);
    function cameraTakePicture() {
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            allowEdit: true,
            targetWidth: 100, 
            targetHeight: 100
        });

        //alert("Camera button was clicked");

        function onSuccess(imageData) {
            //get user id from session
            var user_id = sessionStorage.getItem('user_id');
            user_id = parseInt(user_id);

            var uploadPictureURL = platform + "zhang_kevin_project2/upload.php";


            $.ajax({
                type: "POST",
                url: uploadPictureURL,
                data: { img_data: imageData, user_id: user_id },
                cache: false,
                contentType: "application/x-www-form-urlencoded",
                error: function () {
                    alert("Uploading camera photo went wrong");
                },
                success: function (result) {
                    //location.href = profile.html;
                    location.reload(true); //forced reload
                }
            });
        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }
    }

    //gallery button event
    document.getElementById("upload-picture-gallery").addEventListener("click", cameraGetPicture); 
    function cameraGetPicture() {
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit: true,
            targetWidth: 100,
            targetHeight: 100
        });

        //alert("Gallery button was clicked");

        function onSuccess(imageData) {
            //get user id from session
            var user_id = sessionStorage.getItem('user_id');
            user_id = parseInt(user_id);

            //load platform script
            /*$.getScript("platform.js", function () {
                alert("Script loaded but not necessarily executed.");
            });*/

            var uploadPictureURL = platform + "zhang_kevin_project2/upload.php";

            $.ajax({
                type: "POST",
                url: uploadPictureURL,
                data: { img_data: imageData, user_id: user_id },
                cache: false,
                contentType: "application/x-www-form-urlencoded",
                error: function () {
                    alert("Uploading camera photo went wrong");
                },
                success: function (result) {
                    //location.href = profile.html;
                    location.reload(true); //forced reload
                }
            });
        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }
    }
})();