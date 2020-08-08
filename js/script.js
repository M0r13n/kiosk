// constants 
const INTERVAL = 20000 // in ms
const SHOP_NAME = getShopFromUrl();
let MOVE_DIR = "next";

/**
 * SDisplay the next image
 */
function show_next() {
  let total_images = $('#carousel').children("div").length;
  let current_index = $('#carousel').children("div").toArray().findIndex(x => x.className === "show");

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
  if (element_shop && element_shop !== SHOP_NAME) {
    return true;
  }
  return false;
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
    // hide current and show next
    showed.removeClass().addClass("hidden");
    next.removeClass().addClass("show");
  }
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


  window.setInterval(function () {
    show_next();
  }, INTERVAL);


});