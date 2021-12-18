---
---
import Cookies from 'https://cdn.jsdelivr.net/npm/js-cookie@3.0.1/dist/js.cookie.mjs';

async function setTokenCookie(token) {
    console.log('setting cookies');
    Cookies.set('token', token);
}

async function removeTokenCookie() {
    Cookies.remove('token');
}

export {setTokenCookie, removeTokenCookie};