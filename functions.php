<?php
/**
 * VITAL FUNCTIONS
 * ---------------
 * incorporates code from: 
 * Bones (htp://themble.com/bones/), 
 * _S (http://underscores.me/),
 * Roots (http://www.rootstheme.com/)
 * And all over.
 *
 * explanation for require_once locate_template:
 * https://github.com/retlehs/roots/pull/179
 */


/**
 * Twenty Thirteen method to stop theme from being used in WordPress < 3.6.
 */
if ( version_compare( $GLOBALS['wp_version'], '3.6-alpha', '<' ) ){
    require get_template_directory() . '/lib/back-compat.php';
}




/**
 * AUTOMATIC THEME UPDATES
 * http://w-shadow.com/blog/2011/06/02/automatic-updates-for-commercial-themes/
 */

/*
* We're now using an automated server for the theme updates: https://github.com/YahnisElsts/wp-update-server
*
* it's located at http://dist.tedworthandoscar.co.uk/wp-updates
*
* - REMEMBER - add Details URI: http://dist.tedworthandoscar.co.uk/theme/vital/vital-changelog.html to style.css
* -- this is where update/version info is collected...
*/

/**
 * BUILDING ZIP
 * - 
 * -- Needs same name as theme ie. vital.zip
 */

/*
require get_template_directory() . '/lib/theme-update-checker.php';
$example_update_checker = new ThemeUpdateChecker(
    'vital', //Theme folder name, AKA "slug". 
    'http://dist.tedworthandoscar.co.uk/wp-updates/?action=get_metadata&slug=vital' //metadata url
);
*/





/**
 * THEME ACTIVATION
 * ----------------
 * functions only run when theme is activated (useful for setting up initial options etc.)
 *
 * remove default Just Another WordPress Site description
 */
require_once locate_template('lib/theme-activation.php'); 





/**
 * UTILITY FUNCTIONS
 * -----------------
 * is_element_empty function (from roots)
 */
require_once locate_template('lib/utils.php');





/**
 * CACHING TRANSIENTS
 * ------------------
 * Fragment cache function to cache arbitrary things!
 * vital_fragment_cache($key, $ttl, $function)
 * Function to clear a transient when passed a key (to clear transients set with the method above)
 * vital_fragment_clear($key)
 * function to delete all transients created by this theme.
 * method of calling that function from the admin area (through admin-ajax.php)
 *
 * clearing nav menu transients (optional in header and footer files)
 */
require_once locate_template('lib/fragment-cache.php');
/**
 * PERFORMANCE TESTING
 * -------------------
 * Not sure if your transient is making a difference?
 * Try a cheeky one of these
 * -
 * timer_start();
 * //CODE YOU WANT TO TEST
 * timer_stop(1); echo 'Seconds';
 * -
 * Gives a poor man's indication of how long some arbitrary code takes to run.
 * Try before & after caching to measure perf improvements...
 * 
 * For a good indication of page response time use Apache Bench http://www.petefreitag.com/item/689.cfm
 * $  ab -n 100 -c 10 http://localhost:8888/wherever
 * ^^ that example loads the requested page 100 times with 10 concurrent hits per go
 */





/**
 * INITIAL THEME SETUP AND CONSTANTS
 * ---------------------------------
 * Translation
 * Register Nav Menus
 * Post thumbnails
 * Theme support
 * - background
 * - header
 * - feed links
 * - theme formats
 * Use WordPress HTML5 style search/comments (& gallery & caption) by default
 * Custom tiny mce editor styles
 * Add theme support for jetpack inf scrolling (because why not...)
 * Set the authordata global when viewing an author archive
 */
require_once locate_template('lib/init.php');              





/**
 * CONFIGURATION 
 * -------------
 * Google Analytics code
 * Excerpts length
 */
require_once locate_template('lib/config.php');            





/**
 * CLEANUP
 * -------
 * Clean up wp_head() - from Roots
 * Add and remove body_class() classes
 * Wrap embedded media as suggested by Readability
 * Clean up the_excerpt()
 * Don't return the default description in the RSS feed if it hasn't been changed
 * Add additional classes onto widgets
 * Fix for empty search queries and search returning '+' instead of ' '
 */
require_once locate_template('lib/cleanup.php');





/**
 * CUSTOM SEARCH
 * -------------
 * custom search form layout - from bones
 * search redirect (/?s=query to /search/query/) - from roots
 */
require_once locate_template('lib/custom-search.php');



/**
 * CUSTOM NAV MODIFICATIONS - CUSTOM NAV WALKER ETC.
 * -------------------------------------------------
 */
require_once locate_template('lib/nav.php');               
        
                                                                



/**
 * CUSTOM WIDGETS
 * --------------
 */
require_once locate_template('lib/widgets.php');           

          




/**
 * SCRIPTS AND STYLESHEETS
 * -----------------------
 * Register & Enqueue scripts and styles
 * Livereload script if on localhost
 * add defer and async to main script
 * conditional comments around IE stylesheet
 * deregister default contact form 7 styles
 */
require_once locate_template('lib/scripts.php');           




/**
 * CUSTOM POST TYPE EXAMPLE (FROM BONES)
 * -------------------------------------
 */
//require_once locate_template('lib/custom-post-type.php');  




/**
 * VITAL COMMENTS CALLBACK
 * -----------------------
 * Callback called by wp_list_comments 
 */       
require_once locate_template('lib/vital-comments.php');




/**
 * NAVIGATION AND COMMENT LAYOUTS USED IN TEMPLATES
 * ------------------------------------------------
 * _S style comments with Bones conditional Gravatar loading (js in main.js)
 * _S style page navigation for next/prev links 
 *  - vital_content_nav( $nav_id )
 * Numbered navigation for optional usage - based on Bones but modified
 *  - vital_number_nav( $nav_id, $before = '', $after = '' )
 * _S style post meta data (time posted/author link) 
 * _S style post/entry footers
 *  - vital_posted_on();
 * _S function to check whether site has multiple categories or not - vital_categorised_blog()
 */
require_once locate_template('lib/template-tags.php');     




/**
 * CUSTOM FUNCTIONS
 * ----------------
 * Lower priority for SEO by Yoast meta boxes
 * Maximum image quality
 * Responsive oEmbed videos - with css in base.scss
 * Remove <p> from images - commented out by default
 * Automatic featured images
 */
require_once locate_template('lib/custom.php');          



/**
 * CUSTOMISING tinyMCE EDITOR
 * --------------------------
 * Expand/Collapse shortcode
 * Columns shortcode
 * Narrow text shortcode
 * CTA style buttons
 */  
require_once locate_template('lib/tinymce.php');    




/**
 * ADD COMMON SOCIAL MEDIA PROFILES TO OPTIONS PAGE
 * ------------------------------------------------
 */
//require_once locate_template('lib/acf-social.php');        




/**
 * CUSTOMISING THE ADMIN AREA AND SUCH
 * -----------------------------------
 * Custom thumbnail sizes in the media uploader
 * Removing default dashboard widgets
 * Adding custom dashboard widgets
 * Adding custom help menu text
 * Custom login page
 * Custom footer in admin area
 * Customising submenu items on admin toolbar (removing several WP ones and adding a t&o one!)
 * Adding a warning on settings pages
 * Removing 'links' as a menu item from the admin menu
 * Custom 'Tedworth' colour scheme in admin
 * Enqueue Custom css for admin area
 * Custom icons for menu items examples
 */
require_once locate_template('lib/admin.php');             





/**
 * ADDING A DOCUMENTATION MENU ITEM AND FILLING IT WITH USEFUL TIPS!
 * -----------------------------------------------------------------
 */
require_once locate_template('lib/documentation.php');     

?>