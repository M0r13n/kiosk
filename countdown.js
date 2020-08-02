TweenLite.defaultEase = Expo.easeOut;

const BASE_URL = "http://localhost:5000/api";
const CHECK_INTERVAL = 30000;

let finishedText = document.querySelector('.finished');
let timerEl = document.querySelector('.timer');
let timer_running = false;

function initTimer(t) {
    if (timer_running) {
        return;
    }
    timer_running = true;

    let self = this,
        timerEl = document.querySelector('.timer'),
        minutesGroupEl = timerEl.querySelector('.minutes-group'),
        secondsGroupEl = timerEl.querySelector('.seconds-group'),

        minutesGroup = {
            firstNum: minutesGroupEl.querySelector('.first'),
            secondNum: minutesGroupEl.querySelector('.second')
        },

        secondsGroup = {
            firstNum: secondsGroupEl.querySelector('.first'),
            secondNum: secondsGroupEl.querySelector('.second')
        };

    let time = {
        min: t.split(':')[0],
        sec: t.split(':')[1]
    };

    let timeNumbers;

    function updateTimer() {

        let timestr;
        let date = new Date();

        date.setHours(0);
        date.setMinutes(time.min);
        date.setSeconds(time.sec);

        let newDate = new Date(date.valueOf() - 1000);
        let temp = newDate.toTimeString().split(" ");
        let tempsplit = temp[0].split(':');

        time.min = tempsplit[1];
        time.sec = tempsplit[2];

        timestr = time.min + time.sec;
        timeNumbers = timestr.split('');
        updateTimerDisplay(timeNumbers);

        if (timestr === '0000')
            countdownFinished();

        if (timestr != '0000')
            setTimeout(updateTimer, 1000);

    }

    function updateTimerDisplay(arr) {
        animateNum(minutesGroup.firstNum, arr[0]);
        animateNum(minutesGroup.secondNum, arr[1]);
        animateNum(secondsGroup.firstNum, arr[2]);
        animateNum(secondsGroup.secondNum, arr[3]);
    }

    function animateNum(group, arrayValue) {
        TweenMax.killTweensOf(group.querySelector('.number-grp-wrp'));
        TweenMax.to(group.querySelector('.number-grp-wrp'), 1, {
            y: -group.querySelector('.num-' + arrayValue).offsetTop
        });

    }
    setTimeout(updateTimer, 1000);
}

function countdownFinished() {
    setTimeout(function () {
        TweenMax.set(finishedText, {
            scale: 0.8,
            display: 'block'
        });
        TweenMax.to(timerEl, 1, {
            opacity: 0.1
        });
        TweenMax.to(finishedText, 0.5, {
            scale: 1,
            opacity: 1
        });
        finishedText.classList.remove("hidden");
        timer_running = false;
    }, 1000);

}

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

function checkForBreak() {
    const shop = getShopFromUrl();
    const url = `${BASE_URL}/shop/${shop}/break`;
    fetch(url)
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error("Shop not found!")
            }
        })
        .then(result => {
            const last_break = result.last_break;
            if (last_break !== null && !last_break.is_over) {
                redirectToCountdownPage();
                initTimer(last_break.remaining);
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