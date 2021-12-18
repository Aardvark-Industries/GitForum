import {URLParams, loadPosts, loadBoards} from '/GitForum/modules/load.js';

var postContainer = document.getElementById("postContainer");
var navLinkContainer = document.getElementById("navLinkContainer")

function displayPostPreview(post){ // display post preview on board overview

    var postObject = document.createElement("div");
    postObject.className = "card mb-4";

    //------------------------------------------
    var postBody = document.createElement("div");
    postBody.className = "card-body row";

    var postTitleContainer = document.createElement("a");
    postTitleContainer.href = "post?post=" + post.id + "&board=" + post.board;

    var postTitle = document.createElement("h5");
    postTitle.className = "card-title";
    postTitle.innerText = post.title;

    postTitleContainer.appendChild(postTitle);

    var postContent = document.createElement("p");
    postContent.className = "card-text";
    postContent.innerText = post.content;

    var postContentContainer = document.createElement("div");
    postContentContainer.className = "col";

    postContentContainer.appendChild(postTitleContainer);
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
    
    posts.forEach(post => displayPostPreview(post))
}

async function displayNavLinks(octokit){ // show links to each board in navbar
    var boards = await loadBoards(octokit);

    var loggedIn = false;
    if(Cookies.get('token')){
        loggedIn = true;
        document.getElementById("loginButton").style.display = "none";
    } else {
        document.getElementById("userButton").style.display = "none";
    }

    document.getElementById("userButton").alt = " ";
    document.getElementById("userButton").src = "assets/placeholderAvatar.png"

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

export {displayPostPreviews, displayNavLinks};