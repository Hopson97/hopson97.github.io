"use strict"

function unique(arr) {
    const u = {};
    const a = [];
    for (let i = 0, l = arr.length; i < l; ++i) {
        if (!u.hasOwnProperty(arr[i])) {
            a.push(arr[i]);
            u[arr[i]] = 1;
        }
    }
    return a;
}

function initTagEvent(tagbutton, projectLinks) {
    const tag = tagbutton.textContent;
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

        document.querySelectorAll(".project-tag-filter-all").forEach(tag => {
            tag.classList.remove("selected-tag");
        });
        document.querySelectorAll(".filter" + tag).forEach(tag => {
            tag.classList.add("selected-tag");
        });
    });
}

function updateLinks(projectLinks) {
    let currColumn = 0;

    const projectLists = [
        document.getElementById("project-index-row0"),
        document.getElementById("project-index-row1"),
        document.getElementById("project-index-row2")
    ];
    for (const list of projectLists) {
        list.innerHTML = "";
    }

    for (const projectLink of projectLinks) {
        if (projectLink.classList.contains("hidden")) {
            continue;
        }
        const currentList = projectLists[currColumn++];
        currentList.appendChild(projectLink);
        if (currColumn == 3) {
            currColumn = 0;
        }
    }

    for (const projectLink of projectLinks) {
        if (projectLink.classList.contains("hidden")) {
            const currentList = projectLists[currColumn++];
            currentList.appendChild(projectLink);
            if (currColumn == 3) {
                currColumn = 0;
            }
        }
    }
}

window.addEventListener("load", _ => {
    const projects = Array.from(document.getElementById("project-articles").childNodes);
    projects.shift();
    projects.pop();

    const allTags = [];
    const projectLinks = [];

    function addTagClasses(tags, element) {
        element.classList.add("taggable")
        for (const tag of tags) {
            allTags.push(tag);
            element.classList.add(tag)
        }
    }

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
            addTagClasses(tags, project);
            for (const tag of tags) {
                const tagNode = document.createElement("div");
                tagNode.textContent = tag;
                tagNode.classList.add("project-tag");
                tagNode.classList.add("project-tag-filter-all");
                tagNode.classList.add("filter" + tagNode.textContent);
                project.querySelector(".project-tags").appendChild(tagNode);
                initTagEvent(tagNode, projectLinks);
            }
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

        const projectLink = document.createElement("a");
        projectLink.href = `#${id}`;
        projectLink.textContent = `${dateString}: ${title}`;
        projectLink.classList.add("project-link");
        projectLink.classList.add("hideable");
        projectLinks.push(projectLink);
        if (tags) {
            addTagClasses(tags, projectLink);
        }


    }

    const filteredTags = unique(allTags).sort();

    const tagFilters = document.getElementById("filters");
    for (const tag of filteredTags) {
        const tagNode = document.createElement("div");
        tagNode.textContent = tag;
        tagNode.classList.add("filter" + tagNode.textContent);

        tagNode.classList.add("project-tag-filter-all");
        tagNode.classList.add("project-tag-filter");
        tagFilters.appendChild(tagNode);
        initTagEvent(tagNode, projectLinks);
    }

    document.getElementById("reset-tags").addEventListener("click", () => {
        const items = document.querySelectorAll(".hideable");
        items.forEach(item => {
            item.classList.remove("hidden");
            updateLinks(projectLinks);

        });
    });
    updateLinks(projectLinks);
});