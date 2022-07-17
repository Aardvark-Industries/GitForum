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

async function getPostVotes(octokit, owner, repo, issue_number) {
    var reactions = await octokit.rest.reactions.listForIssue({
        owner: owner,
        repo: repo,
        issue_number: issue_number
    })

    var upvotes = 0;
    var downvotes = 0;

    reactions.data.forEach(reaction => {
        if (reaction.content == "+1") {
            upvotes++;
        } else if (reaction.content == "-1") {
            downvotes++;
        }
    });

    return [upvotes, downvotes];
}

async function getPost(octokit, owner, repo, issue_number) {
    var issue = await octokit.rest.issues.get({
        owner: owner,
        repo: repo,
        issue_number: issue_number
    });

    var votes = await getPostVotes(octokit, owner, repo, issue_number);

    var post = new Post(issue.data.number, issue.data.title, issue.data.body, issue.data.labels[0].name, issue.data.user.login, issue.data.created_at, issue.data.comments, votes[0], votes[1], issue.data.locked);
    return post;
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
    return await (await octokit.rest.users.getAuthenticated()).data;
}

async function getUser(octokit, username) {
    return await (await octokit.rest.users.getByUsername({username})).data;
}

async function loadPosts(octokit, board, page) {
    if(board){
        var issues = await octokit.rest.issues.listForRepo({
            owner: window.OWNER,
            repo: window.REPO,
            labels: [board.name],
            per_page: 10,
            page: page,
            sort: "updated"
        });
    } else {
        var issues = await octokit.rest.issues.listForRepo({
            owner: window.OWNER,
            repo: window.REPO,
            per_page: 10,
            page: page,
            sort: "updated"
        });
    }


    return await Promise.all(issues.data.map(issue => getPost(octokit, window.OWNER, window.REPO, issue.number)));
}

async function loadUserPosts(octokit, user) {
    var issues = await octokit.rest.issues.listForRepo({
        owner: window.OWNER,
        repo: window.REPO,
        creator: user
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

export {URLParams, instantiateAPI, getPost, getComments, getAuthenticatedUser, getUser, getBoard, loadPosts, loadUserPosts, loadBoards};