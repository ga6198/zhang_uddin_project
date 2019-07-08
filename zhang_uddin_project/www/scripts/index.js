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
    //FIXME: make this return to previous page
    document.addEventListener("backbutton", onBackKeyDown, false);
    function onBackKeyDown(e) {
        // suppress default, which is exiting app
        e.preventDefault();
        //alert('Back Button is Pressed!');
        window.history.go(-1);
    } 

    //camera button event
    document.getElementById("upload-picture-camera").addEventListener("click", cameraTakePicture);
    function cameraTakePicture() {
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL
        });

        //alert("Camera button was clicked");

        function onSuccess(imageData) {
            //setting up file transfer
            //var options = new FileUploadOptions();
            //options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);

            //get user id from session
            var user_id = sessionStorage.getItem('user_id');
            user_id = parseInt(user_id);

            //load platform script
            $.getScript("platform.js", function () {
                alert("Script loaded but not necessarily executed.");
            });

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
                /*success: function (result) {
                    alert("upload OK: " + result);
                }*/
            });
        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }
    }

    /*function cameraTakePicture() {
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL
        });

        //alert("Camera button was clicked");

        function onSuccess(imageData) {
            //var image = document.getElementById('myImage');
            //image.src = "data:image/jpeg;base64," + imageData;
            alert(imageData);
        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }
    }*/
    /*function cameraTakePicture() {
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URL
        });

        //alert("Camera button was clicked");

        function onSuccess(imageURI) {
            //setting up file transfer
            var options = new FileUploadOptions();
            options.fileKey = "file";
            options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            options.mimeType = "image/jpeg";

            //get user id from session
            var user_id = sessionStorage.getItem('user_id');
            user_id = parseInt(user_id);

            var params = {};
            //params.value1 = "test";
            //params.value2 = "param";
            params.value1 = "user_id";

            options.params = params;
            options.chunkedMode = false;

            //load platform script
            $.getScript("platform.js", function () {
                alert("Script loaded but not necessarily executed.");
            });

            var ft = new FileTransfer();
            ft.upload(imageURI, platform + "zhang_kevin_project2/upload.php", function (result) {
                alert('successfully uploaded ' + result.response);
            }, function (error) {
                alert('error : ' + JSON.stringify(error));
            }, options);
        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }
    }*/
    /*function cameraTakePicture() {
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URL
        });

        //alert("Camera button was clicked");

        function onSuccess(imageURI) {
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
                console.log('file system open: ' + fs.name);
                //fs.root.getFile('bot.png', { create: true, exclusive: false }, function (fileEntry) {
                fs.root.getFile(imageURI, { create: true, exclusive: false }, function (fileEntry) {
                    fileEntry.file(function (file) {
                        var reader = new FileReader();
                        reader.onloadend = function () {
                            // Create a blob based on the FileReader "result", which we asked to be retrieved as an ArrayBuffer
                            var blob = new Blob([new Uint8Array(this.result)], { type: "image/jpg" });
                            var oReq = new XMLHttpRequest();
                            oReq.open("POST", platform + "zhang_kevin_project2/upload.php", true);
                            oReq.onload = function (oEvent) {
                                // all done!
                            };
                            // Pass the blob in to XHR's send method
                            oReq.send(blob);
                        };
                        // Read the file as an ArrayBuffer
                        reader.readAsArrayBuffer(file);
                    }, function (err) { console.error('error getting fileentry file!' + err); });
                }, function (err) { console.error('error getting file! ' + err); });
            }, function (err) { console.error('error getting persistent fs! ' + err); });
        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }
    }*/

    //gallery button event
    document.getElementById("upload-picture-gallery").addEventListener("click", cameraGetPicture); 
    function cameraGetPicture() {
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY
        });

        //alert("Gallery button was clicked");

        function onSuccess(imageURL) {
            //var image = document.getElementById('myImage');
            //image.src = imageURL;
            alert(imageURL.length);
        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }
    }
})();

function openSideMenu() {
    document.getElementById("sideMenu").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeSideMenu() {
    document.getElementById("sideMenu").style.width = "0";
}

//function to get the image for a clan
function getClanImageDirectory(clanName) {
    //remove spaces
    var clanNameStripped = clanName.split(' ').join('');
    var clanImageDir = "vanguardImages/clan/Icon_" + clanNameStripped + ".png";
    return clanImageDir;
}