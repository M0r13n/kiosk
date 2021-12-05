// constants 
const INTERVAL = 20000 // in ms
const SHOP_NAME = getShopFromUrl();
let ROTATE_TIMER = null;
let LOCKED = false;
let MOVE_DIR = "next";

/**
 * Display the next image
 */
function show_next() {
    if (LOCKED) {
        return;
    }

    const carousel = $('#carousel');
    let total_images = carousel.children("div").length;
    let current_index = carousel.children("div").toArray().findIndex(x => x.className === "show");

    if (current_index === 0) {
        MOVE_DIR = "next";
    } else if (current_index === (total_images - 1)) {
        MOVE_DIR = "prev";
    }

    move_to_selected(MOVE_DIR);
}

/**
 * Return true if the element should be skipped for this specific kiosk.
 */
function skip_element(next) {
    if (!SHOP_NAME) {
        return;
    }
    const element_shop = next.data('shop');
    return !!(element_shop && element_shop !== SHOP_NAME);
}

/**
 * Hide current shown element and show the next one.
 */
function move_to_selected(move_dir) {

    let next;
    let showed = $(".show");

    if (move_dir === "next") {
        next = showed.next();
    } else {
        next = showed.prev();
    }

    if (skip_element(next)) {
        // remove from DOM and skip
        next.remove();
        show_next();
    } else if (next.length) {
        displayNext(showed, next);
    }
}

/**
 * Display the next element on HTML DOM.
 */
function displayNext(showed, next) {
    // hide current and show next
    showed.removeClass().addClass("hidden");
    next.removeClass().addClass("show");

    // Loop over child elements to check for videos
    next.children().each((idx, item) => {
        const elem = $(item);
        const tag = elem.prop("tagName");

        if (tag === "VIDEO") {
            playVideo(elem);
        }
    })
}

/**
 * Plays a selected video until finished
 */
function playVideo(elem) {
    const video = elem.get(0);
    // Prevent the carousel from rotating before the video is fully played
    LOCKED = true;
    // Reset video to start
    video.currentTime = 0;
    // Start autoplay
    video.play();
    // Show next element after the video has fully played
    $(elem).on("ended", function () {
        LOCKED = false;
        // clear timer
        clearInterval(ROTATE_TIMER);
        ROTATE_TIMER = window.setInterval(function () {
            show_next();
        }, INTERVAL);
        show_next();
    });
}

/**
 * Fetches a list of available devices from the Smartphoniker web tool and displays them.
 */
function displayAvailableDevices() {
    fetch(`${BASE_URL}/devices/available`)
        .then(response => response.json())
        .then(result => {
            updateDevices(result);
        }).catch(err => {
        console.error(err)
    })
}

/**
 * Updates the list of currently displayed devices
 */
function updateDevices(result) {
    // Remove old devices
    remove_devices();

    const ticker = document.getElementById("news-ticker");
    result.forEach(device => {
        // add the device itself
        let div = createDeviceDiv(device);
        ticker.appendChild(div);

        // add a nice separator
        div = createSeparatorDiv();
        ticker.appendChild(div);
    });

}

/**
 * Removes all devices from the live ticker. This removes any element except the first one.
 * The first one is expected to be the text 'Verfügbare Angebote'.
 */
function remove_devices() {
    const ticker = document.getElementById("news-ticker");
    while (ticker.children.length > 1) {
        ticker.removeChild(ticker.lastChild);
    }
}

/**
 * Creates a formatted div element for each device that can appended to the ticker div.
 */
function createDeviceDiv(device) {
    const div = document.createElement('div');
    div.classList.add("ticker__item");
    div.innerText = `${device.name} - ${device.color} - ${device.storage_capacity} GB - ${device.price}€`;
    return div;
}

/**
 * Creates a formatted div element that holds the flame emoji.
 */
function createSeparatorDiv() {
    const div = document.createElement('div');
    div.classList.add("ticker__item");
    div.innerText = '🔧';//🔥
    return div;
}

// init
$(function () {
    $(document).keydown(function (e) {
        switch (e.which) {
            case 37: // left arrow
                move_to_selected('prev');
                break;

            case 39: // right arrow
                move_to_selected('next');
                break;

            default:
                return;
        }
        e.preventDefault();
    });

    $('#carousel div').click(function () {
        move_to_selected($(this));
    });


    ROTATE_TIMER = window.setInterval(function () {
        show_next();
    }, INTERVAL);

    displayAvailableDevices();
    window.setInterval(function () {
        displayAvailableDevices();
    }, 30000);

});