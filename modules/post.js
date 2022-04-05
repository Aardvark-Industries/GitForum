---
---

import { errorMessage } from '/{{ site.repo }}/modules/ui.js';

async function sendPost(octokit, owner, repo, title, body, board) {
    var e;
    try {
        octokit.rest.issues.create({
            owner: owner,
            repo: repo,
            title: "[" + board + "]" + title, 
            body: body,
        });

    } catch (error) {
        errorMessage("Error posting: " + e);
        e = true;
    }

    if(!e){
        window.location.href = "/GitForum/board?board=" + document.getElementById("boardSelector").value;
    }
}

async function sendComment(octokit, owner, repo, issue_number, body) {
    await octokit.rest.issues.createComment({
        owner,
        repo,
        issue_number,
        body,
      });

    document.getElementById("commentContent").value = "";
    window.location.reload();
}

export {sendPost, sendComment};