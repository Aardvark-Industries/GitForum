---
title: Changelog
layout: page
permalink: /changelog
---

# v0.9b
*30/12/2022*
### New Features
- Dark Mode
- Update to Bootstrap 5.3

### Bugfixes
- Use new bot address for login as Heroku's free tier was discontinued.
- Fixed an issue where user profiles could not be viewed by unauthenticated users.

# v0.8.1b
*17/09/2022*
### New Features
- User badges
- About page

### Changes
- Homepage now displays latest GitForum news.

# v0.8b
*17/06/2022*
### New Features
- Posts are now loaded in pages of 10, instead of all at once. You can flip to and from pages.

### Changes
- kid named finger:

# v0.7.2b
*17/06/2022*
### Changes
- The homepage now shows all posts from different boards, and links to a new about page.
- Update to Bootstrap 5.2 and icons 1.8.

# v0.7.1a
*26/04/2022*
### New Features
- Posts now display a link to the original GitHub issue, allowing the user to edit/delete a post etc until this is implemented natively

### Changes
- Informative messages on login screen
- Link to new login system on old login page
- Upvote and downvote buttons are now actually buttons (why on earth were they spans?), back button is no longer always in active state. This is why TheGooseLord shouldn't do GUI.

# v0.7a
*24/04/2022*
### New Features
- Oauth!

# v0.6.1a
*04/04/2022*
#### New Features
- Warning if JS is not supported

#### Changes
- "Show token" button is now easier to click

#### Bugfixes
- Logging in with a bad token now shows an error and does not render the site unusable

# v0.6a
*04/04/2022*
#### New Features
- Some more error messages
- Post locking support

#### Changes
- Improve some redirect links
- The option to comment is no longer available if you are not logged in

#### Bugfixes
- Posts you have voted on now correctly display this
- Boards can no longer be created by modifying the HTML to use a board value that does not exist [BOT]


# v0.5a
#### New Features
*03/04/2022*
- Markdown support in posts!
- Markdown editor
- New content policy


# v0.4a
*03/04/2022*
#### Changes
- Replace useless text with user bio on profile page
- Username is no longer required to login
- Change loading message

#### New features
- Add message for empty boards/users with no posts
- Error messages now display if user, post, or board cannot load

#### Bugfixes
- Fix board indicator not displaying on posts viewed on a board

# v0.3.3a
*21/12/2021*
#### New Features
- Add profile pic to user page

#### Changes
- Set SameSite attribute on cookies to hopefully stop them expiring
- Remove redundant profile page (just use user page)

# v0.3.2a
*21/12/2021*
#### Changes
- Temporary login fix

# v0.3.1a
*21/12/2021*
#### New Features
- Voting support! (Posts only, comments soon)

# v0.3a
*20/12/2021*
#### New Features
- Add user pages
- Add profile picture to profile page

#### Bugfixes
- Labels are now assigned to issues by a bot as posts by users who are not administrators on the repo could not do this, and their posts would remain unlabelled.

# v0.2.5a
*20/12/2021*
#### New Features
- Add board link to profile post previews

# v0.2.4a
*20/12/2021*
#### Bugfixes
- Fix back button on posts opened from profile page

# v0.2.3a
*20/12/2021*
#### New Features
- Add current user profile page

# v0.2.2a
*20/12/2021*
#### Changes
- Put back link inside button

# v0.2.1a
*19/12/2021*
#### New Features
- Info on setting up token
- 'show token' button on login page

# v0.2a
*19/12/2021*
#### New Features
- Comment support!

# v0.1.3a
*19/12/2021*
#### Changes
- Back button on post

#### Bugfixes
- Fix board badge on post

# v0.1.2a
*19/12/2021*
#### Changes
- Consistency between loading one post and multiple

#### New Features
- Show author and date on post preview

# v0.1.1a
*19/12/2021*
#### New Features
- Redirect to board after posting
- Show user profile picture on user icon
- Sticky navbar

# v0.1a
*18/12/2021*
- Initial release