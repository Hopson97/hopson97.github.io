//Represents a single projects on the Projects page
class Project 
{
    constructor(title, id, date)
    {
        this.title = title;
        this.id = id;
        this.date = date;
        this.links = null;
        this.images     = new Array();
        this.paragraphs = new Array();
        this.lists      = new Array();
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

    addImage(link)
    {
        this.images.push({
            alt: "Image of " + this.title,
            link: link
        });
        return this;
    }
}

//Finds a child element based on class name
function findChild(element, childClassName) 
{
    for (let i = 0; i < element.childNodes.length; i++) {
        if (element.childNodes[i].className === childClassName) {
            return element.childNodes[i];
        }        
    }
    return null;
}

//Clones the project HTML Template and returns it
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

//Adds text to an element duh
function addTextToElement(element, text) 
{
    let t = document.createTextNode(text);
    element.appendChild(t);
}

//Creates an element and adds text to it one go
function createElement(element, text) 
{
    let e = document.createElement(element); 
    addTextToElement(e, text);
    return e;
}

function getProjectArray()
{
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
        .addImage("img/mc_week1.jpg")
       // .addImage("img/mc_week2.jpg")
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
    return projectList;
}


//Creates the HTML for all of the projects
function createProjectsHTML(projectList)
{
    //Create the main project section
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
        dateEle.appendChild(date);
    
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
    
        //Add images
        let imagesParent = findChild(obj.container, "project-images");
        imagesParent.classList.add("center");
        for (let img of proj.images) {
            let imageContainer = document.createElement("div");
            imageContainer.classList.add("project-image")

            let imageElement = document.createElement("img");
            imageElement.classList.add("contained-img");
            imageElement.src = img.link;
            imageElement.alt = img.alt;
            imageContainer.appendChild(imageElement);
            imagesParent.appendChild(imageContainer);
        }/*
        if (proj.images.length == 0) {
            obj.container.removeChild(findChild(obj.container, "project-image"));
        }
        //Add image
        if (proj.image != null) {
            let image = document.createElement("img");
            image.classList.add("contained-img");
            imageParent.classList.add("center");
            image.src = proj.image.link;
            image.alt = proj.image.alt;
            imageParent.appendChild(image);
        }
        else {
            obj.container.removeChild(findChild(obj.container, "project-image"));
        }*/
    
    
        let clone = document.importNode(obj.temp.content, true);
        projects.appendChild(clone);
    }
}

//Creates the contents section of the Projects page
function createContentsHTML(projectList)
{
    function createColumn()
    {
        let list = document.createElement("ul");
        list.classList.add("contents-col");
        return list;
    }
    
    //Create the contents page
    let i = 0;
    let lists = new Array();
    for (let i = 0; i < 4; i++) {
        lists.push(createColumn());
    }

    let contentsParent = document.getElementById("contents-list")
    for (proj of projectList) {
        let list = lists[i++ % lists.length];
        let li = document.createElement("li");
        let a  = createElement("a", proj.title);
        a.href = "#" + proj.id;
        li.appendChild(a);
        list.appendChild(li);
    }
    
    for (let column of lists) {
        contentsParent.appendChild(column);
    }
}

//Generates the HTML of all the projects
function generateProjectHTML() 
{
    let projectList = getProjectArray();
    createContentsHTML(projectList);
    createProjectsHTML(projectList);
}

generateProjectHTML() 
