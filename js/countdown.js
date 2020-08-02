let finishedText = document.querySelector('.finished');
let timer_running = false;
let endTime = null;
const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;

function initTimer(t) {
    if (timer_running) {
        return;
    }

    let x = setInterval(function () {
        let now = new Date().getTime(),
            distance = endTime - now;
        document.getElementById('minutes').innerText = Math.floor((distance) / (minute));
        document.getElementById('seconds').innerText = Math.floor((distance % (minute)) / second);

        if (distance < 0) {
            document.getElementById('minutes').innerText = "00";
            document.getElementById('seconds').innerText = "00";
            clearInterval(x);
        }
    }, 1000);
}

function checkForBreak() {
    const shop = getShopFromUrl();
    const url = `${BASE_URL}/shop/${shop}/break`;
    fetch(url)
        .then((response) => {
            return response.json()
        })
        .then(result => {
            const last_break = result.last_break;
            if (last_break !== null && !last_break.is_over) {
                endTime = new Date(last_break.until);
                redirectToCountdownPage();
                initTimer();
            } else if (last_break === null || breakDefinitelyOver(last_break.until)) {
                redirectToMainPage();
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function initBreakChecker() {
    window.setInterval(checkForBreak, CHECK_INTERVAL);
}

function init() {
    checkForBreak();
    initBreakChecker();
}

init();