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
     * IE < 8 TYPOGRAPHICAL STYLESHEET
     */
    wp_register_style( 'vital-typographical', get_stylesheet_directory_uri() . '/assets/styles/dist/typographical.min.css', array(), '' );



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
    wp_enqueue_style('vital-typographical');
    wp_enqueue_script('vital-scripts');



    /**
     * LIVERELOAD ON LOCALHOST
     * Check we're on localhost and if so insert the script for livereload!
     */
    if ( in_array($_SERVER['SERVER_ADDR'], array('127.0.0.1', '::1')) && $_SERVER['SERVER_PORT'] === '8888' ) {
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
 * ADDING CONDITIONAL WRAPPER AROUND STYLESHEETS
 * source: http://code.garyjones.co.uk/ie-conditional-style-sheets-wordpress/
 * unfortunately the same isn't possible with script - see how html5shiv loads in header.php
 */
function vital_ie_conditional( $tag, $handle ) {
    if ( 'vital-ie-styles' == $handle ){
        $tag = '<!--[if IE 8]>' . "\n" . $tag . '<![endif]-->' . "\n";
    }else if( 'vital-styles' == $handle ){
        $tag = '<!--[if gt IE 7]><!-->' . "\n" . $tag . '<!--<![endif]-->' . "\n";
    }else if( 'vital-typographical' == $handle ){
        $tag = '<!--[if lt IE 8]>' . "\n" . $tag . '<![endif]-->' . "\n";
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