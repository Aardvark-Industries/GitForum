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
    constructor(name, description){
        this.name = name;
        this.description = description;
    }
}