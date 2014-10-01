<?php
/**
 * INITIAL SETUP
 */

function vital_setup() {

    /**
    * TRANSLATION
    *
    * http://www.cssigniter.com/ignite/wordpress-poedit-translation-secrets/
    * http://betterwp.net/wordpress-tips/create-pot-file-using-poedit/
    * https://make.wordpress.org/docs/theme-developer-handbook/part-two-theme-functionality/internationalization/
    */
    load_theme_textdomain( 'vital', get_template_directory() . '/languages' );
  



    /**
     * REGISTER NAV MENUS
     *
     * Registering wp_nav_menu() menus 
     * (http://codex.wordpress.org/Function_Reference/register_nav_menus)
     */
    register_nav_menus(
    array(
        'main-nav' => 'The main menu',   // main nav in header
        'footer-nav' => 'Navigation in the footer', // nav in footer - remove if not required...
    )
    );



    /**
     * POST THUMBNAILS
     *
     * - thumbnails are added to the media uploader in admin.php
     *
     * [1] - theme support for post thumbnails (http://codex.wordpress.org/Post_Thumbnails)
     * [2] - setting default for thumbnail size
     * [3] - adding custom sizes
     */
    // [1]
    add_theme_support('post-thumbnails');
    // [2]
    set_post_thumbnail_size(125, 125, true);
    // [3]
    //add_image_size( 'vital-thumb-600', 600, 150, true ); //true at end is hard crop
    //add_image_size( 'vital-800-any-height', 800, 9999);




    /**
     * THEME SUPPORT - CUSTOM BACKGROUND
     *
     * http://make.wordpress.org/themes/2012/04/06/updating-custom-backgrounds-and-custom-headers-for-wordpress-3-4/
     */
    add_theme_support( 'custom-background',
        array(
            'default-image' => '',
            'default-color' => 'eee', 
            'wp-head-callback' => '_custom_background_cb',
            'admin-head-callback' => '',
            'admin-preview-callback' => '',
        )
    );



    /**
     * THEME SUPPORT - CUSTOM HEADER
     *
     * http://sabreuse.com/flexible-headers-in-wordpress-3-4-themes/  
     */
    $header_args = array(
        'flex-height' => true,
        //'height' => 200,
        'flex-width' => true,
        //'width' => 950,
        //'default-image' => get_template_directory_uri() . '/assets/img/header.jpg',
        'header-text' => false,
        //'admin-head-callback' => 'mytheme_admin_header_style',
    );
    add_theme_support( 'custom-header', $header_args );




    /**
     * THEME SUPPORT - AUTOMATIC FEED LINKS
     *
     * http://ottopress.com/2010/wordpress-3-0-theme-tip-feed-links/
     */
    add_theme_support('automatic-feed-links');




    /**
     * THEME SUPPORT - POST FORMATS
     *
     * if you want to include them remember to set up additional css etc.
     * http://codex.wordpress.org/Post_Formats
     */
    add_theme_support( 'post-formats',
        array(
            'aside',             // title less blurb
            'gallery',           // gallery of images
            'link',              // quick link to other site
            'image',             // an image
            'quote',             // a quick quote
            'status',            // a Facebook like status update
            'video',             // video
            'audio',             // audio
            'chat',               // chat transcript
        )
    );



    /**
     * THEME SUPPORT - HTML5
     *
     * Switch default core markup for search form, comment form, and comments
     * to output valid HTML5.
     */
    add_theme_support( 'html5', 
        array(
            'search-form', 
            'comment-form', 
            'comment-list', 
            'gallery', 
            'caption',
        ) 
    );




    /**
     * CUSTOM TINY MCE EDITOR STYLES
     *
     * if you have issues with getting the editor to show your changes then use this instead:
     * add_editor_style('editor-style.css?' . time());
     */
    add_editor_style( '/assets/styles/dist/editor-style.min.css' );





    /**
     * JETPACK INF SCROLL SUPPORT
     *
     * Add theme support for Infinite Scroll.
     * See: http://jetpack.me/support/infinite-scroll/
     */
    add_theme_support( 'infinite-scroll', 
        array(
            'container' => 'main',
            'footer'    => 'page',
        ) 
    );
}

add_action('after_setup_theme', 'vital_setup');





/**
 * SET THE AUTHORDATA GLOBAL WHEN VIEWING AN AUTHOR ARCHIVE.
 *
 * This provides backwards compatibility with
 * http://core.trac.wordpress.org/changeset/25574
 *
 * It removes the need to call the_post() and rewind_posts() in an author
 * template to print information about the author.
 *
 * @global WP_Query $wp_query WordPress Query object.
 * @return void
 */
function vital_setup_author() {
    global $wp_query;

    if ( $wp_query->is_author() && isset( $wp_query->post ) ) {
        $GLOBALS['authordata'] = get_userdata( $wp_query->post->post_author );
    }
}
add_action( 'wp', 'vital_setup_author' );
?>
