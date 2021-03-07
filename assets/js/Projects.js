window.addEventListener("load", _ => {
    const projectList = document.getElementById("project-list");
    const projects = Array.from(document.getElementById("project-articles").childNodes);
    projects.shift();
    projects.pop();
    console.log(projects);
    for (const project of projects) {
        if (project.nodeName !== "ARTICLE") {
            continue;
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