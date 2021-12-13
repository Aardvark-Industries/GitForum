var URLParams = new URLSearchParams(window.location.search);

async function loadPosts(board) {
    var issues = await (await fetch('https://api.github.com/repos/Aardvark-Industries/GitForum-content/issues?labels=' + board.name)).json();

    var posts = [];
    issues.forEach(issue => posts.push(new Post(issue.id, issue.title, issue.body)));

    return posts;
}

async function loadBoards() {
    var labels = await (await fetch('https://api.github.com/repos/Aardvark-Industries/GitForum-content/labels')).json();

    var boards = [];
    labels.forEach(label => boards.push(new Board(label.name, label.description)));

    return boards;
}