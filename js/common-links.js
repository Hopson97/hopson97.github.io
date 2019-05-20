"use strict"

window.addEventListener("load", () => {
    const common = document.getElementById("links-common");
    const shopping = document.getElementById("links-shopping");
    const mail = document.getElementById("links-mail");
    
    function addLink(row, link, imageSource) {
        const anchorElement = document.createElement("a");
        const imageElement  = document.createElement("img");
    
        anchorElement.href = link;
        anchorElement.classList.add("common-link");
        imageElement.src = `img/logo-${imageSource}.png`;
        imageElement.classList.add("link-logo");
    
        anchorElement.appendChild(imageElement);
        row.appendChild(anchorElement);
    }
    
    addLink(common, "https://www.youtube.com/", "yt");
    addLink(common, "https://www.github.com/", "gh");
    addLink(common, "https://www.netflix.com/browse/", "nf");
    
    addLink(mail, "https://mail.google.com/mail/u/3/#inbox", "gm");
    addLink(mail, "https://outlook.live.com/mail/inbox", "ol");
    
    addLink(shopping, "https://www.smile.amazon.co.uk/", "am");
    
    
    const form = document.getElementById("search-form");
    form.addEventListener("submit", e => {
        e.preventDefault();
    
        const searchQuery = document.getElementById("input-box").value;
        const newString = searchQuery.replace(/ /g,"+");
        
        if (newString.length == 0) {
            return;
        }
        window.location.replace(`https://www.google.com/search?q=${newString}`);
    });
    document.getElementById("input-box").focus();
});
