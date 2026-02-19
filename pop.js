var $ = jQuery.noConflict();

$(document).ready(function () {
  $(".pe-pop").show();

  //Close Popup auto after 10 seconds
  // setTimeout(function () {
  //   $(".pe-pop").fadeOut(1500);
  // }, 10000);

  //Close Popup on close button click
  $(".pe-pop .close").click(function () {
    $(this).closest(".pe-pop").fadeOut(1500);
  });
});
