"use strict"

function makeProjectLinkElement(project) {
    const title = project.querySelector(".project-title h3").textContent;

    const date = project.querySelector(".project-title .date").textContent.split(" ");
    const month = date[0].substr(0, 3);
    const year = date[1].substr(2, 2);

    const projectLink = document.createElement("a");
    projectLink.href = `#${project.id}`;
    projectLink.textContent = `${title}`;
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
        updateLinks(projectLinks, tag);

        document.querySelectorAll(".project-tag").forEach(tag => {
            tag.classList.remove("selected-tag");
        });
        document.querySelectorAll(".filter" + tag).forEach(tag => {
            tag.classList.add("selected-tag");
        });
    });
}

function updateLinks(projectLinks, tagName) {
    for (const link of projectLinks) {
        if (link.classList.contains(tagName) || !tagName) {
            link.classList.remove("hidden");
        } else {
            link.classList.add("hidden");
        }
    }
}

window.addEventListener("load", _ => {
    const projects = Array.from(document.getElementById("project-articles").childNodes);
    projects.shift();
    projects.pop();

    const allTags = [];
    const allLangTags = [];
    const allMiscTags = [];
    const projectLinks = [];


    for (const project of projects) {
        // Ensure it is actually an article
        if (project.nodeName !== "ARTICLE") {
            continue;
        }

        project.classList.add("hideable");

        const projectList = document.getElementById("project-list");
        const projectLink = makeProjectLinkElement(project);
        projectLinks.push(projectLink);

        // Get the tag list
        const langTags = project.getAttribute("langTags");
        const miscTags = project.getAttribute("miscTags");
        const tags = `${langTags} ${miscTags}`.split(" ");

        for (const tag of tags) {
            allTags.push(tag);
            project.classList.add(tag.replaceAll("+", "p"));
            const tagNode = makeTagElement(tag);
            project.querySelector(".project-tags").appendChild(tagNode);
            initTagEvent(tagNode, projectLinks);

            allTags.push(tag);
            projectLink.classList.add(tag.replaceAll("+", "p"));
            projectList.appendChild(projectLink);
        }

        allLangTags.push(...langTags.split(" "));
        allMiscTags.push(...miscTags.split(" "));
    }

    function addTagsToFilter(tags, filterList) {
        for (const tag of tags) {
            const tagNode = makeTagElement(tag);

            filterList.appendChild(tagNode);
            initTagEvent(tagNode, projectLinks);
        }
    }
    const filteredLangTags = unique(allLangTags).sort();
    const filteredMiscTags = unique(allMiscTags).sort();
    //const langTagFilters = document.getElementById("lang-tags-filters");
    //const miscTagFilters = document.getElementById("misc-tags-filters");
    //addTagsToFilter(filteredLangTags, langTagFilters);
    //addTagsToFilter(filteredMiscTags, miscTagFilters);
    addTagsToFilter(filteredLangTags, document.getElementById("tags-filters"));
    addTagsToFilter(filteredMiscTags, document.getElementById("tags-filters"));
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