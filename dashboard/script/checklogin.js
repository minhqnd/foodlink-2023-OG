var sessionId = document.cookie.match(/sessionId=([^;]+)/);
if (!sessionId || (new Date().getTime() - new Date(sessionId[1]).getTime()) > 86400000) {
    window.location.href = "./login.html";
} else {
    window.location.href = "./menu.html";
}