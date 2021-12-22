---
---
import Cookies from 'https://cdn.jsdelivr.net/npm/js-cookie@3.0.1/dist/js.cookie.mjs';

async function checkAuth() {
    if (Cookies.get('token') == undefined) {
        return false;
    } else {
        return true;
    }
}

async function setTokenCookie(token, username) {
    Cookies.set('token', token, {SameSite: lax});
    Cookies.set('username', username, {SameSite: lax});
}

async function removeTokenCookie() {
    Cookies.remove('token');
    Cookies.remove('username');
}

export {checkAuth, setTokenCookie, removeTokenCookie};