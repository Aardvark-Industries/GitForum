---
title: Cookies, and How We Use Them
layout: page
---

This site uses cookies to store some information. Big surprise, most sites do these days. But don't worry, you don't need to worry about them, or opt in, or opt out. In fact, here's everything we store with cookies.

- Your user token, so we can keep you logged in when you visit a different page.
- Your username, so we can load your profile picture.

**That's it.** We don't collect your personal info. We don't target ads at you (because there are none on this website).

GitForum is written *entirely* client-side (with one exception), so no data is sent to us. We have nowhere to store any data we might collect. This website is essentially just a front end slapped onto GitHub's API. So any data from this site goes to nobody but GitHub.

So what's the exception? Well, we ran into an issue where whilst users could create posts, they couldn't add them to specific boards because only people with write access to the repo can assign issue labels. Our solution was to write a bot that would detect new issues and automatically assign the label based on some metadata in the issue title. This bot *never directly interacts with the site*, but if you want to check out the code yourself to make sure we aren't up to no good, you can see the [code for the site](https://github.com/Aardvark-Industries/GitForum) and the [bot](https://github.com/Aardvark-Industries/GitForum-bot) on GitHub.

*You're welcome.*

\- Pr0x1mas