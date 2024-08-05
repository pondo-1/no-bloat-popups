var $ = jQuery.noConflict();

$(document).ready(function () {
  $(".pe-pop").show();
  setTimeout(function () {
    $(".pe-pop").fadeOut(1500);
  }, 10000);
});
