---
title: How to Create a Personal Access Token (PAT) for GitForum
layout: page
permalink: /token
---

## What is a PAT?
If you didn't already know, GitForum does not have its own servers. Instead, it runs on GitHub pages, and stores posts as GitHub issues. Since we want users to be able to write posts from within the website, there has to be a way for us to send your post as an issue to Github's servers. This is where a token comes in.

Simply put, a PAT is a code that we attach to the post when we send it to GitHub. GitHub then looks at the PAT, and are able to then act on behalf of the account that owns the PAT.

## Is it safe?
**Your token is never sent to us, or anyone other than GitHub.** GitForum operates entirely client side with the exception of requests made to GitHub. We cannot see your token. **You should make sure to never share your token with anyone else.** If you are worried someone has gained access to your token, you can [delete it in the developer settings](https://github.com/settings/tokens). **GitForum will never ask you for your token anywhere other than on the login page.**

## How do I make one?

1. If you don't already have one, [create a GitHub account](https://github.com/signup)

2. Go to your [account settings](https://github.com/settings/tokens)
- Go to Developer Settings > Personal Access Tokens
- ![screenshot](assets/tokenSetup/1.png)

3. Select ['Generate new token'](https://github.com/settings/tokens/new)

4. Set the expiration date
- I have set mine never to expire. However, you may set any expiration date. Once this date has passed, the token will expire and no longer work.

5. Select the scope
- The only box you should tick is `public_repo`. Don't touch any of the other boxes. Don't even look at the other boxes<sup>[1](#fn1)</sup>.

6. Name your token (optional)
- You can choose a note for your token so you recognise it in the list, for example 'GitForum Token'
- ![screenshot](assets/tokenSetup/2.png)

7. Generate it
- Click the 'Generate token' button
- ![screenshot](assets/tokenSetup/3.png)

8. Write it down somewhere
- Once generated, you can only view your token once. Make sure to save it into a text file or something if you want to log in again. 
- Your token should look something like this: <br> `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`<br>
<small>Do not attempt to use this token. I generated it for this example but it has since been deleted.</small>

## How do I use it?
Now, when you're logging in, just type your token, and log in!

![screenshot](assets/tokenSetup/4.png)

<small id="fn1">[1] just--well, obviously you've got to look at everything else to find `public_repo`, but as soon as you've looked at it and it doesn't say `public_repo`, look at something else, look at the next thing. Alright? But don't touch anything else or look at any--well, look at other things but don't, you understand.</small>