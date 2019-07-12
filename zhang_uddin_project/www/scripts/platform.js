var platform;

/*
if (navigator.platform.match(/Win32|MacIntel/)) {
    platform = "http://127.0.0.1/";
}
else {
    //platform = "http://10.0.2.2/";
    // I think we may have to use the ip of the device with the server to connect to it from android
    // https://www.quora.com/Is-it-possible-to-access-my-XAMPP-local-web-server-from-any-device-on-the-same-network
    // code to get ip address of client machine
    // http://embed.plnkr.co/plunk/xwVEru
    //platform = "http://192.168.1.71/";
    platform = "http://10.10.10.110/";
}
*/

//set ip address of server
function setPlatformId() {
    //var ip = document.getElementById("ip-box").innerHTML;
    var ip = $("#ip-box").val();

    //alert(ip);

    if (navigator.platform.match(/Win32|MacIntel/)) {
        platform = "http://127.0.0.1/";
    }
    else {
        platform = "http://" + ip + "/";
    }

    //set ip into session
    sessionStorage.setItem("platform", platform);

    document.getElementById("ip-info").innerHTML = "IP set as: " + platform;
}

platform = sessionStorage.getItem("platform");