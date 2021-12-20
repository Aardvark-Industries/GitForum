---
---

import {URLParams, loadPosts, loadUserPosts, loadBoards} from '/{{ site.repo }}/modules/load.js';

var postContainer = document.getElementById("postContainer");
var navLinkContainer = document.getElementById("navLinkContainer")

function displayPostPreview(post, board){ // display post preview on board overview

    var postObject = document.createElement("div");
    postObject.className = "card mb-4";

    //------------------------------------------
    var postBody = document.createElement("div");
    postBody.className = "card-body row";

    var postTitleContainer = document.createElement("a");

    if (board == "user") {
        postTitleContainer.href = "post?post=" + post.id + "&prev=user";
    } else {
        postTitleContainer.href = "post?post=" + post.id;
    }
    

    var postTitle = document.createElement("h5");
    postTitle.className = "card-title";
    postTitle.innerText = post.title;

    postTitleContainer.appendChild(postTitle);

    var DateTime = luxon.DateTime;

    var postInfo = document.createElement("p");
    postInfo.innerHTML = "posted by <a href='https://github.com/" + post.author + "'>" + post.author + "</a> "

    var postInfoTime = document.createElement("span");
    postInfoTime.innerText = DateTime.fromISO(post.date).toRelative().toLocaleString(DateTime.DATETIME_MED);

    postInfo.appendChild(postInfoTime);

    var postContent = document.createElement("p");
    postContent.className = "card-text";
    postContent.innerText = post.content;

    var postContentContainer = document.createElement("div");
    postContentContainer.className = "col";

    postContentContainer.appendChild(postTitleContainer);
    postContentContainer.appendChild(postInfo);
    postContentContainer.appendChild(postContent);

    //------------------------------------------


    //------------------------------------------

    var postBadgeContainer = document.createElement("div");
    postBadgeContainer.className = "col-1 text-end";
    postBadgeContainer.style.boxSizing = "content-box"; // forces badge inside card... at least until the screen gets really small

    var postCommentIndicator = document.createElement("span");
    postCommentIndicator.className = "badge bg-secondary";
    postCommentIndicator.style = ""
    postCommentIndicator.innerText = post.comments.toString() + " ";

    var postCommentIcon = document.createElement("i");
    postCommentIcon.className = "bi bi-chat-left-text-fill";
    postCommentIcon.style = "";

    postCommentIndicator.appendChild(postCommentIcon);

    postBadgeContainer.appendChild(postCommentIndicator);
    //------------------------------------------

    postBody.appendChild(postContentContainer);
    postBody.appendChild(postBadgeContainer);

    postObject.appendChild(postBody);

    postContainer.appendChild(postObject);
}

async function displayPostPreviews(octokit, board) {
    var posts = await loadPosts(octokit, board);
    
    posts.forEach(post => displayPostPreview(post));
}

async function displayUserPostPreviews(octokit) {
    var posts = await loadUserPosts(octokit);

    posts.forEach(post => displayPostPreview(post, "user"));

}

async function displayNavLinks(octokit){ // show links to each board in navbar
    var boards = await loadBoards(octokit);

    var loggedIn = false;
    if(Cookies.get('token')){
        loggedIn = true;
        document.getElementById("loginButton").style.display = "none";
        document.getElementById("userButton").src = "https://github.com/" + Cookies.get('username') + ".png"
    } else {
        document.getElementById("userButton").style.display = "none";
        document.getElementById("newPostButton").style.display = "none";
    }

    document.getElementById("userButton").alt = "user";

    boards.forEach(board => {
        var ul = document.createElement("li");
        ul.className = "nav-item";

        var a = document.createElement("a");
        a.innerText = board.name;
        a.href = "board?board=" + board.name;
        a.className = "nav-link"

        if (board.name == URLParams.get("board")){ // highlight current board
            a.className += " active"
        }

        ul.appendChild(a);
        navLinkContainer.appendChild(ul);
    })
}

function displayComment(comment, post){
    var commentsContainer = document.getElementById("postComments");

        var commentContainer = document.createElement("div");
        commentContainer.className = "card mb-2";

            var commentHeader = document.createElement("div");
            commentHeader.className = "card-header";

                var commentIcon = document.createElement("img");
                commentIcon.height = 32;
                commentIcon.src = comment.user.avatar_url;
                commentIcon.className = "me-2 rounded";

                if(post.author == comment.user.login){
                    var commentBadge = document.createElement("span");
                    commentBadge.innerText = "OP";
                    commentBadge.className = "badge bg-primary ms-1";
                }

                var commentAuthor = document.createElement("a");
                commentAuthor.innerText = comment.user.login;
                commentAuthor.href = comment.user.url;
                commentAuthor.className = "fw-bold";

                var commentInter1 = document.createElement("span");
                commentInter1.innerText = " commented  "

                var commentTime = document.createElement("span");

                var DateTime = luxon.DateTime;
                commentTime.innerText = DateTime.fromISO(comment.created_at).toRelative().toLocaleString(DateTime.DATETIME_MED);

            commentHeader.appendChild(commentIcon);
            commentHeader.appendChild(commentAuthor);

            if(post.author == comment.user.login){
                commentHeader.appendChild(commentBadge);
            }

            commentHeader.appendChild(commentInter1);
            commentHeader.appendChild(commentTime);
        commentContainer.appendChild(commentHeader);
        
        var commentBody = document.createElement("div");
        commentBody.className = "card-body"
        
            var commentText = document.createElement("p");
            commentText.innerText = comment.body;
            commentText.className = "mb-0";

            commentBody.appendChild(commentText);
        commentContainer.appendChild(commentBody);

    commentsContainer.appendChild(commentContainer);
}

export {displayPostPreviews, displayUserPostPreviews, displayNavLinks, displayComment};