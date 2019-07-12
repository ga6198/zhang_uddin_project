//save the current modal globally, so it can be used in close
var currentModal = null;

// command for clicking on image
$(document).on("click", ".card-image", function () {
    //alert("Card clicked!");
    var currentCardId = this.id;
    currentCardId = currentCardId.split('-')[2]; //get last number in id
    //convert id string to int
    currentCardId = parseInt(currentCardId);

    // get card ids
    var cardImageId = "card-image-" + currentCardId;
    var cardModalId = "card-modal-" + currentCardId;
    var modalImageId = "modal-image-" + currentCardId;

    // get modal
    var modal = document.getElementById(cardModalId);

    //insert image into modal
    var cardImage = document.getElementById(cardImageId);

    // prepare card info for server request
    var cardName = this.alt;
    var cardImageSource = this.src;
    // get last part of source, which is the file name
    var sourceParts = cardImageSource.split('/');
    var cardFileName = sourceParts.pop() || sourceParts.pop();

    // get larger image from server
    var serverImageSource = platform + "zhang_kevin_project2/vanguardImages/" + cardFileName;
    var serverCardId = "server-card-" + currentCardId;

    var modalImage = document.getElementById(modalImageId);
    modal.style.display = "block";
    modalImage.src = serverImageSource;
    modalImage.alt = cardName;

    currentModal = modal;
});

$(document).on("click", ".close", function () {
    var modal = currentModal;
    modal.style.display = "none";
});