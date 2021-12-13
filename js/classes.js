class Post {
    constructor(title, content, author, board, date){
        this.title = title;
        this.content = content;
        this.author = author;
        this.board = board;
        this.date = date
    }
}

class Board {
    constructor(name){
        this.name = name;
        this.posts = [];
    }
}