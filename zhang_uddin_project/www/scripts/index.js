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
        alert('Back Button is Pressed!');
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