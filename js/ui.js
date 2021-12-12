postContainer = document.getElementById("postContainer");

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