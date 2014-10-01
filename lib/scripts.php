<?php

/**
 * ENQUEUEING SCRIPTS AND STYLES
 */

function vital_scripts() {

    /**
     * FORCES ALL SCRIPTS TO FOOTER
     * This might be a bit overkill but basically disables any loading of scripts in the wp_head
     * action. It means all those scripts are pushed to the footer instead.
     */
    remove_action( 'wp_head', 'wp_print_scripts' ); 
    remove_action( 'wp_head', 'wp_print_head_scripts', 9 ); 
    remove_action( 'wp_head', 'wp_enqueue_scripts', 1 ); 


    /**
     * REGISTERING MAIN STYLESHEET
     * wp_register_style( $handle, $src, $deps, $ver, $media );
     */
    wp_register_style( 'vital-styles', get_stylesheet_directory_uri() . '/assets/styles/dist/style.min.css', array(), '', 'all' );


    /**
     * IE ONLY STYLESHEET
     */
    wp_register_style( 'vital-ie-styles', get_stylesheet_directory_uri() . '/assets/styles/dist/ie.min.css', array(), '' );


    /**
     * jQuery is loaded concatenated with our other scripts in the footer (thanks to grunt)
     * this can actually lead to some rubbish situations where we conflict with other plugins trying
     * to use jquery. The ideal solution would be to lose our jQuery dependancy...
     * for the moment we've given our jquery version it's own no_conflict name: jQuery_vital
     *
     * this means if another plugin wants to load jquery it can do so...
     * obviously that's not the ideal solution because it means 2 copies of jquery which is not
     * what we want. but for now it avoids conflict.
     * current workflow is to ensure no plugins use jquery when site goes live and encourage clients
     * to be sparing when adding new plugins...
     */
    /*if (!is_admin()) {
        wp_deregister_script('jquery');
        wp_register_script('jquery', '', '', '2.1.1', true);
    }*/



    if (is_single() && comments_open() && get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }


    /**
     * MAIN SCRIPT FILE IN THE FOOTER
     * See function below which adds async & defer...
     * wp_register_script( $handle, $src, $deps, $ver, $in_footer );
     */
    wp_register_script( 'vital-scripts', get_template_directory_uri() . '/assets/js/dist/main.min.js', '', '', true );



    /**
     * ENQUEUE ALL THE THINGS
     */
    wp_enqueue_style('vital-styles');
    wp_enqueue_style('vital-ie-styles');
    wp_enqueue_script('vital-scripts');



    /**
     * LIVERELOAD ON LOCALHOST
     * Check we're on localhost and if so insert the script for livereload!
     */
    if (in_array($_SERVER['SERVER_ADDR'], array('127.0.0.1', '::1'))) {
    //wp_register_script( $handle, $src, $deps, $ver, $in_footer );
    wp_register_script('livereload', '//localhost:35729/livereload.js', null, false, true);
    wp_enqueue_script('livereload');
    }
}

add_action('wp_enqueue_scripts', 'vital_scripts', 100);





/**
 * ADDING DEFER AND ASYNC PROPERTIES TO MAIN SCRIPT
 * http://wordpress.stackexchange.com/questions/38319/how-to-add-defer-defer-tag-in-plugin-javascripts/38335#38335
 */
function vital_defer_async( $url )
{
    if ( false === strpos( $url, 'main' ) or false === strpos( $url, '.js' ) ){
        return $url;
    }
    // Must be a ', not "!
    return "$url' defer='true' async='true";
}
add_filter( 'clean_url', 'vital_defer_async', 11, 1 );





/**
 * ADDING CONDITIONAL WRAPPER AROUND IE STYLESHEET
 * source: http://code.garyjones.co.uk/ie-conditional-style-sheets-wordpress/
 * unfortunately the same isn't possible with script - see how html5shiv loads in header.php
 */
function vital_ie_conditional( $tag, $handle ) {
    if ( 'vital-ie-styles' == $handle ){
        $tag = '<!--[if lt IE 9]>' . "\n" . $tag . '<![endif]-->' . "\n";
    }
    return $tag;
}
add_filter( 'style_loader_tag', 'vital_ie_conditional', 10, 2 );




/**
 * DEREGISTER CONTACT FORM 7 STYLES
 */
add_action( 'wp_print_styles', 'vital_deregister_styles', 100 );
function vital_deregister_styles() {
    wp_deregister_style( 'contact-form-7' );
}

?>