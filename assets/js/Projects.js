"use strict"

window.addEventListener("load", _ => {
    const projectLists = [
        document.getElementById("project-index-row0"),
        document.getElementById("project-index-row1"),
        document.getElementById("project-index-row2")]
    let currColumn = 0;

    const projects = Array.from(document.getElementById("project-articles").childNodes);
    projects.shift();
    projects.pop();
    for (const project of projects) {
        // Ensure it is actually an article
        if (project.nodeName !== "ARTICLE") {
            continue;
        }

        // Get the date of the project
        const date = project.querySelector(".project-title .date").textContent.split(" ");
        let month = date[0];
        let year = date[1];
        month = month[0] + month[1] + month[2];
        year = year[2] + year[3];
        const dateString = `${month} ${year}`;
        
        // Get the ID of the project from its name, and then add it to the project list
        const title = project.querySelector(".project-title h3").textContent;
        const id = title.toLowerCase().split(" ").join("-").replace("*", "_").replace("'", "_");
        project.id = id;

        const currentList = projectLists[currColumn++];
        const projectLink = document.createElement("a");
        projectLink.href = `#${id}`;
        projectLink.textContent = `${dateString}: ${title}`;
        projectLink.classList.add("project-link");
        currentList.appendChild(projectLink);
        if (currColumn == 3) {
            currColumn = 0;
        }
        
        const tagList = project.querySelector(".project-tags");
        let tags = project.getAttribute("tags");
        console.log (tags);
        if (tags) {
            tags = tags.split(" ");
            for (const tag of tags) {
                project.classList.add(tag)

                const tagNode = document.createElement("div");
                tagNode.textContent = tag;
                tagNode.classList.add("project-tag");
                tagList.appendChild(tagNode);
            }
        }
    }
});