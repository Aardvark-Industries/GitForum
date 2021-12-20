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

async function getAuthenticatedUser(octokit) {
    return await (await octokit.rest.users.getAuthenticated()).data.login;
}

async function loadPosts(octokit, board) {
    var issues = await octokit.rest.issues.listForRepo({
        owner: window.OWNER,
        repo: window.REPO,
        labels: [board.name]
    });

    return await Promise.all(issues.data.map(issue => getPost(octokit, window.OWNER, window.REPO, issue.number)));
}

async function loadUserPosts(octokit) {
    var authenticatedUser = await getAuthenticatedUser(octokit);

    var issues = await octokit.rest.issues.listForRepo({
        owner: window.OWNER,
        repo: window.REPO,
        creator: authenticatedUser
    });

    return await Promise.all(issues.data.map(issue => getPost(octokit, window.OWNER, window.REPO, issue.number)));
}

async function loadBoards(octokit) {
    if (window.BOARDS != undefined) { return window.BOARDS }

    var labels = await octokit.rest.issues.listLabelsForRepo({
        owner: window.OWNER,
        repo: window.REPO
    });

    return labels.data.map(label => new Board(label.name, label.description));
}

export {URLParams, instantiateAPI, getPost, getComments, getAuthenticatedUser, getBoard, loadPosts, loadUserPosts, loadBoards};