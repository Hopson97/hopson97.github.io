"use strict"

function makeProjectLinkElement(id, title, project) {
    const date = project.querySelector(".project-title .date").textContent.split(" ");
    let month = date[0];
    let year = date[1];
    month = month[0] + month[1] + month[2];
    year = year[2] + year[3];
    const dateString = `${month} ${year}`;

    const projectLink = document.createElement("a");
    projectLink.href = `#${id}`;
    projectLink.textContent = `${dateString}: ${title}`;
    projectLink.classList.add("project-link");
    projectLink.classList.add("hideable");
    return projectLink;
}

function makeTagElement(tagName) {
    const tagNode = document.createElement("div");
    tagNode.textContent = tagName;

    tagNode.classList.add("filter" + tagName.replaceAll("+", "p"));
    tagNode.classList.add("project-tag");
    tagNode.classList.add("ml-3");

    return tagNode;
}

function unique(oldArray) {
    const tracker = {};
    const newArray = [];
    for (let i = 0; i < oldArray.length; i++) {
        if (!tracker.hasOwnProperty(oldArray[i])) {
            newArray.push(oldArray[i]);
            tracker[oldArray[i]] = 1;
        }
    }
    return newArray;
}

function initTagEvent(tagbutton, projectLinks) {
    const tag = tagbutton.textContent.replaceAll("+", "p");
    tagbutton.addEventListener("click", () => {
        const items = document.querySelectorAll(".hideable");
        items.forEach(item => {
            if (item.classList.contains(tag)) {
                item.classList.remove("hidden");
            } else {
                item.classList.add("hidden");
            }
        });
        updateLinks(projectLinks);

        document.querySelectorAll(".project-tag").forEach(tag => {
            tag.classList.remove("selected-tag");
        });
        document.querySelectorAll(".filter" + tag).forEach(tag => {
            tag.classList.add("selected-tag");
        });
    });
}

function updateLinks(projectLinks) {

    const projectList = document.getElementById("project-list");
    projectList.innerHTML = "";

    for (const projectLink of projectLinks) {
        if (projectLink.classList.contains("hidden")) {
            continue;
        }
        projectList.appendChild(projectLink);
    }

    for (const projectLink of projectLinks) {
        if (projectLink.classList.contains("hidden")) {
            projectList.appendChild(projectLink);
        }
    }
}

window.addEventListener("load", _ => {
    const projects = Array.from(document.getElementById("project-articles").childNodes);
    projects.shift();
    projects.pop();

    const allTags = [];
    const projectLinks = [];

    const cache = []

    for (const project of projects) {
        // Ensure it is actually an article
        if (project.nodeName !== "ARTICLE") {
            continue;
        }

        project.classList.add("hideable");

        // Get the tag list
        let tags = project.getAttribute("tags");
        if (tags) {
            tags = tags.split(" ");
            for (const tag of tags) {
                allTags.push(tag);
                project.classList.add(tag.replaceAll("+", "p"));
            }
            for (const tag of tags) {
                const tagNode = makeTagElement(tag);
                project.querySelector(".project-tags").appendChild(tagNode);
                initTagEvent(tagNode, projectLinks);
            }
        }

        // Get the ID of the project from its name, and then add it to the project list
        const title = project.querySelector(".project-title h3").textContent;
        const id = title.toLowerCase().split(" ").join("-").replace("*", "_").replace("'", "_");
        project.id = id;

        let found = false;
        for (const p of cache) {
            if (p === title) {
                found = true;
                break;
            }
        }
        if (found) {
            continue;
        }
        cache.push(title);

        // Get the date of the project
        const projectLink = makeProjectLinkElement(id, title, project);
        projectLinks.push(projectLink);
        for (const tag of tags) {
            allTags.push(tag);
            projectLink.classList.add(tag.replaceAll("+", "p"));
        }
    }

    const filteredTags = unique(allTags).sort();

    const tagFilters = document.getElementById("filters");
    for (const tag of filteredTags) {
        const tagNode = makeTagElement(tag);

        tagFilters.appendChild(tagNode);
        initTagEvent(tagNode, projectLinks);
    }

    document.getElementById("reset-tags").addEventListener("click", () => {
        const items = document.querySelectorAll(".hideable");
        items.forEach(item => {
            item.classList.remove("hidden");
            updateLinks(projectLinks);

        });
        document.querySelectorAll(".project-tag").forEach(tag => {
            tag.classList.remove("selected-tag");
        });
    });
    updateLinks(projectLinks);
});