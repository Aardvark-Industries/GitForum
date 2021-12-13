class Post {
    constructor(id, title, content, board, author, date, comments){
        this.id = id;
        this.title = title;
        this.content = content;
        this.board = board;
        this.author = author;
        this.date = date;
        this.comments = comments;
    }
}

class Board {
    constructor(name, description){
        this.name = name;
        this.description = description;
    }
}