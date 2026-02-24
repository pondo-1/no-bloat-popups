<?php

/**
 * Plugin Name: No bloat Popups 
 * Plugin URI: https://page-effect.de/
 * Description: Test.
 * Version: 1.96
 * Author: Page Effect
 * Author URI: https://page-effect.de/
 **/

// Cookie-Logik läuft im Browser per JS - unabhängig vom Server-Cache
add_action('wp_footer', 'pe_popup');
add_action('wp_enqueue_scripts', 'pe_enqueue');




// Störer
// function pe_popup()
// {
//   $pop = "<div class='pe-pop'> <div class='date'>Ab dem 20. Januar 2025</div> sind wir auch im <div class='place'>Gesundheitszentrum</div> <div class='place'>Karlstadt</div> für Sie da.</div>";
//   echo $pop;
// }


// Gewinnspiel
function pe_popup() {


  $pop = "<div class='pe-pop'> 
<div class='container'>
<button class='close' aria-label='Fenster schließen'>X</button>
<div class='headline-2'>
<div class='linebreak'>
<span class='highlight'>SCHON GEHÖRT</span>?</div>
<div class='linebreak'>JETZT HÖRTEST MACHEN</div>
<div class='linebreak'>UND <span class='highlight'>E-BIKE GEWINNEN!</span></div>
</div>

<p class='text'>Zum <span class='highlight'>Tag der Hörgesundheit in Lohr</span>
am Samstag, den <span class='highlight'>11.04.26</span> (10-15 Uhr) in der
Alten Turnhalle Lohr a.Main verlost Hörakustik Döll
unter allen Teilnehmer:innen ein <span class='highlight'>E-Bike.</span>
</p>

<div class='how text'>
<div class='text yellow'>
<span class='date'>11.04.26</span><div class='linebreak'>Fachvorträge,</div><div class='linebreak'>Produktvorführungen</div>
<div class='linebreak'>Live-Hörtests.</div>
</div>

<!---
<h3>So funktioniert 's:</h3>
<ol>
<li>Machen Sie im Vorfeld des Tags der Hörgesundheit einen kostenlosen Hörtest in einer unserer Filialen oder direkt
am 11.04. einen Live-Hörtest bei uns am Messestand.</li>
<li>Füllen Sie dabei eine Teilnahmekarte zum Gewinnspiel aus.</li>
<li>Besuchen Sie uns am Tag der Hörgesundheit (11.04.) in der Alten Turnhalle Lohr a.Main und werfen Sie Ihre Karte
bis 14 Uhr in die Gewinnspielbox vor Ort.</li>
</ol>
</div>
-->

</div>
<a class='button btn' href='/gewinnspiel'>Mehr erfahren</a>

</div>   
</div>";
 

echo $pop;
}




/**
 * Proper way to enqueue scripts and styles
 */

function pe_enqueue()
{
  wp_register_style('pop_style', plugin_dir_url(__FILE__) . 'pop-style.css', true, '1.0.9');
  wp_enqueue_style('pop_style');
  wp_register_script('pop', plugin_dir_url(__FILE__) . 'pop.js', array('jquery'), true, '1.0.9');
  wp_enqueue_script('pop');
}


