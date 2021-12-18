import {Post, Board, getPostFromURL, getBoardFromURL} from '/GitForum/modules/classes.js';
import {Octokit} from 'https://cdn.skypack.dev/@octokit/rest';

var URLParams = new URLSearchParams(window.location.search);

async function instantiateAPI() {
    return new Octokit({
        userAgent: 'GitForum v{{ site.version }}'
    });
}

async function loadPosts(octokit, board) {
    //var issues = await (await fetch('https://api.github.com/repos/Aardvark-Industries/GitForum-content/issues?labels=' + board.name)).json();
    var issues = await octokit.rest.issues.listForRepo({
        owner: 'Aardvark-Industries',
        repo: 'GitForum-content',
        labels: [board.name]
    })

    var posts = [];
    issues.data.forEach(issue => posts.push(new Post(issue.number, issue.title, issue.body, board.name, issue.user.login, "", issue.comments)));

    return posts;
}

async function loadBoards(octokit) {
    var labels = await octokit.rest.issues.listLabelsForRepo({
        owner: 'Aardvark-Industries',
        repo: 'GitForum-content'
    });

    var boards = [];
    labels.data.forEach(label => boards.push(new Board(label.name, label.description)));
     
    // replace forEach with map at some point

    return boards;
}

export {URLParams, instantiateAPI, loadPosts, loadBoards};