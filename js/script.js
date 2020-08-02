// constants 
const INTERVAL = 20000 // in ms

let MOVE_DIR = "next";

function loop() {
  let total_images = $('#carousel').children("div").length;
  let current_index = $('#carousel').children("div").toArray().findIndex(x => x.className === "show");

  if (current_index === 0) {
    MOVE_DIR = "next";
  }

  if (current_index === (total_images - 1)) {
    MOVE_DIR = "prev";
  }

  moveToSelected(MOVE_DIR);
}

function moveToSelected(element) {

  let next;
  let showed = $(".show");

  if (element === "next") {
    next = showed.next();
  } else {
    next = showed.prev();
  }

  if (next.length) {
    showed.removeClass().addClass("hidden");
    next.removeClass().addClass("show");
  }
}

$(function () {
  $(document).keydown(function (e) {
    switch (e.which) {
      case 37: // left
        moveToSelected('prev');
        break;

      case 39: // right
        moveToSelected('next');
        break;

      default:
        return;
    }
    e.preventDefault();
  });

  $('#carousel div').click(function () {
    moveToSelected($(this));
  });


  window.setInterval(function () {
    loop();
  }, INTERVAL);


});