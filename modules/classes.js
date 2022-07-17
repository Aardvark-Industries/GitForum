---
---

var consoleFlash =             `

⠀⠀⠀⠀⠀⠀⠀⠀⣀⣴⣶⣿⣿⣿⣿⣿⣿⣿⣶⣦⣀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣤⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣄⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠀⠀⠀⢠
⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣟⣛⣻⣿⣿⣟⣿⣿⣿⣷⠀⠀⠀
⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣫⣽⣾⣻⣾⣿⣿⣿⣿⡿⣿⣿⠀⠀⠀
⠀⠀⠀⢰⣿⣿⣻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠻⡿⠿⠟⠛⣟⣿⣽⠀⠀⠀
⠀⠀⠀⠸⣿⣿⣿⣷⣿⣿⣿⣿⡿⠍⠈⠀⠁⣴⡆⠀⠀⠠⢭⣮⣿⡶⠀⠀
⠀⡴⠲⣦⢽⣿⣿⣿⣿⣿⣟⣩⣨⣀⡄⣐⣾⣿⣿⣇⠠⣷⣶⣿⣿⡠⠁⠀
⠀⠃⢀⡄⠀⢻⣿⣿⣿⣿⣽⢿⣿⣯⣾⣿⣿⣿⣿⣿⢿⣿⣿⡟⣿⠀⠀⠀
⠀⠀⠣⠧⠀⢿⣿⣿⣿⣿⣿⣿⣿⣿⠟⢸⣿⠿⠿⠿⣧⠙⣿⣿⡿⠀⠀⠀
⠀⠀⠀⠁⠼⣒⡿⣿⣿⣿⣿⣿⣿⣿⣠⣬⠀⠀⠀⠀⣾⣷⡈⣿⡇⠀⠀⠀
⠀⠀⠀⠀⠀⠉⢳⣿⣿⣿⣿⣿⣿⣿⢟⠗⠼⠖⠒⠔⠉⠉⠻⣿⠇⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠈⣻⡿⣿⣿⣿⣿⡿⡀⣤⡄⠸⣰⣾⡒⣷⣴⣿⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠂⢸⡗⡄⠘⠭⣭⣷⣿⣮⣠⣌⣫⣿⣷⣿⣿⠃⠀⠈⠀⠀
⠀⠀⠀⠀⠀⠈⠀⢸⣿⣾⣷⣦⡿⣿⣿⣿⡿⢻⠞⣹⣿⣿⠏⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢘⠀⠘⢻⡿⢿⣋⣤⣤⠌⠉⠛⠛⠀⠈⠉⠁⠀⠀⠀⠀⠀⡀
            `

class Post {
    constructor(id, title, content, board, author, date, comments, upvotes, downvotes, locked){
        this.id = id;
        this.title = title;
        this.content = content;
        this.board = board;
        this.author = author;
        this.date = date;
        this.comments = comments;
        this.upvotes = upvotes;
        this.downvotes = downvotes;
        this.locked = locked;
    }
}

class Board {
    constructor(name, description, posts){
        this.name = name;
        this.description = description;
    }
}

async function getPostFromURL(url){ // ideally I would put this in the constructor but it doesn't fucking work
    var issue = await (await fetch(url)).json();

    var post = new Post(issue.number, issue.title, issue.body, issue.labels[0], issue.user.login, issue.created_at);

    return post;
}

async function getBoardFromURL(url){
    var label = await (await fetch(url)).json(); // get the current board

    var board = new Board(label.name, label.description);

    return board;
}

export {consoleFlash, Post, Board, getPostFromURL, getBoardFromURL};