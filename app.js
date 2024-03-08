const submitForm = (event) => {
    event.preventDefault();

    const userInput = document.getElementById("message").value;

    const encodedMessage = cryptedMessage(userInput);

    const urlObject = new URL(window.location.href);
    urlObject.hash = encodedMessage;

    const url = urlObject.href;

    const urlContainer = document.getElementById("urlContainer");
    urlContainer.innerHTML = '<span>' + url + '</span>';

    const copyIcon = document.createElement("span");
    copyIcon.innerHTML = "&#128203;";
    copyIcon.addEventListener("click", function () {
        copyUrl(url);
        updatePageElements();
    });

    urlContainer.appendChild(copyIcon);

};

const copyUrl = (text) => {
    navigator.clipboard.writeText(text)
        .then(() => {
            alert("L'URL a été copiée !");
        })
        .catch(err => {
            console.error('Impossible de copier le texte: ', err);
            alert("La copie de l'URL a échoué.");
        });

};

const cryptedMessage = (input) => {
    return btoa(input);
};

const decryptMessage = (encodedMessage) => {
    return atob(encodedMessage)
}

const displayMessage = () => {
    
    const message = window.location.hash.substring(1);
    const decodedMessage = decryptMessage(message);
    console.log("message décodé : " + decodedMessage);
    
    const decodedMessageElement = document.getElementById("decodedMessage");
    decodedMessageElement.textContent = decodedMessage;
    
    const decodedMessageContainer = document.getElementById("decodedMessageContainer");
    decodedMessageContainer.style.display = "block";

}

const updatePageElements = () => {
    const url = window.location.href;
    const decodedMessageContainer = document.getElementById("decodedMessageContainer");
    const shareLink = document.getElementById("shareLink");
    const btnHomePage = document.getElementById("btnHomePage");
    const secretForm = document.getElementById("secretForm");

    btnHomePage.style.display = "none";


    if (url.includes("#")) {
        decodedMessageContainer.style.display = "block";
        shareLink.style.display = "none";
        btnHomePage.style.display = "block";
        secretForm.style.display = "none";
    } else {
        decodedMessageContainer.style.display = "none";
        shareLink.style.display = "block";
        secretForm.style.display ="block";
    }
}

const goToHomePage = () =>  {
    const urlObject = new URL(window.location.href);
    const baseUrl = urlObject.origin;
    
    window.location.href = baseUrl; 
}

displayMessage();
updatePageElements();