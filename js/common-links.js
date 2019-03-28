"use strict"

const common = document.getElementById("links-common");
const shopping = document.getElementById("links-shopping");
const mail = document.getElementById("links-mail");

function addLink(row, link, imageSource) {
    const anchorElement = document.createElement("a");
    const imageElement  = document.createElement("img");

    anchorElement.href = link;
    anchorElement.classList.add("common-link");
    imageElement.src = `img/logo-${imageSource}.png`;

    anchorElement.appendChild(imageElement);
    row.appendChild(anchorElement);
}

addLink(common, "https://www.youtube.com/", "yt");
addLink(common, "https://www.github.com/", "gh");
addLink(common, "https://www.netflix.com/browse/", "nf");

addLink(mail, "https://mail.google.com/mail/u/3/#inbox", "gm");

addLink(shopping, "https://www.smile.amazon.co.uk/", "am");