---
---

import {Post, Board, getPostFromURL, getBoardFromURL} from '/{{ site.repo }}/modules/classes.js';
import {Octokit} from 'https://cdn.skypack.dev/@octokit/rest';
import Cookies from 'https://cdn.jsdelivr.net/npm/js-cookie@3.0.1/dist/js.cookie.mjs';

var URLParams = new URLSearchParams(window.location.search);

async function instantiateAPI() {
    if (Cookies.get('token') != undefined) {
        return new Octokit({
            userAgent: 'GitForum v{{ site.version }}',
            auth: Cookies.get('token')
        });
    }
    
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

    return new Post(issue.data.number, issue.data.title, issue.data.body, issue.data.labels[0].name, issue.data.user.login, issue.data.created_at, issue.data.comments);
}

async function getBoard(octokit, owner, repo, name) {
    var label = await octokit.rest.issues.getLabel({
        owner: owner,
        repo: repo,
        name: name
    });

    return new Board(label.data.name, label.data.description);
}

async function getComments(octokit, owner, repo, issue_number) {
    var comments = await octokit.rest.issues.listComments({
        owner: owner,
        repo, repo,
        issue_number, issue_number,
    })

    return comments.data;
}

async function loadPosts(octokit, board) {
    //var issues = await (await fetch('https://api.github.com/repos/Aardvark-Industries/GitForum-content/issues?labels=' + board.name)).json();
    var issues = await octokit.rest.issues.listForRepo({
        owner: 'Aardvark-Industries',
        repo: 'GitForum-content',
        labels: [board.name]
    });

    var posts = [];

    for (const issue of issues.data){
        var post = await getPost(octokit, 'Aardvark-Industries', 'GitForum-content', issue.number);
        posts.push(post);
    };


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

export {URLParams, instantiateAPI, getPost, getComments, getBoard, loadPosts, loadBoards};