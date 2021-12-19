---
---

async function sendPost(octokit, owner, repo, title, body, board) {
    octokit.rest.issues.create({
        owner: owner,
        repo: repo,
        title: title, 
        body: body,
        labels: [board]
    });

    window.location.href = "/GitForum/board?board=" + document.getElementById("boardSelector").value;
}

export {sendPost};