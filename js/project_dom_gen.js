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

class ProjectExtLink
{
    constructor(title, location)
    {
        this.title = title;
        this.location = location;
    }
}

//Represents a single projects on the Projects page
class Project 
{
    constructor(title, id, date)
    {
        this.title = title;
        this.id = id;
        this.date = date;

        this.parentElement = document.createElement("div");
        this.parentElement.classList.add("project-container");
        this.parentElement.id = id;

        let titleElement = createElement("h2", title);
        let dateElement  = createElement("p", date);
        dateElement.classList.add("minor");

        this.parentElement.appendChild(titleElement);
        this.parentElement.appendChild(dateElement);
    }

    addParagraph(text) 
    {
        let paragraphElement = createElement("p", text);
        this.parentElement.appendChild(paragraphElement);
        //this.paragraphs.push(text);
        return this;
    }

    addList(title, content)
    {
        let listTitleElement = createElement("h3", title);
        let listElementParent = document.createElement("ul");
        for (let item of content) {
            let listItem = createElement("li", item);
            listElementParent.appendChild(listItem);
        }
        this.parentElement.appendChild(listTitleElement);
        this.parentElement.appendChild(listElementParent);

        //this.lists.push({title: title, content: content});
        return this;
    }

    /*
        Takes an array ->
        {
            title: title of the link
            location: location of href of the link
        }
    */
    addLinks(links/*yt, github, download*/) 
    {
        let linksTitleElement = createElement("h3", "Links");
        let listElementParent = document.createElement("ul");
        listElementParent.classList.add("inline-list");
        listElementParent.classList.add("project-links");

        function addLink(link)
        {
            let listItem = document.createElement("li");
            let anchorElement = createElement("a", link.title);
            anchorElement.target = "_blank";
            anchorElement.href = link.location;

            listItem.appendChild(anchorElement);
            listElementParent.appendChild(listItem);
        }

        for (let i = 0; i < links.length; i++) {
            addLink(links[i]);
            console.add
        }
        
        this.parentElement.appendChild(linksTitleElement);
        this.parentElement.appendChild(listElementParent);
        /*
        this.links = {
            yt: yt,
            github: github,
            download: download
        }*/
        return this;
    }

    addImage(imageSource)
    {
        let imageParent = document.createElement("div");
        imageParent.classList.add("project-image");

        let imageElement = document.createElement("img");
        imageElement.classList.add("contained-img");
        imageElement.src = imageSource;
        imageElement.alt = "Image of " + this.title;

        imageParent.appendChild(imageElement);
        this.parentElement.appendChild(imageParent);
        /*
        this.images.push({
            alt: "Image of " + this.title,
            link: link
        });*/
        return this;
    }
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
        .addLinks([ new ProjectExtLink("YouTube", "https://www.youtube.com/watch?v=Xq3isov6mZ8"),
                    new ProjectExtLink("GitHub",   "https://github.com/Hopson97/MineCraft-One-Week-Challenge"),
                    new ProjectExtLink("Download", "https://drive.google.com/uc?authuser=0&id=1t7P-1dQc799ZmZXmUpejum2zk2Ue-scH&export=download")])
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

    let projectParent = document.getElementById("projects");
    for (let project of projectList) {
        projectParent.appendChild(project.parentElement);
    }


    //createProjectsHTML(projectList);
}

generateProjectHTML() 
