function getBoards(){
    // get all the boards

    return [
        new Board("general", [
            new Post(
                "the test post",
                "this is a test post",
                "pr0x1mas",
                this,
                "12/12/2021"
                )
        ]),

        new Board("technology", [])
    ]
}