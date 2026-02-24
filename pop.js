var $ = jQuery.noConflict();

// Cookie helper functions
function getCookie(name) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 86400 * 5).toUTCString();
  document.cookie =
    name +
    "=" +
    encodeURIComponent(value) +
    "; expires=" +
    expires +
    "; path=/; SameSite=Lax";
}

$(document).ready(function () {
  // Cookie prüfen - wenn bereits vorhanden, Popup nicht anzeigen
  if (getCookie("pe_visit_time")) {
    $(".pe-pop").remove();
    return;
  }

  // Borlabs Cookie: Entscheidung abwarten bevor Popup angezeigt wird
  function initPopup() {
    // Cookie setzen (5 Tage)
    const now = new Date().toISOString();
    setCookie("pe_visit_time", now, 5);

    // Function to disable scrolling and add accessibility attributes
    function disableBodyScroll() {
      $("body").css("overflow", "hidden");
      // Alle direkten Body-Kinder außer dem Popup als inert markieren + blur
      $("body > *:not(.pe-pop)").attr("inert", "").css("filter", "blur(4px)");
      // Popup selbst aktivieren
      $(".pe-pop").removeAttr("inert");
    }

    // Function to re-enable scrolling and remove accessibility attributes
    function enableBodyScroll() {
      $("body").css("overflow", "");
      // inert und blur von allen Elementen entfernen
      $("body > *").removeAttr("inert").css("filter", "");
      // Popup selbst deaktivieren
      $(".pe-pop").attr("inert", "");
    }

    // Initially set popup as inert (hidden state)
    $(".pe-pop").attr("inert", "");

    // Popup mit fadeIn einblenden (800ms) + Hintergrund sperren
    $(".pe-pop")
      .css("display", "flex")
      .hide()
      .fadeIn(800, function () {
        disableBodyScroll();
      });

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
        $(this).fadeOut(1000, enableBodyScroll);
      }
    });

    //Prevent closing when clicking inside the container
    $(".pe-pop .container").click(function (e) {
      e.stopPropagation();
    });
  } // end initPopup()

  // Borlabs Cookie aktiv? → window.BorlabsCookie ist nur gesetzt wenn das Plugin läuft
  if (typeof window.BorlabsCookie !== "undefined") {
    // Borlabs ist aktiv: Entscheidung abwarten
    if (getCookie("borlabs-cookie")) {
      // Borlabs-Entscheidung bereits vorhanden → Popup sofort starten
      initPopup();
    } else {
      // Auf Borlabs-Entscheidung warten (Accept All, Accept Essential, oder individuelle Wahl)
      document.addEventListener(
        "borlabs-cookie-consent-saved",
        function () {
          initPopup();
        },
        { once: true },
      );
    }
  } else {
    // Borlabs nicht aktiv → Popup direkt starten
    initPopup();
  }
});
