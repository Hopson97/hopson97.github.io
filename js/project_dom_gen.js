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

        this.innerDiv = document.createElement("div");
        
        this.parentElement.classList.add("project-container");
        this.parentElement.id = id;

        let titleElement = createElement("h2", title);
        let dateElement  = createElement("p", date);
        dateElement.classList.add("minor");

        this.innerDiv.appendChild(titleElement);
        this.innerDiv.appendChild(dateElement);

        let backToTopLink = createElement("a", "Back to Top");
        backToTopLink.href = "#";
        backToTopLink.classList.add("minor");

        this.parentElement.appendChild(this.innerDiv);
        this.parentElement.appendChild(backToTopLink);
    }

    addParagraph(text) 
    {
        let paragraphElement = createElement("p", text);
        this.innerDiv.appendChild(paragraphElement);
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
        this.innerDiv.appendChild(listTitleElement);
        this.innerDiv.appendChild(listElementParent);

        //this.lists.push({title: title, content: content});
        return this;
    }

    /** 
     *  Takes an array ->
     *  {
     *      title: title of the link
     *      location: location of href of the link
     *  }
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
        
        this.innerDiv.appendChild(linksTitleElement);
        this.innerDiv.appendChild(listElementParent);
        return this;
    }

    addImage(imageSource)
    {
        imageSource = "img/" + imageSource + ".jpg";
        let imageParent = document.createElement("div");
        imageParent.classList.add("project-image");

        let imageElement = document.createElement("img");
        imageElement.classList.add("contained-img");
        imageElement.src = imageSource;
        imageElement.alt = "Image of " + this.title;

        imageParent.appendChild(imageElement);
        this.innerDiv.appendChild(imageParent);

        return this;
    }
}//end of project class

function getNewProjectsArray()
{
    let projectList = new Array();

    /**
     * Minecraft Week
     */
    projectList.push(new Project("Minecraft In A Week", "mc-one-week", "August 2017")
        .addParagraph("This was a project created for a challenge in the summer of 2017.")
        .addParagraph("The challenge was to try and implement as much of the Minecraft game as I could in a week, and I recorded my proccess throughout. People continued to develop the project after I finished it, adding features such as a day/night cycle.")
        .addList("Features", [  "Procederal World Generation (Trees, hills, etc)", 
                                "Biomes",
                                "'Infinite World'",
                                "Break Blocks",
                                "Place blocks",
                                "Collision Detection",
                                "Simple Inventory System"])
        .addLinks([ new ProjectExtLink("YouTube", "https://www.youtube.com/watch?v=Xq3isov6mZ8"),
                    new ProjectExtLink("GitHub",   "https://github.com/Hopson97/MineCraft-One-Week-Challenge"),
                    new ProjectExtLink("Download", "https://drive.google.com/uc?authuser=0&id=1t7P-1dQc799ZmZXmUpejum2zk2Ue-scH&export=download")])
        .addImage("mc_week1")
    );
    
    /**
     * Hopson Bot
     */
    projectList.push(new Project("Hopson Bot", "hop-bot", "December 2017")
        .addParagraph("This is a community project, initally created for a custom bot on my Discord Community Server.")
        .addParagraph("It was my first project using JS, and uses the Discord.js API to interact with Discord servers.")
        .addList("Features", [  "Quiz commands",
                                "Track message edits and deletion for moderation purposes",
                                "Poll commands",
                                "Fun commands (eg 8Ball)",
                                "Role editing commands"])
        .addLinks([new ProjectExtLink("GitHub", "https://github.com/HopsonCommunity/HopsonBot"),])
        .addImage("hopbot1")
    );
    
    /**
     *  Game of Life
     */
    projectList.push(new Project("Game of Life", "game-of-life", "September 2017")
        .addParagraph("Conway's Game of Life cellular automaton created in C++/SFML")
        .addParagraph("Game of life is one of the most famous cellular automatons, created by mathematiction John Horton Conway in 1970. The rules of GOL can be found on the wikipedia article linked.")
        .addList("Features", [  "The CA itself",
                                "Edit the cells"])
        .addLinks([ new ProjectExtLink("Rules (Wikipedia)", "https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Rules"),
                    new ProjectExtLink("YouTube", "https://www.youtube.com/watch?v=WVCM3Rv4VV8"),
                    new ProjectExtLink("GitHub", "https://github.com/Hopson97/Conway-s-Game-Of-Life"),
                    new ProjectExtLink("Download", "https://drive.google.com/uc?authuser=0&id=0B-bhEaACRE65UXhOZHRRR1J1SEU&export=download")])
        .addImage("gol1")
    );
    /**
     * Langton's Ant
     */
    projectList.push(new Project("Langton's Ant", "langtons-ant", "August 2017")
        .addParagraph("Langton's Ant cellular automaton created in C++/SFML.")
        .addParagraph("Game of life is one of the most famous cellular automatons, created by mathematiction John Horton Conway in 1970. The rules of GOL can be found on the wikipedia article linked")
        .addList("Features", [  "Able to choose number of ants",
                                "Add more ants during runtimes",
                                "Multi-Coloured Ants"])
        .addLinks([ new ProjectExtLink("Rules (Wikipedia)", "https://en.wikipedia.org/wiki/Langton%27s_ant#Rules"),
                    new ProjectExtLink("GitHub", "https://github.com/Hopson97/LangtonsAnt"),
                    new ProjectExtLink("YouTube", "https://www.youtube.com/watch?v=HGa5u6I-8Qg"),
                    new ProjectExtLink("Download", "https://drive.google.com/uc?authuser=0&id=1u2Oca1SxS2aUapVqXDnC9xCoGfDbUUvB&export=download")])
        .addImage("langton_ant")
    );
    
    projectList.push(new Project("Hopson Arcade", "hop-arcade", "April 2018")
        .addParagraph("A bunch of arcade games created using C++/SFML.")
        .addParagraph("The first game added was Space Invaders, based on the classic 1978 arcade game. I tried to keep it as close to the original one as poosible, including having destructable shields")
        .addList("Current games", ["Space Inavders"])
        .addLinks([new ProjectExtLink(  "GitHub", "https://github.com/Hopson97/Hopson-Arcade",
                                        "Videos", "https://www.youtube.com/playlist?list=PLMZ_9w2XRxiYBAj0jmfTgdYDg2x-cnCgf")])
        .addImage("sp_invaders")
    );
    return projectList;
}

//Creates the contents section of the Projects page
function createContentsHTML(projectList)
{
    console.log(document.activeElement.id);
    //Creates a "column" of the contents
    function createColumn()
    {
        let list = document.createElement("ul");
        list.classList.add("contents-col");
        return list;
    }
    
    let i = 0;
    let lists = new Array();
    for (let i = 0; i < 3; i++) {
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
function generateProjectHTML(projectList) 
{
    createContentsHTML(projectList);

    let projectParent = document.getElementById("projects");
    for (let project of projectList) {
        projectParent.appendChild(project.parentElement);
    }
}
