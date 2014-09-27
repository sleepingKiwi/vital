<?php

/**
 * THEME ACTIVATION
 * 
 * These functions are run only on theme activation.
 * For deactivation use: 
 * http://codex.wordpress.org/Plugin_API/Action_Reference/switch_theme
 */


// remove default site description
function vital_prepare_to_activate () {
    $default_description = 'Just another WordPress site';
    if( get_bloginfo('description') === $default_description ){
        update_option( 'blogdescription', '' );
    }
}

add_action('after_switch_theme', 'vital_prepare_to_activate');

?>