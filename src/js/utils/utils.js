import $ from "jquery";

export function getBackendURL(path) {
    //let result = "http://localhost:8080" + path;
    let result = window.ENV.API_URL + path;
    console.log("Accessing path " + result);
    return result;
}

export function getUser() {
    if (localStorage.getItem('user') === null) return {};
    else return JSON.parse(localStorage.getItem('user'));
}

export function setUser(user, authData) {
    user.authData = authData;
    localStorage.setItem('user', JSON.stringify(user));
}

export function clearUser() {
    localStorage.removeItem('user');
}

export function authHeader() {
    // return authorization header with basic auth credentials
    let user = getUser();

    var headers = {}

    if (user && user.authData) {
        headers.push({ 'Authorization': 'Basic ' + user.authData });
    }

    if (window.ENV.API_KEY) {
        headers.push({'user_key': window.ENV.API_KEY});
    }

    return headers;
}

export function isLoggedIn() {
    let user = getUser();

    console.log("User: " + user);

    if ($.isEmptyObject(user)) {
        console.log("User is logged out");
        return false;
    } else {
        console.log("User is logged in");
        return true;
    }
}
