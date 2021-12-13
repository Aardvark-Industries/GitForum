postContainer = document.getElementById("postContainer");
navLinkContainer = document.getElementById("navLinkContainer")

function displayPostPreview(post){
    newPost = document.createElement("div");
    newPost.className = "card mb-4";

    newPostBody = document.createElement("div");
    newPostBody.className = "card-body";

    newPostTitleContainer = document.createElement("a");
    newPostTitleContainer.href = "#"; //todo: add link generation

    newPostTitle = document.createElement("h5");
    newPostTitle.className = "card-title";
    newPostTitle.innerText = post.title;

    newPostTitleContainer.appendChild(newPostTitle);

    newPostContent = document.createElement("p");
    newPostContent.className = "card-text";
    newPostContent.innerText = post.content;

    newPostBody.appendChild(newPostTitleContainer);
    newPostBody.appendChild(newPostContent);

    newPost.appendChild(newPostBody);

    postContainer.appendChild(newPost);
}

async function displayPostPreviews(boardName) {
    var posts = await loadPosts(boardName);
    
    posts.forEach(post => displayPostPreview(post))
}

async function displayNavLinks(){ // show links to each board in navbar
    var boards = await loadBoards();

    boards.forEach(board => {
        ul = document.createElement("li");
        ul.className = "nav-item";

        a = document.createElement("a");
        a.innerText = board.name;
        a.href = "/board?board=" + board.name;
        a.className = "nav-link"

        if(board.name == URLParams.get("board")){ // highlight current board
            a.className += " active"
        }

        ul.appendChild(a);
        navLinkContainer.appendChild(ul);
    })
}