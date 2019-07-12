//function to get the image for a clan
function getClanImageDirectory(clanName) {
    //remove spaces
    var clanNameStripped = clanName.split(' ').join('');
    var clanImageDir = "vanguardImages/clan/Icon_" + clanNameStripped + ".png";
    return clanImageDir;
}

//function for sorting deck. Usage: deckList = sortObj(decklist, 'grade')
function sortObj(list, key) {
    function compare(a, b) {
        a = a[key];
        b = b[key];
        var type = (typeof (a) === 'string' ||
            typeof (b) === 'string') ? 'string' : 'number';
        var result;
        if (type === 'string') result = a.localeCompare(b);
        else result = a - b;
        return result;
    }
    return list.sort(compare);
}

//function for grouping cards, mainly by grade or name
function groupBy(array, property) {
    var hash = {};
    for (var i = 0; i < array.length; i++) {
        if (!hash[array[i][property]]) hash[array[i][property]] = [];
        hash[array[i][property]].push(array[i]);
    }
    return hash;
}

//function to shuffle cards array
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// function to draw and display five cards
function displayStartingHand(deck) {
    deckWithoutG4s = [];
    // remove grade 4 g units and g guardians
    $.each(deck, function (i, field) {
        //alert(JSON.stringify(field));

        grade = field.grade

        if (!grade.includes("Triple Drive") && !grade.includes("G-Guardian")) {
            deckWithoutG4s.push(field);
        }
    });
    //alert(JSON.stringify(deckWithoutG4s));

    //shuffle deck
    deckWithoutG4s = shuffle(deckWithoutG4s);

    // number of cards to print. Mainly handles if there are less than 5 cards
    numCardsToPrint = deckWithoutG4s.length;
    // if more than 5 cards, reduce to 5 cards
    if (numCardsToPrint > 5) {
        numCardsToPrint = 5;
    }

    //print first 5 cards
    for (i = 0; i < numCardsToPrint; i++) {
        //get image data
        var imageFile = deckWithoutG4s[i].imageFile;
        // if image doesn't end in jpg, add jpg
        if (!imageFile.endsWith(".jpg")) {
            imageFile = imageFile + ".jpg";
        }

        var name = deckWithoutG4s[i].name;

        var imagePath = "vanguardImages/" + imageFile;
        var onErrorPath = "vanguardImages/cfv_back.jpg";

        var serverImageSource = platform + "zhang_kevin_project2/" + imagePath;
        var serverErrorSource = platform + "zhang_kevin_project2/" + onErrorPath;
        //print cards
        $(".row").append(
            "<div class='cardinfo'>" +
            "<img src='" + serverImageSource + "' id='card-image-" + i + "' class='card-image rounded' onerror=this.src='" + serverErrorSource + "' style='width:100%'>" +

            //modal div
            "<div id= 'card-modal-" + i + "' class='modal' >" +
            "<span class='close'>&times;</span>" +
            "<img id='modal-image-" + i + "' class='modal-content'>" +
            "</div>" +

            "<p style='text-align:center;'>" + name + "</p>" +

            "</div>");
    }
}