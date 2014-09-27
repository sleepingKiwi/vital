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
* Metadata file should look something like this:
    {
        "version" : "2.0",
        "details_url" : "http://tedworthandoscar.co.uk/v/vital-2.html",
        "download_url" : "http://tedworthandoscar.co.uk/v/updates/update.zip"
    }
* details_url is the page that displays in 'view version x details' popup
* download_url is a zip of the theme!
*/
require get_template_directory() . '/lib/theme-update-checker.php';
$example_update_checker = new ThemeUpdateChecker(
    'vital', //Theme folder name, AKA "slug". 
    'http://dist.tedworthandoscar.co.uk/vital/metadata.json' //URL of the metadata file.
);





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
 * Custom search form (from roots) - submit button commented out by default...
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
 * OPTIONAL - REGISTERING AND DEFINING CUSTOM MENUS WITH TRANSIENTS CALL AS FUNCTIONS IN THEME
 * -------------------------------------------------------------------------------------------
 */
//require_once locate_template('lib/menus.php');             




/**
 * SCRIPTS AND STYLESHEETS
 * -----------------------
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
 * Expand/Collapse shortcode
 * Responsive oEmbed videos - with css in base.scss
 * Remove <p> from images - commented out by default
 * Automatic featured images
 */
require_once locate_template('lib/custom.php');            




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
 * -----------------
 */
require_once locate_template('lib/documentation.php');     

?>