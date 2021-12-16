postContainer = document.getElementById("postContainer");
navLinkContainer = document.getElementById("navLinkContainer")

function displayPostPreview(post){ // display post preview on board overview

    postObject = document.createElement("div");
    postObject.className = "card mb-4";

    //------------------------------------------
    postBody = document.createElement("div");
    postBody.className = "card-body row";

    postTitleContainer = document.createElement("a");
    postTitleContainer.href = "post?post=" + post.id + "&board=" + post.board;

    postTitle = document.createElement("h5");
    postTitle.className = "card-title";
    postTitle.innerText = post.title;

    postTitleContainer.appendChild(postTitle);

    postContent = document.createElement("p");
    postContent.className = "card-text";
    postContent.innerText = post.content;

    postContentContainer = document.createElement("div");
    postContentContainer.className = "col";

    postContentContainer.appendChild(postTitleContainer);
    postContentContainer.appendChild(postContent);

    //------------------------------------------


    //------------------------------------------

    postBadgeContainer = document.createElement("div");
    postBadgeContainer.className = "col-1 text-end";
    postBadgeContainer.style.boxSizing = "content-box"; // forces badge inside card... at least until the screen gets really small

    postCommentIndicator = document.createElement("span");
    postCommentIndicator.className = "badge bg-secondary";
    postCommentIndicator.style = ""
    postCommentIndicator.innerText = post.comments.toString() + " ";

    postCommentIcon = document.createElement("i");
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

async function displayPostPreviews(board) {
    var posts = await loadPosts(board);
    
    posts.forEach(post => displayPostPreview(post))
}

async function displayNavLinks(){ // show links to each board in navbar
    var boards = await loadBoards();

    boards.forEach(board => {
        ul = document.createElement("li");
        ul.className = "nav-item";

        a = document.createElement("a");
        a.innerText = board.name;
        a.href = "board?board=" + board.name;
        a.className = "nav-link"

        if(board.name == URLParams.get("board")){ // highlight current board
            a.className += " active"
        }

        ul.appendChild(a);
        navLinkContainer.appendChild(ul);
    })
}