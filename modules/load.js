---
---

import {Post, Board, getPostFromURL, getBoardFromURL} from '/{{ site.repo }}/modules/classes.js';
import {Octokit} from 'https://cdn.skypack.dev/@octokit/rest';

var URLParams = new URLSearchParams(window.location.search);

async function instantiateAPI() {
    return new Octokit({
        userAgent: 'GitForum v{{ site.version }}'
    });
}

async function getPost(octokit, owner, repo, issue_number) {
    var issue = await octokit.rest.issues.get({
        owner: owner,
        repo: repo,
        issue_number: issue_number
    });

    return new Post(issue.data.number, issue.data.title, issue.data.body, issue.data.labels[0], issue.data.user.login, issue.data.created_at);
}

async function getBoard(octokit, owner, repo, name) {
    var label = await octokit.rest.issues.getLabel({
        owner: owner,
        repo: repo,
        name: name
    });

    return new Board(label.data.name, label.data.description);
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
    if (window.BOARDS != undefined) { return window.BOARDS }

    var labels = await octokit.rest.issues.listLabelsForRepo({
        owner: 'Aardvark-Industries',
        repo: 'GitForum-content'
    });

    var boards = [];
    labels.data.forEach(label => boards.push(new Board(label.name, label.description)));
     
    // replace forEach with map at some point

    return boards;
}

export {URLParams, instantiateAPI, getPost, getBoard, loadPosts, loadBoards};