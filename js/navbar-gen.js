"use strict"

const ph = `
https://pkf-francisclarkcareers.co.uk/wp-content/uploads/2017/10/placeholder.png
`

window.addEventListener("load", e => {
    const nav = document.getElementById("navbar");


    const addButton = (name, url, image) => {
        const sect = document.getElementById("nav-section");
        const clone = document.importNode(sect.content, true);
        const anchor = clone.querySelector('a');
        const divs = clone.querySelectorAll('div');
        const img  = clone.querySelector("img");
        img.src = image;
        anchor.href = url;
        divs[1].textContent = name;

        nav.appendChild(clone);
    };

    addButton("Home", 'index.html', ph);
    addButton("Common Links", 'common-links.html', ph);
    addButton("Random Tools", 'tools.html', ph);
    addButton("Games", 'games.html', ph);
});