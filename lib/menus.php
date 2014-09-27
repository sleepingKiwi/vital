<?php

/**
 * REGISTERING CUSTOM MENUS WITH TRANSIENTS
 *
 * REMEMBER TO ADD ANY ADDITIONAL NAVS IN INIT.PHP
 */

function vital_main_nav() {

    //http://www.codeforest.net/wordpress-transients-api-caching-benchmarks
    $mainMenu = get_transient('vitalMainMenu');

    if (false === $mainMenu) {

        $mainMenu = wp_nav_menu(array( 
            'container' => false,                           // remove nav container
            //'container_class' => 'menu clearfix',         // class of container (should you choose to use it)
            'menu' => 'main nav',                           // nav name
            'menu_class' => 'nav top-nav clearfix',         // adding custom nav class
            'theme_location' => 'main-nav',                 // where it's located in the theme
            'before' => '',                                 // before the menu
            'after' => '',                                  // after the menu
            'link_before' => '',                            // before each link
            'link_after' => '',                             // after each link
            //'depth' => 0,                                 // limit the depth of the nav
            //'fallback_cb' => 'vital_mainnav_fallback',    // fallback function
            //'walker' => $walker,                          // customizes the output of the menu 
                                                            // set to roots style walker automatically in cleanup.php
            'echo' => 0                                     // return don't echo
        ));

        set_transient('vitalMainMenu', $mainMenu, 60*60); //1 hour transient
    }

    return $mainMenu;
}

//delete all the transients when menus are updated...
function vital_updateMenu(){
    delete_transient('vitalMainMenu');
}

add_action( 'wp_update_nav_menu', 'vital_updateMenu' );

?>