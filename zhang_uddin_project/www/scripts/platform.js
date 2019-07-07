var platform;

if (navigator.platform.match(/Win32|MacIntel/)) {
    platform = "http://127.0.0.1/";
}
else {
    //platform = "http://10.0.2.2/";
    // I think we may have to use the ip of the device with the server to connect to it from android
    // https://www.quora.com/Is-it-possible-to-access-my-XAMPP-local-web-server-from-any-device-on-the-same-network
    // code to get ip address of client machine
    // http://embed.plnkr.co/plunk/xwVEru
    platform = "http://192.168.1.71/";
}