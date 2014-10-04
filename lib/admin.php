<?php
/**
 * ADMIN FUNCTIONALITY
 */



/**
 * ADDING CUSTOM THUMBNAIL SIZES TO THE MEDIA UPLOADER
 * Commented out by default - use it if you need it...
 */
function vital_custom_wmu_image_sizes($sizes) {
    $myimgsizes = array(
        'vital-thumb-600' =>'vital wide thumb',
        'vital-800-any-height' =>'800px wide - any height'
    );
    $newimgsizes = array_merge($sizes, $myimgsizes);
    return $newimgsizes;
}
//add_filter('image_size_names_choose', 'vital_custom_wmu_image_sizes');




/**
 * REMOVING DEFUALT DASHBOARD WIDGETS....
 */
function disable_default_dashboard_widgets() {
    
    // removing plugin dashboard boxes 
    remove_meta_box('yoast_db_widget', 'dashboard', 'normal');         // Yoast's SEO Plugin Widget
    remove_meta_box('rg_forms_dashboard', 'dashboard', 'norma;');      // Gravity Forms Widget

    //core
    //remove_meta_box('dashboard_right_now', 'dashboard', 'normal');
    //remove_meta_box('dashboard_activity', 'dashboard', 'normal');
    //remove_meta_box('dashboard_quick_press', 'dashboard', 'normal');
    remove_meta_box('dashboard_recent_comments', 'dashboard', 'normal');
    remove_meta_box('dashboard_incoming_links', 'dashboard', 'normal');
    remove_meta_box('dashboard_plugins', 'dashboard', 'normal');
    remove_meta_box('dashboard_primary', 'dashboard', 'normal');
    remove_meta_box('dashboard_secondary', 'dashboard', 'normal');
}
add_action('admin_menu', 'disable_default_dashboard_widgets');






/**
 * ADDING CUSTOM DASHBOARD WIDGETS
 * http://digwp.com/2010/10/customize-wordpress-dashboard/
 */
function vital_info_widget() {
    echo '
        <p>Full documentation for your new theme can be found in the <a href="'.get_admin_url().'admin.php?page=vital-documentation">Documentation</a> section.</p>

        <p>-</p>

        <p>If you get stuck or you ever need a hand with anything just send an email to <a href="mailto:joe@tedworthandoscar.co.uk">joe</a> or <a href="mailto:jake@tedworthandoscar.co.uk">jake</a> and we\'ll help sort it out!</p>
        <p>Thanks. <br/> Tedworth <span class="amp">&amp;</span> Oscar</p>
    ';
}

// calling all custom dashboard widgets
function vital_custom_dashboard_widgets() {
    wp_add_dashboard_widget('vital_info_widget', '<img src="' . get_stylesheet_directory_uri() . '/assets/img/ted-head.png" alt="tedworth & Oscar"/>', 'vital_info_widget');
    // add any others here too (obv)
}

add_action('wp_dashboard_setup', 'vital_custom_dashboard_widgets');






/**
 * ADDING CUSTOM HELP MENU TEXT
 */
/*
function add_custom_help_page() {
    //the contextual help filter
    add_filter('contextual_help','custom_page_help');
}
function custom_page_help($help) {
    //keep the existing help copy
    echo $help;
    //add some new copy
    echo "<h5>Custom Features</h5>";
    echo "<p>Content placed above the more divider will appear in column 1. Content placed below the divider will appear in column 2.</p>";
}
add_action('load-page-new.php','add_custom_help_page');
add_action('load-page.php','add_custom_help_page');
*/





/**
 * CUSTOMISING THE LOGIN PAGE
 * [1] - changing the logo link from wordpress.org to your site
 * [2] - changing the alt text on the logo to show your site name 
 * [3] - calling it only on the login page
 */
function vital_login_css() {
    echo '<link rel="stylesheet" href="' . get_stylesheet_directory_uri() . '/assets/styles/dist/login.min.css">';
}
// [1]
function vital_login_url() { 
    return home_url(); 
}
// [2]
function vital_login_title() { 
    return get_option('blogname'); 
}
// [3]
add_action('login_head', 'vital_login_css');
add_filter('login_headerurl', 'vital_login_url');
add_filter('login_headertitle', 'vital_login_title');





/**
 * CUSTOMISE ADMIN FOOTER
 */
function vital_custom_admin_footer() {
    echo '<span id="footer-thankyou">Developed by <a href="http://tedworthandoscar.co.uk" target="_blank">Tedworth <span class="amp">&amp;</span> Oscar</a></span>. | Powered by <a href="http://www.wordpress.org">WordPress</a>';
}
add_filter('admin_footer_text', 'vital_custom_admin_footer');




/**
 * CUSTOMISE ADMIN TOOLBAR DROPDOWN MENU
 * Removing standard WordPress links and adding a T&O one...
 * http://www.sitepoint.com/change-wordpress-33-toolbar/
 */
function vital_dashboard_tweaks_render($wp_toolbar) {
    $wp_toolbar->add_node( array(
        'id'    => 'tedworthandoscar',
        'title' => 'Tedworth &amp; Oscar',
        'href'  => 'http://tedworthandoscar.co.uk',
        'parent'=> 'wp-logo-external',
        'meta'  => array(
            'target' => '_blank',
            'title'  => 'Visit our website',
        ),
    ) );

    $wp_toolbar->add_node( array(
        'id'    => 'wp-logo',
        'meta'  => array(
            'title'  => '',
        ),
    ) );
    //$wp_toolbar->remove_menu('about');
    //$wp_toolbar->remove_menu('wporg');
    $wp_toolbar->remove_menu('documentation');
    $wp_toolbar->remove_menu('support-forums');
    $wp_toolbar->remove_menu('feedback');
    $wp_toolbar->remove_menu('view-site');
        // optional, delete comments as many websites don't even have those enabled.
    //$wp_toolbar->remove_menu('comments'); 



    /* CUSTOMISE HOWDY */
    //we re-add (using add_menu function) the menu in the top right but with our new text. This maintains all the sub menu items etc.
    //we have to pull a load of user info to reliably customise this though.
    $user_id = get_current_user_id();
    $current_user = wp_get_current_user();
    $profile_url = get_edit_profile_url( $user_id );

    if ( 0 != $user_id ) {

        /* Add the "My Account" menu */
        $avatar = get_avatar( $user_id, 28 );
        $class = empty( $avatar ) ? '' : 'with-avatar';

        date_default_timezone_set('Europe/London');
        $time = date('H');

        if ($time < "12") {
            $howdy = sprintf( __('Good Morning, %1$s'), $current_user->display_name );
        } else
        if ($time >= "12" && $time < "18") {
            $howdy = sprintf( __('Good Afternoon, %1$s'), $current_user->display_name );
        } else
        if ($time >= "18") {
            $howdy = sprintf( __('Good Evening, %1$s'), $current_user->display_name );
        } else {
            //should never see this!
            $howdy = sprintf( __('Hello, %1$s'), $current_user->display_name );
        }

        $wp_toolbar->add_menu( array(
            'id' => 'my-account',
            'parent' => 'top-secondary',
            'title' => $howdy . $avatar,
            'href' => $profile_url,
            'meta' => array(
                'class' => $class,
            ),
        ) );

    }
}
add_action( 'admin_bar_menu', 'vital_dashboard_tweaks_render', 999 );





/**
 * ADD WARNING TO SETTINGS PAGES
 */
function vital_admin_notice(){
    global $current_screen;
    if ( $current_screen->parent_base == 'options-general' || $current_screen->parent_base == 'w3tc_general' ){
        echo '<div class="tando-warning-wrap"><span class="tando-custom-warning">Warning - changing settings on these pages may cause problems with your website\'s design!</span></div>';
    }
}
add_action( 'admin_notices', 'vital_admin_notice' );




/**
 * REMOVE 'LINKS' AS A MAIN MENU ITEM
 */
function vital_admin_menu() {
     remove_menu_page('link-manager.php');
}
add_action( 'admin_menu', 'vital_admin_menu' );






/**
 * CUSTOM TEDWORTH COLOUR SCHEME
 * based on Admin Color Schemes plugin 1.0 by Kelly Dwan, Mel Choyce, Dave Whitley, Kate Whitley
 * http://wordpress.org/plugins/admin-color-schemes/
 */
function vital_add_colors() {

    //http://codex.wordpress.org/Function_Reference/wp_admin_css_color
    wp_admin_css_color( 
        'tedworth', 'Tedworth', 
        get_stylesheet_directory_uri() . '/assets/styles/dist/tedworth-colours.min.css',
        array( '#212121', '#333333', '#F7F1E3', '#d4604e' ),
        array( 'base' => '#f1f2f3', 'focus' => '#fff', 'current' => '#fff' )
    );

}
add_action( 'admin_init' , 'vital_add_colors' );

/**
 * Setting tedworth as the default:
 * http://wordpress.stackexchange.com/questions/123660/how-do-i-change-the-default-admin-color-scheme-in-mp6
 * tricky one this function...
 * https://gist.github.com/tillkruess/6401453
 */
function vital_tedworth_default( $color_scheme ) {
    global $_wp_admin_css_colors;

    if ( !isset( $_wp_admin_css_colors[ $color_scheme ] ) || 'classic' == $color_scheme || 'fresh' == $color_scheme ) {
        $color_scheme = 'tedworth';
    }

    return $color_scheme;
}
add_filter( 'get_user_option_admin_color', 'vital_tedworth_default', 5 );





/**
 * CUSTOM CSS IN THE ADMIN AREA
 */
function vital_load_custom_wp_admin_style(){

    wp_register_style( 'custom_admin_css', get_stylesheet_directory_uri() . '/assets/styles/dist/admin.min.css', false, '1.0.0' );
    wp_enqueue_style( 'custom_admin_css' );

    /**
     * Make sure core's default `colors.css` gets enqueued, since we can't
     * @import it from a plugin stylesheet. Also force-load the default colors 
     * on the profile screens, so the JS preview isn't broken-looking.
     */ 
    global $wp_styles, $_wp_admin_css_colors;

    $color_scheme = get_user_option( 'admin_color' );

    $scheme_screens = apply_filters( 'acs_picker_allowed_pages', array( 'profile', 'profile-network' ) );
    if ( $color_scheme == 'tedworth' || in_array( get_current_screen()->base, $scheme_screens ) ){
        $wp_styles->registered[ 'colors' ]->deps[] = 'colors-fresh';
    }

}
add_action('admin_enqueue_scripts', 'vital_load_custom_wp_admin_style', 999);





/**
 * CUSTOM ADMIN ICONS
 * https://github.com/tillkruess/MP6-Icon-Examples
 */
add_action( 'admin_head', 'vital_set_custom_dashicon' );

function vital_set_custom_dashicon() {
    /**
     * use one of the built in dashicons (that WP uses for it's own icons) from:
     * http://melchoyce.github.io/dashicons/
     *
     * TO USE CUSTOM ICON FONT: 
     * will just need to add it in the admin css styles and then change font-family 
     * before setting content below
     */

    /* for top level menu pages replace `{menu-slug}` with the slug name passed to `add_menu_page()`
    #toplevel_page_{menu-slug} .wp-menu-image:before {
            content: '\f174';
    }*/

    /* for custom post types replace `{post_type}` with the slug name passed to `register_post_type()`
    .mp6 #menu-posts-{post_type} .wp-menu-image:before {
            content: '\f174';
    }*/
?>
    <style type="text/css">

        #toplevel_page_vital-documentation .wp-menu-image:before {
            content: '\f118';
        }

    </style>
<?php
}