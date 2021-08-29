const BASE_URL = "https://smartphoniker.osc-fr1.scalingo.io/api";
const CHECK_INTERVAL = 15000;

function getShopFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const shop = urlParams.get('shop');
    return shop;
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