class Project 
{
    constructor(title, id, date)
    {
        this.title = title;
        this.id = id;
        this.date = date;
        this.links = null;
        this.image = null;
        this.paragraphs = new Array();
        this.lists = new Array();
    }

    addParagraph(text) 
    {
        this.paragraphs.push(text);
        return this;
    }

    addList(title, content)
    {
        this.lists.push({title: title, content: content});
        return this;
    }

    addLinks(yt, github, download) 
    {
        this.links = {
            yt: yt,
            github: github,
            download: download
        }
        return this;
    }

    setImage(link)
    {
        this.image = {
            alt: "Image of " + this.title,
            link: link
        };
        return this;
    }
}

function findChild(element, childClassName) 
{
    for (let i = 0; i < element.childNodes.length; i++) {
        if (element.childNodes[i].className === childClassName) {
            return element.childNodes[i];
        }        
    }
}


function getTemplateClone() 
{
    let temp = document.getElementById("project-template");
    let clone = temp.cloneNode(true);
    let container = clone.content.querySelector("div");
    return  {
        temp: clone,
        container: container
    };
}

function addTextToElement(element, text) 
{
    let t = document.createTextNode(text);
    element.appendChild(t);
}

function createElement(element, text) 
{
    let e = document.createElement(element); 
    addTextToElement(e, text);
    return e;
}

let projectList = new Array();

projectList.push(new Project("Minecraft In A Week", "mc-one-week", "August 2017")
    .addParagraph("This was a project created for a challenge in the summer of 2017.")
    .addParagraph("The challenge was to try and implement as much of the Minecraft game as I could in a week, and I recorded my proccess throughout. People continued to develop the project after I finished it, adding features such as a day/night cycle.")
    .addList("Features", [  "Procederal World Generation", 
                            "Biomes",
                            "'Infinite World'",
                            "Break Blocks",
                            "Remove blocks",
                            "Collision Detection",
                            "Simple Inventory System"])
    .addLinks("https://www.youtube.com/watch?v=Xq3isov6mZ8",
              "https://github.com/Hopson97/MineCraft-One-Week-Challenge",
              "https://drive.google.com/uc?authuser=0&id=1t7P-1dQc799ZmZXmUpejum2zk2Ue-scH&export=download")
    .setImage("img/mc_week1.jpg")
);

projectList.push(new Project("Hopson Bot", "hop-bot", "December 2017")
    .addParagraph("This is a community project, initally created for a custom bot on my Discord Community Server.")
);

projectList.push(new Project("Game of Life", "game-of-life", "September 2017")
    .addParagraph("Conway's Game of Life cellular automaton created in C++/SFML")
);

projectList.push(new Project("Langton's Ant", "langtons-ant", "August 2017")
    .addParagraph("Langton's Ant cellular automaton created in C++/SFML.")
);

projectList.push(new Project("Hopson Arcade", "hop-arcade", "April 2018")
    .addParagraph("A bunch of arcade games created using C++/SFML.")
);

let projects = document.getElementById("projects");
for (proj of projectList) {
    //Get a template
    let obj = getTemplateClone();

    //Set title
    let titleEle = findChild(obj.container, "project-title");
    let title = document.createTextNode(proj.title);
    titleEle.appendChild(title);
    titleEle.id = proj.id;

    //Set date
    let dateEle = findChild(obj.container, "minor");
    let date = document.createTextNode(proj.date);
    titleEle.appendChild(title);

    //Add paragraphs
    let paraEleParent = findChild(obj.container, "project-paragraphs");
    for (let para of proj.paragraphs) {
        let paraEle = createElement("p", para);
        paraEleParent.appendChild(paraEle);
    }

    //Add lists 
    let listParent = findChild(obj.container, "project-lists");
    for (let list of proj.lists) {
        let listTitle = createElement("h3", list.title);
        let listEle = document.createElement("ul");
        for (let item of list.content) {
            let listItem = createElement("li", item);
            listEle.appendChild(listItem);
        }
        listParent.appendChild(listTitle);
        listParent.appendChild(listEle);
    }

    //Add links
    if (proj.links != null) {
        let linksParent = findChild(obj.container, "project-links");
        let linkTitle = createElement("h3", "Links");
        let listParent = document.createElement("ul");
        listParent.classList.add("inline-list");
        listParent.classList.add("project-links");

        function createLink(name, location) {
            let li = document.createElement("li");
            let a  = createElement("a", name);

            a.target = "_blank";
            a.href = location;
            li.appendChild(a);
           // addTextToElement(li, "");
            listParent.appendChild(li);
        }

        createLink("YouTube", proj.links.yt);
        createLink("GitHub", proj.links.github);
        createLink("Download", proj.links.download);
        linksParent.appendChild(linkTitle);
        linksParent.appendChild(listParent);
    }

    //Add image
    if (proj.image != null) {
        let imageParent = findChild(obj.container, "project-image");
        let image = document.createElement("img");
        image.classList.add("contained-img");
        image.src = proj.image.link;
        image.alt = proj.image.alt;
        imageParent.appendChild(image);
    }
    else {
        obj.container.removeChild(findChild(obj.container, "project-image"));
    }


    let clone = document.importNode(obj.temp.content, true);
    projects.appendChild(clone);
}


