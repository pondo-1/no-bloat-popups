<?php

/**
 * Plugin Name: No bloat Popups 
 * Plugin URI: https://page-effect.de/
 * Description: Test.
 * Version: 1.1
 * Author: Page Effect
 * Author URI: https://page-effect.de/
 **/

//////--------------Set Cookie: First Page in Session---------------------// 
add_action(
  'init',
  function () {
    $date = new DateTime("now", new DateTimeZone('Europe/Berlin'));
    setcookie('visit_time', $date->format('Y-m-d H:i:s'), 0);
  }
);

/// Add Popup to Footer


if (!isset($_COOKIE["visit_time"])) {

  add_action('wp_footer', 'pe_popup');
}



function pe_popup()
{
  $pop = "<div class='pe-pop'> <div class='date'>Ab dem 20. Januar 2025</div> sind wir auch im <div class='place'>Gesundheitszentrum</div> <div class='place'>Karlstadt</div> für Sie da.</div>";
  echo $pop;
}




/**
 * Proper way to enqueue scripts and styles
 */

function pe_enqueue()
{
  wp_register_style('pop_style', plugin_dir_url(__FILE__) . 'pop-style.css', true, '1.0.0');
  wp_enqueue_style('pop_style');
  wp_register_script('pop', plugin_dir_url(__FILE__) . 'pop.js', array('jquery'), true, '1.0.0');
  wp_enqueue_script('pop');
}

add_action('wp_enqueue_scripts', 'pe_enqueue');
