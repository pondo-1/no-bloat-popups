var $ = jQuery.noConflict();

$(document).ready(function () {
  // Function to disable scrolling and add accessibility attributes
  function disableBodyScroll() {
    $("body").css("overflow", "hidden");
    // Add inert attribute to main content areas for accessibility
    $("#main, main, .main-content, #content, .content").attr("inert", "");
    // Fallback: add inert to body children except popup
    $("body > *:not(.pe-pop)").attr("inert", "");
  }

  // Function to re-enable scrolling and remove accessibility attributes
  function enableBodyScroll() {
    $("body").css("overflow", "");
    // Remove inert attribute from all elements
    $("[inert]").removeAttr("inert");
  }

  // Show popup and disable background interaction
  $(".pe-pop").show();
  disableBodyScroll();

  //Close Popup auto after 10 seconds
  // setTimeout(function () {
  //   $(".pe-pop").fadeOut(1500, enableBodyScroll);
  // }, 10000);

  //Close Popup on close button click
  $(".pe-pop .close").click(function () {
    $(this).closest(".pe-pop").fadeOut(1000, enableBodyScroll);
  });

  //Close Popup when clicking outside the container
  $(".pe-pop").click(function (e) {
    if (e.target === this) {
      $(this).fadeOut(1500, enableBodyScroll);
    }
  });

  //Prevent closing when clicking inside the container
  $(".pe-pop .container").click(function (e) {
    e.stopPropagation();
  });
});
