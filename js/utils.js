const BASE_URL = "https://smartphoniker.scalingo.io/api";
const CHECK_INTERVAL = 15000;


function getShopFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const shop = urlParams.get('shop');
    return shop;
}

function breakDefinitelyOver(date_string) {
    // 30 minutes have passed since the break ended
    const break_end = Date.parse(date_string);
    const now = new Date();
    if ((now.getTime() - break_end) >= 30 * 60000) {
        return true;
    }
    return false;
}

function redirectToCountdownPage() {
    if (window.location.pathname !== "/countdown.html") {
        window.location.href = "/countdown.html" + window.location.search;
    }
}

function redirectToMainPage() {
    if (window.location.pathname !== "/index.html") {
        window.location.href = "/index.html" + window.location.search;
    }
}