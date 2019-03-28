"use strict"

const firstRow = document.getElementById("link-row-1");

function addLink(row, link, imageSource) {
    const anchorElement = document.createElement("a");
    const imageElement  = document.createElement("img");

    anchorElement.href = link;
    imageElement.src = `img/logo-${imageSource}.png`;

    anchorElement.appendChild(imageElement);
    row.appendChild(anchorElement);
}

addLink(firstRow, "https://www.youtube.com/", "yt");
addLink(firstRow, "https://www.github.com/", "gh");
addLink(firstRow, "https://www.netflix.com/browse/", "nf");
addLink(firstRow, "https://www.smile.amazon.co.uk/", "am");
addLink(firstRow, "https://mail.google.com/mail/u/3/#inbox", "gm");