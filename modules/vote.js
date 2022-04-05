---
---

import {getAuthenticatedUser, getPost} from '/{{ site.repo }}/modules/load.js';
import {checkAuth} from '/{{ site.repo }}/modules/cookies.js';
import { errorMessage } from '/{{ site.repo }}/modules/ui.js';

async function upvotePost(octokit, owner, repo, issue_number) {
    if(await checkAuth()){
        var authenticatedUser = await getAuthenticatedUser(octokit);
        var response1 = await clearUserIssueReactions(octokit, owner, repo, issue_number, authenticatedUser);
        var response2 = await octokit.rest.reactions.createForIssue({
            owner: owner,
            repo: repo,
            issue_number: issue_number,
            content: '+1'
        })
    
        document.getElementById("post-upvotes").className = "badge bg-primary";
        document.getElementById("post-downvotes").className = "badge bg-secondary";

        var response3 = await displayVotes(octokit, owner, repo, issue_number);

    } else {
        errorMessage("You must be logged in to vote")
    }
}

async function downvotePost(octokit, owner, repo, issue_number) {
    if(await checkAuth()){
        var authenticatedUser = await getAuthenticatedUser(octokit);
        var response1 = await clearUserIssueReactions(octokit, owner, repo, issue_number, authenticatedUser);
        var response2 = await octokit.rest.reactions.createForIssue({
            owner: owner,
            repo: repo,
            issue_number: issue_number,
            content: '-1'
        })

        document.getElementById("post-upvotes").className = "badge bg-secondary";
        document.getElementById("post-downvotes").className = "badge bg-primary";

        var response3 = await displayVotes(octokit, owner, repo, issue_number);
    } else {
        errorMessage("You must be logged in to vote")
    }
}

async function clearUserIssueReactions(octokit, owner, repo, issue_number, user) {    
    var reactions = await octokit.rest.reactions.listForIssue({
        owner: owner,
        repo: repo,
        issue_number: issue_number
    });

    reactions.data.forEach(async reaction => {
        if (reaction.user.login == user) {
            var response = await octokit.rest.reactions.deleteForIssue({
                owner: owner,
                repo: repo,
                issue_number: issue_number,
                reaction_id: reaction.id
            });
        }
    })

    
}

async function getUserVoteState(octokit, owner, repo, issue_number, user) {
    var reactions = await octokit.rest.reactions.listForIssue({
        owner: owner,
        repo: repo,
        issue_number: issue_number
    })

    var ret = 0
    reactions.data.forEach(reaction => {
        if (reaction.user.login == user.login) {
            if (reaction.content == "+1") {
                ret = 1;
                return;
            } else if (reaction.content == '-1') {;
                ret = -1;
                return;
            } else {
                ret = 0;
                return;
            }
        } 
    });

    // does javascript have switch statements?
    // maybe if you actually bothered to look it up you would know, https://www.w3schools.com/js/js_switch.asp

    return ret;
}

async function displayVotes(octokit, owner, repo, issue_number) {
    var post = await getPost(octokit, owner, repo, issue_number);

    if(await checkAuth()){
        var authenticatedUser = await getAuthenticatedUser(octokit);
        var authenticatedUserVoteState = await getUserVoteState(octokit, owner, repo, issue_number, authenticatedUser);

        if (authenticatedUserVoteState == 1) {
            document.getElementById("post-upvotes").className = "badge bg-primary";
            document.getElementById("post-downvotes").className = "badge bg-secondary";
        } else if (authenticatedUserVoteState == -1) {
            document.getElementById("post-upvotes").className = "badge bg-secondary";
            document.getElementById("post-downvotes").className = "badge bg-primary";
        } else {
            document.getElementById("post-upvotes").className = "badge bg-secondary";
            document.getElementById("post-downvotes").className = "badge bg-secondary";
        }
    } else {
        document.getElementById("post-upvotes").className = "badge bg-secondary";
        document.getElementById("post-downvotes").className = "badge bg-secondary";
    }

    document.getElementById('post-upvotes').innerHTML = post.upvotes + " <i class='bi bi-chevron-up'></i>";
    document.getElementById('post-downvotes').innerHTML = post.downvotes  + " <i class='bi bi-chevron-down'></i>";
}

export {upvotePost, downvotePost, clearUserIssueReactions, getUserVoteState, displayVotes};