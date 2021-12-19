---
---
import Cookies from 'https://cdn.jsdelivr.net/npm/js-cookie@3.0.1/dist/js.cookie.mjs';

async function setTokenCookie(token, username) {
    Cookies.set('token', token);
    Cookies.set('username', username)
}

async function removeTokenCookie() {
    Cookies.remove('token');
    Cookies.remove('username');
}

export {setTokenCookie, removeTokenCookie};