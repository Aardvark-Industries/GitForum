async function loadPosts() {
    var issues = await (await fetch('https://api.github.com/repos/Aardvark-Industries/GitForum-content/issues')).json()

    var posts = []
    issues.forEach(issue => posts.push(new Post(issue.title, issue.body)))

    return posts;
}
