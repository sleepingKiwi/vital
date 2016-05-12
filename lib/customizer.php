<?php

    /**
     * Customising the Customizer
     * -
     * look into using this area more effectively!
     * https://developer.wordpress.org/themes/advanced-topics/customizer-api/
     * http://wordpress.stackexchange.com/questions/58932/how-do-i-remove-a-pre-exising-customizer-setting
     */

    function vital_theme_customize_register( $wp_customize ) {

            //almost always want to do this whilst we handle through realfavicon....
        $wp_customize->remove_control("site_icon");

        //$wp_customize->remove_section("colors");

        //$wp_customize->remove_panel("widgets");

    }
    add_action( "customize_register", "vital_theme_customize_register" );

?>