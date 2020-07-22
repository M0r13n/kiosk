// constants 
const INTERVAL = 20000 // in ms

let MOVE_DIR = "next";

function loop() {
  let total_images = $('#carousel').children("div").length;
  let current_index = $('#carousel').children("div").toArray().findIndex(x => x.className === "selected");

  if (current_index === 0) {
    MOVE_DIR = "next";
  }

  if (current_index === (total_images - 1)) {
    MOVE_DIR = "prev";
  }

  moveToSelected(MOVE_DIR);
}

function moveToSelected(element) {

  let selected = element;
  if (element == "next") {
    selected = $(".selected").next();
  } else if (element == "prev") {
    selected = $(".selected").prev();
  }

  let next = $(selected).next();
  let prev = $(selected).prev();
  let prevSecond = $(prev).prev();
  let nextSecond = $(next).next();

  $(selected).removeClass().addClass("selected");

  $(prev).removeClass().addClass("prev");
  $(next).removeClass().addClass("next");

  $(nextSecond).removeClass().addClass("nextRightSecond");
  $(prevSecond).removeClass().addClass("prevLeftSecond");

  $(nextSecond).nextAll().removeClass().addClass('hideRight');
  $(prevSecond).prevAll().removeClass().addClass('hideLeft');

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

  $('#prev').click(function () {
    moveToSelected('prev');
  });

  $('#next').click(function () {
    moveToSelected('next');
  });

  window.setInterval(function () {
    loop();
  }, INTERVAL);


});