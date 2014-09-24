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
if ( version_compare( $GLOBALS['wp_version'], '3.6-alpha', '<' ) )
        require get_template_directory() . '/lib/back-compat.php';


/**
 * UTILITY FUNCTIONS
 * -----------------
 */
require_once locate_template('/lib/utils.php');             





/**
 * INITIAL THEME SETUP AND CONSTANTS
 * ---------------------------------
 * Translation
 * Post thumbnails
 * Theme support
 * Use WordPress HTML5 style search/comments by default
 * Custom tiny mce editor styles
 * Add theme support for jetpack inf scrolling (because why not...)
 */
require_once locate_template('/lib/init.php');              





/**
 * CONFIGURATION 
 * -------------
 * ADD GOOGLE ANALYTICS CODE HERE!
 * Excerpts length
 */
require_once locate_template('/lib/config.php');            





/**
 * CLEANUP
 * -----------------
 * Clean up wp_head() - from Roots
 * Add and remove body_class() classes
 * Custom search form (from roots) - submit button commented out by default...
 * Wrap embedded media as suggested by Readability
 * Add class="thumbnail" to attachment items
 * Clean up the_excerpt()
 * Don't return the default description in the RSS feed if it hasn't been changed
 * Allow more tags in TinyMCE including <iframe> and <script>
 * Add additional classes onto widgets
 * Redirects search results from /?s=query to /search/query/, converts %20 to +
 */
require_once locate_template('/lib/cleanup.php');           




/**
 * CUSTOM NAV MODIFICATIONS - CUSTOM NAV WALKER ETC.
 * -------------------------------------------------
 */
require_once locate_template('/lib/nav.php');               




/**
 * URL REWRITES FOR ASSET FILES
 * ----------------------------
 */
require_once locate_template('/lib/rewrites.php');          




/**
 * H5BP .HTACCESS WRITING
 * ----------------------
 */
require_once locate_template('/lib/htaccess.php');          
                                                                



/**
 * CUSTOM WIDGETS
 * --------------
 */
require_once locate_template('/lib/widgets.php');           




/**
 * OPTIONAL - REGISTERING AND DEFINING CUSTOM MENUS WITH TRANSIENTS CALL AS FUNCTIONS IN THEME
 * -------------------------------------------------------------------------------------------
 */
//require_once locate_template('/lib/menus.php');             




/**
 * SCRIPTS AND STYLESHEETS
 * -----------------------
 */
require_once locate_template('/lib/scripts.php');           




/**
 * CUSTOM POST TYPE EXAMPLE (FROM BONES)
 * -------------------------------------
 */
//require_once locate_template('/lib/custom-post-type.php');  




/**
 * CUSTOM METABOXES
 * -----------------
 */
require_once locate_template('/lib/metaboxes.php');         




/**
 * NAVIGATION AND COMMENT LAYOUTS USED IN TEMPLATES
 * ------------------------------------------------
 * _S style comments with Bones conditional Gravatar loading (js in main.js)
 * _S style page navigation for next/prev links 
 *  - vital_content_nav( $nav_id )
 * Bones style numbered navigation for optional usage 
 *  - vital_number_nav( $nav_id, $before = '', $after = '' )
 * _S style post meta data (time posted/author link) 
 *  - vital_posted_on();
 * _S function to check whether site has multiple categories or not - vital_categorised_blog()
 */
require_once locate_template('/lib/template-tags.php');     




/**
 * CUSTOM FUNCTIONS
 * ----------------
 * Lower priority for SEO by Yoast meta boxes
 * Maximum image quality
 * Simple Ajax for WP comments - with js in plugins.js
 * Responsive oEmbed videos - with css in base.scss
 * Remove <p> from images - commented out by default
 */
require_once locate_template('/lib/custom.php');            




/**
 * ADD COMMON SOCIAL MEDIA PROFILES TO OPTIONS PAGE
 * ------------------------------------------------
 */
//require_once locate_template('/lib/acf-social.php');        




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
require_once locate_template('/lib/admin.php');             





/**
 * ADDING A DOCUMENTATION MENU ITEM AND FILLING IT WITH USEFUL TIPS!
 * -----------------
 */
require_once locate_template('/lib/documentation.php');     

?>