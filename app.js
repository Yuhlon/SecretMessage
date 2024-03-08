const submitForm = (event) => {
    event.preventDefault();

    const userInput = document.getElementById("message").value;
    console.log("La saisie de l'utilisateur est : " + userInput);

    const encodedMessage = cryptedMessage(userInput);
    console.log("La saisie encodée en base64 est : " + encodedMessage);

    const domain = window.location.hostname;
    const url = "https://" + domain + "#" + encodedMessage;
    console.log("URL à partager : " + url);

    const urlContainer = document.getElementById("urlContainer");
    urlContainer.innerHTML = '<span>' + url + '</span>';

    const copyIcon = document.createElement("span");
    copyIcon.innerHTML = "&#128203;";
    copyIcon.addEventListener("click", function () {
        copyUrl(url);
    });

    urlContainer.appendChild(copyIcon);

    const form = document.getElementById("secretForm");
    form.style.display = "none";
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
