class Post {
    constructor(response){
        this.id = response.number;
        this.title = response.title;
        this.content = response.body;
        this.board = response.labels[0];
        this.author = response.user.login;
        this.date = response.updated_at;
        this.comments = response.comments;
    }
}

class Board {
    constructor(name, description){
        this.name = name;
        this.description = description;
    }
}