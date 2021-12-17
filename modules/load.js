import {Post, Board, getPostFromURL, getBoardFromURL} from '/modules/classes.js';
import {Octokit} from 'https://cdn.skypack.dev/@octokit/rest';

var URLParams = new URLSearchParams(window.location.search);

async function instantiateAPI(version) {
    return new Octokit({
        userAgent: `GitForum v${version}`
    })
}

async function loadPosts(board) {
    var issues = await (await fetch('https://api.github.com/repos/Aardvark-Industries/GitForum-content/issues?labels=' + board.name)).json();

    var posts = [];
    issues.forEach(issue => posts.push(new Post(issue.number, issue.title, issue.body, board.name, issue.user.login, "", issue.comments)));

    return posts;
}

async function loadBoards() {
    var labels = await (await fetch('https://api.github.com/repos/Aardvark-Industries/GitForum-content/labels')).json();

    var boards = [];
    labels.forEach(label => boards.push(new Board(label.name, label.description)));

    return boards;
}

export {URLParams, instantiateAPI, loadPosts, loadBoards};