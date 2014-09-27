<?php
/**
 * WIDGETS AND SIDEBARS
 */

function vital_widgets_init() {

    /**
     * REGISTER WIDGETISED AREAS
     */
    register_sidebar(array(
        'name'          => __('Primary Sidebar', 'vital'),
        'id'            => 'sidebar-primary',
        'before_widget' => '<aside id="%1$s" class="widget %2$s">',
        'after_widget'  => '</aside>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));

    /**
     * Repeat the above code to register extra widgetised areas.
     * To call a sidebar in template, copy the sidebar.php file and rename it to your sidebar's ID.
     * for example: sidebar-sidebar-secondary.php
     */


    /**
     * REGISTER CUSTOM WIDGETS
     * good examples available from Justin Tadlock - http://justintadlock.com
     */
    //register_widget('Vital_Custom_Widget');
}
add_action('widgets_init', 'vital_widgets_init');

?>