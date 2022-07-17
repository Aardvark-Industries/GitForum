---
---

import {URLParams, loadPosts, loadUserPosts, loadBoards, getAuthenticatedUser} from '/{{ site.repo }}/modules/load.js';
import {getUserVoteState, upvotePost, downvotePost} from '/{{ site.repo }}/modules/vote.js';
import {checkAuth} from '/{{ site.repo }}/modules/cookies.js';
import Cookies from 'https://cdn.jsdelivr.net/npm/js-cookie@3.0.1/dist/js.cookie.mjs';

var postContainer = document.getElementById("postContainer");
var navLinkContainer = document.getElementById("navLinkContainer")

function displayPostPreview(post, board, vote_state){ // display post preview on board overview

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
    postInfo.innerHTML = "posted by <a href='user?board=user&user=" + post.author + "'>" + post.author + "</a> in ";

    var postInfoTime = document.createElement("span");
    postInfoTime.innerText = " " + DateTime.fromISO(post.date).toRelative().toLocaleString(DateTime.DATETIME_MED);

    var postInfoBoard = document.createElement("span");
    postInfoBoard.className = "badge bg-primary";
    postInfoBoard.innerHTML = "<a class='text-light text-decoration-none' id='postBoard' href='board?board=" + post.board + "'>" + post.board + "</a>";
    postInfo.appendChild(postInfoBoard);
    
    postInfo.appendChild(postInfoTime);
    
    var postContent = document.createElement("p");
    postContent.className = "card-text";

    if (post.content.length > 256){
        postContent.innerText = post.content.slice(0, 255) + "...";
    } else {
        postContent.innerText = post.content;
    }

    

    var postContentContainer = document.createElement("div");
    postContentContainer.className = "col";

    postContentContainer.appendChild(postTitleContainer);
    postContentContainer.appendChild(postInfo);
    postContentContainer.appendChild(postContent);

    //------------------------------------------


    //------------------------------------------

    var postBadgeContainer = document.createElement("div");
    postBadgeContainer.className = "text-end";
    postBadgeContainer.style.width="37.6px";
    postBadgeContainer.style.boxSizing = "content-box"; // forces badge inside card... at least until the screen gets really small

    var postCommentIndicator = document.createElement("span");
    postCommentIndicator.className = "badge bg-secondary";
    postCommentIndicator.style = "";
    postCommentIndicator.innerText = post.comments.toString() + " ";

    var postCommentIcon = document.createElement("i");
    postCommentIcon.className = "bi bi-chat-left-text-fill";
    postCommentIcon.style = "";

    postCommentIndicator.appendChild(postCommentIcon);
    postBadgeContainer.appendChild(postCommentIndicator);

    var postUpvoteIndicator = document.createElement("span");
    postUpvoteIndicator.className = "badge bg-secondary";
    postUpvoteIndicator.style = "";
    // postUpvoteIndicator.id = "post-upvotes";
    // postUpvoteIndicator.onclick = (() => {upvotePost(window.OCTOKIT, window.OWNER, window.REPO, post.id)});
    postUpvoteIndicator.innerText = post.upvotes.toString() + " ";

    if (vote_state == 1) {
        postUpvoteIndicator.className = "badge bg-primary";
    }

    var postUpvoteIcon = document.createElement("i");
    postUpvoteIcon.className = "bi bi-chevron-up";
    postUpvoteIcon.style = "";

    postUpvoteIndicator.appendChild(postUpvoteIcon);
    postBadgeContainer.appendChild(postUpvoteIndicator);

    var postDownvoteIndicator = document.createElement("span");
    postDownvoteIndicator.className = "badge bg-secondary";
    postDownvoteIndicator.style = "";
    // postDownvoteIndicator.id = "post-downvotes";
    // postDownvoteIndicator.onclick = (() => {downvotePost(window.OCTOKIT, window.OWNER, window.REPO, post.id)});
    postDownvoteIndicator.innerText = post.downvotes.toString() + " ";

    if (vote_state == -1) {
        postDownvoteIndicator.className = "badge bg-primary";
    }

    var postDownvoteIcon = document.createElement("i");
    postDownvoteIcon.className = "bi bi-chevron-down";
    postDownvoteIcon.style = "";
    
    
    postDownvoteIndicator.appendChild(postDownvoteIcon);
    postBadgeContainer.appendChild(postDownvoteIndicator);
    
    //------------------------------------------

    postBody.appendChild(postContentContainer);
    postBody.appendChild(postBadgeContainer);

    postObject.appendChild(postBody);

    postContainer.appendChild(postObject);
}

async function displayPostPreviews(octokit, board, page) {
    var posts = await loadPosts(octokit, board, page);
    
    if(posts.length < 1) {
        var emptyMessage = document.createElement("h5");
        emptyMessage.className = "text-muted";
        emptyMessage.innerText = "There's nothing here."

        postContainer.appendChild(emptyMessage);
    } else {
        posts.forEach(async post => {
            if (await checkAuth()) {
                var authenticatedUser = await getAuthenticatedUser(octokit);
                var userVoteState = await getUserVoteState(octokit, window.OWNER, window.REPO, post.id, authenticatedUser);
                displayPostPreview(post, "", userVoteState);
            } else {
                displayPostPreview(post, "" , 0);
            }
        });
    }
}

async function displayUserPostPreviews(octokit, user) {
    var posts = await loadUserPosts(octokit, user);

    if(posts.length < 1) {
        var emptyMessage = document.createElement("h5");
        emptyMessage.className = "text-muted";
        emptyMessage.innerText = "There's nothing here."

        postContainer.appendChild(emptyMessage);
    } else {
        posts.forEach(async post => {
            if (await checkAuth()) {
                var authenticatedUser = await getAuthenticatedUser(octokit);
                var userVoteState = await getUserVoteState(octokit, window.OWNER, window.REPO, post.id, authenticatedUser);
                displayPostPreview(post, "user", userVoteState);
            } else {
                displayPostPreview(post, "user", 0);
            }
        });
    }
}

async function displayNavLinks(octokit){ // show links to each board in navbar
    var boards = await loadBoards(octokit);

    var loggedIn = false;
    if(Cookies.get('token')){
        loggedIn = true;
        document.getElementById("loginButton").style.display = "none";
        document.getElementById("newPostButton").style.display = "inline-block";
        document.getElementById("user-dropdown").style.display = "inline-block";
        document.getElementById("userButton").src = "https://github.com/" + Cookies.get('username') + ".png";
        document.getElementById("profile-page-link").href = "user?user=" + Cookies.get('username');
    } else {
        document.getElementById("userButton").style.display = "none";
        document.getElementById("loginButton").style.display = "inline-block";
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
                commentAuthor.href = "user?board=user&user=" + comment.user.login;
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

function errorMessage(error, icon, colour){
    if(icon == undefined){
        icon = "exclamation-triangle-fill"; 
    }

    if(colour == undefined){
        colour = "danger"
    }

    var errorElem = document.createElement("div");
    errorElem.className = "alert alert-" + colour + " alert-dismissible fade show shadow";
    errorElem.role="alert";

    var iconElem = document.createElement("i");
    iconElem.className = "bi bi-" + icon;
    iconElem.innerText = " ";

    var errorText = document.createElement("span");
    errorText.innerHTML = error;

    var dismissButton = document.createElement("button");
    dismissButton.type="button";
    dismissButton.className="btn-close";
    dismissButton.setAttribute("data-bs-dismiss", "alert");
    dismissButton.ariaLabel = "close";

    errorElem.appendChild(iconElem);
    errorElem.appendChild(errorText);
    errorElem.appendChild(dismissButton);

    document.getElementById("alertContainer").appendChild(errorElem);
}

export {displayPostPreviews, displayUserPostPreviews, displayNavLinks, displayComment, errorMessage};