class Post {
    constructor(response){
        this.id = response[0].number;
        this.title = response[0].title;
        this.content = response[0].body;
        this.board = response[0].labels[0];
        this.author = response[0].user.login;
        this.date = response[0].updated_at;
        this.comments = response[0].comments;
    }
}

class Board {
    constructor(name, description){
        this.name = name;
        this.description = description;
    }
}