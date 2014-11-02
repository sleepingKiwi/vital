<?php

/**
 * THEME ACTIVATION
 * 
 * These functions are run only on theme activation.
 * For deactivation use: 
 * http://codex.wordpress.org/Plugin_API/Action_Reference/switch_theme
 */


// remove default site description
function vital_prepare_to_activate() {

    //remove default site description
    $default_description = 'Just another WordPress site';
    if( get_bloginfo('description') === $default_description ){
        update_option( 'blogdescription', '' );
    }


    // this prevents 4 random database queries that occur on every page with a sidebar otherwise
    // http://wordpress.stackexchange.com/questions/81785/remove-unnecessary-mysql-query
    add_option( 'widget_pages', array ( '_multiwidget' => 1 ) );
    add_option( 'widget_calendar', array ( '_multiwidget' => 1 ) );
    add_option( 'widget_tag_cloud', array ( '_multiwidget' => 1 ) );
    add_option( 'widget_nav_menu', array ( '_multiwidget' => 1 ) );

}// vital_prepare_to_activate
add_action('after_switch_theme', 'vital_prepare_to_activate');



function vital_please_dont_leave_me() {

}// vital_please_dont_leave_me
add_action('switch_theme', 'vital_please_dont_leave_me');


?>