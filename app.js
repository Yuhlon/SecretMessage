let domain = window.location.hostname;

const submitForm = (event) => {
    event.preventDefault();

    const userInput = document.getElementById("message").value;
    console.log("La saisie de l'utilisateur est : " + userInput);

    const encodedMessage = cryptedMessage(userInput);
    console.log("La saisie encodée en base64 est : " + encodedMessage);

    const urlObject = new URL(window.location.href);
    urlObject.hash = encodedMessage;

    const url = urlObject.href;
    console.log("URL à partager : " + url);

    const urlContainer = document.getElementById("urlContainer");
    urlContainer.innerHTML = '<span>' + url + '</span>';

    const copyIcon = document.createElement("span");
    copyIcon.innerHTML = "&#128203;";
    copyIcon.addEventListener("click", function () {
        copyUrl(url);

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

displayMessage();


function goToHomePage() {
    const urlObject = new URL(window.location.href);
    const baseUrl = urlObject.origin;

    window.location.href = baseUrl; 
}